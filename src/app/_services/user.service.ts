import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IUser } from '../_models/index';

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

  /** GET users from the server */
  getUsers (): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  /** DELETE user from the server */
  deleteUser(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

}




//
// getAll() {
//   return this.http.get<IUser[]>('/api/users');
// }
//
// getById(id: number) {
//   return this.http.get('/api/users/' + id);
// }
//
// create(user: IUser) {
//   return this.http.post('/api/users', user);
// }
//
// update(user: IUser) {
//   return this.http.put('/api/users/' + user.id, user);
// }
//
// delete(id: number) {
//   return this.http.delete('/api/users/' + id);
// }
