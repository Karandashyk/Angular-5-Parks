import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IPark } from '../_models/index';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ParkService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private parksUrl = 'http://138.68.174.118/admin/parks';  // URL to web api

  /** GET parks from the server */
  getParks (): Observable<IPark[]> {
    return this.http.get<IPark[]>(this.parksUrl);
  }

  /** GET hero by id. Will 404 if id not found */
  getPark(id: string): Observable<IPark> {
    const url = `${this.parksUrl}/${id}`;
    return this.http.get<IPark>(url);
  }
}
