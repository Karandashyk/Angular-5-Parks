import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IUser, ISetting } from '../_models/index';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private usersUrl = 'http://138.68.174.118/admin/users';  // URL to web api
  private settingsUrl = 'http://138.68.174.118/admin/settings';  // URL to web api

  /** GET users from the server */
  getUsers (): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  /** DELETE user from the server */
  deleteUser(id: string) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  /** GET user settings from the server */
  getSettings() {
    return this.http.get<ISetting>(this.settingsUrl);
  }

  /** PUT user settings from the server */
  updateSettings(display: boolean) {
    return this.http.put(this.settingsUrl, {settings: {display_weight_height: display}});
  }
}
