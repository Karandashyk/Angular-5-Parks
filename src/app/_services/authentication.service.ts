import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authUrl = 'http://138.68.174.118/admin/authenticate';  // URL to web api
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, {auth: { username: username, password: password }})
      .map(auth_token => {
        if (auth_token) {
          // login successful if there's a jwt token in the response
          this.loggedIn.next(true);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('auth_token', auth_token.auth_token);
        }
        return true;
      });
  }

  logout() {
    this.loggedIn.next(false);
    // remove user from local storage to log user out
    this.router.navigate(['/login']);
    localStorage.removeItem('auth_token');
  }
}



