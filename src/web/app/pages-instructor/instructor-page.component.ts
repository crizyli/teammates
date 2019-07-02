import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { AuthInfo } from '../../types/api-output';

/**
 * Base skeleton for instructor pages.
 */
@Component({
  selector: 'tm-instructor-page',
  templateUrl: './instructor-page.component.html',
})
export class InstructorPageComponent implements OnInit {

  user: string = '';
  institute?: string = '';
  isInstructor: boolean = false;
  isStudent: boolean = false;
  isAdmin: boolean = false;
  navItems: any[] = [
    {
      url: '/web/instructor',
      display: 'Home',
    },
    {
      url: '/web/instructor/courses',
      display: 'Courses',
    },
    {
      url: '/web/instructor/sessions',
      display: 'Sessions',
    },
    {
      url: '/web/instructor/students',
      display: 'Students',
    },
    {
      url: '/web/instructor/search',
      display: 'Search',
    },
    {
      url: '/web/instructor/help',
      display: 'Help',
      params: {},
    },
  ];
  isFetchingAuthDetails: boolean = false;

  private backendUrl: string = environment.backendUrl;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.isFetchingAuthDetails = true;
    this.route.queryParams.subscribe((queryParams: any) => {
      this.authService.getAuthUser(queryParams.user).subscribe((res: AuthInfo) => {
        if (res.user) {
          this.user = res.user.id + (res.masquerade ? ' (M)' : '');
          this.institute = res.institute;
          this.isInstructor = res.user.isInstructor;
          this.isStudent = res.user.isStudent;
          this.isAdmin = res.user.isAdmin;
          this.navItems = [
            {
              url: '/web/instructor/home',
              display: 'Home',
              params: { user: res.user.id },
            },
            {
              url: '/web/instructor/courses',
              display: 'Courses',
              params: { user: res.user.id },
            },
            {
              url: '/web/instructor/sessions',
              display: 'Sessions',
              params: { user: res.user.id },
            },
            {
              url: '/web/instructor/students',
              display: 'Students',
              params: { user: res.user.id },
            },
            {
              url: '/web/instructor/search',
              display: 'Search',
              params: { user: res.user.id },
            },
            {
              url: '/web/instructor/help',
              display: 'Help',
            },
          ];
        } else {
          window.location.href = `${this.backendUrl}${res.instructorLoginUrl}`;
        }
        this.isFetchingAuthDetails = false;
      }, () => {
        // TODO
      });
    });
  }

}
