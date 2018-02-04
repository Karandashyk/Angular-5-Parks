import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IPark, IReport } from '../_models/index';

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
  private reportUrl = 'http://138.68.174.118/admin/report/';  // URL to web api
  private pictureUrl = 'http://138.68.174.118/admin/picture/';  // URL to web api

  /** GET parks from the server */
  getParks (): Observable<IPark[]> {
    return this.http.get<IPark[]>(this.parksUrl);
  }

  /** GET park by id. Will 404 if id not found */
  getPark(id: string): Observable<IPark> {
    const url = `${this.parksUrl}/${id}`;
    return this.http.get<IPark>(url);
  }

  /** GET park by id. Will 404 if id not found */
  updatePark(id: string, park) {
    return this.http.put(`${this.parksUrl}/${id}`, { park: park });
  }

  /** GET user created parks from the server */
  getUserCreatedParks (): Observable<IPark[]> {
    return this.http.get<IPark[]>(`${this.parksUrl}/user_created`);
  }

  /** DELETE park from the server */
  deletePark (id: string) {
    return this.http.delete(`${this.parksUrl}/${id}`);
  }

  /** GET reports from the server */
  getReports (id: string): Observable<IReport[]> {
    const url = `${this.parksUrl}/${id}/reports`;
    return this.http.get<IReport[]>(url);
  }

  /** DELETE report by id from the server */
  deleteReport (id: string) {
    return this.http.delete(this.reportUrl + id);
  }

  /** POST pictures to the server */
  addPictures (id: string, pictures) {
    const url = `${this.parksUrl}/${id}/add_photos`;
    return this.http.post(url, { pictures: pictures });
  }

  /** DELETE picture from the server */
  deletePicture (id: string) {
    return this.http.delete(this.pictureUrl + id);
  }

}
