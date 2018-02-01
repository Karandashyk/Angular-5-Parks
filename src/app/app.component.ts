import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from './_models/index';
import { AlertService, AuthenticationService } from './_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  links = [
    {text: 'Parks', route: '/parks'},
    {text: 'Users', route: '/users'},
    {text: 'Surveys', route: '/surveys'},
    {text: 'Equipment', route: '/equipment'},
    {text: 'Export', route: '/export'}
  ];
  auth_token: string;
  // users: IUser[] = [];
  isLoggedIn = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private alertService: AlertService,
    private authService: AuthenticationService
  ) {
    this.auth_token = localStorage.getItem('auth_token');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if (localStorage.getItem('auth_token')) {
      // logged in so return true
      this.isLoggedIn = true;
    }
  }

  onLogout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}



// links = [
//   {text: 'Parks', route: '/parks'},
//   {text: 'Users', route: '/users'},
//   {text: 'Surveys', route: '/surveys'},
//   {text: 'Equipment', route: '/equipment'},
//   {text: 'Export', route: '/export'}
// ];
// currentUser: IUser;
// users: IUser[] = [];
// isLoggedIn = false;
// isLoggedIn$: Observable<boolean>;
//
// constructor(
//   private alertService: AlertService,
//   private authService: AuthenticationService
// ) {
//   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
// }
//
// ngOnInit() {
//   this.isLoggedIn$ = this.authService.isLoggedIn;
//   if (localStorage.getItem('currentUser')) {
//     // logged in so return true
//     this.isLoggedIn = true;
//   }
// }
//
// onLogout() {
//   this.isLoggedIn = false;
//   this.authService.logout();
// }
