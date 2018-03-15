import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    {text: 'Categories', route: '/categories'},
    {text: 'Equipment', route: '/equipment'},
    {text: 'Users', route: '/users'},
    {text: 'Surveys', route: '/surveys'},
    {text: 'Statistics', route: '/stat'},
    {text: 'Import', route: '/import'},
  ];
  auth_token: string;
  isLoggedIn = false;
  isLoggedIn$: Observable<boolean>;
  survey  = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthenticationService
  ) {
    this.auth_token = localStorage.getItem('auth_token');
  }

  ngOnInit() {
    this.survey = document.location.href.indexOf('user_survey') > 0;
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
