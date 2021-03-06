import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ImportExportService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private exportUrl = 'http://185.57.255.205:8000/admin/export';  // URL to web api
  private importUrl = 'http://185.57.255.205:8000/admin/import/parks';  // URL to web api

  importParks(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.importUrl, {import: {archive: fileToUpload}});
  }

  getUsersExport() {
    return Observable.create(observer => {

      const xhr = new XMLHttpRequest();
      const auth_token = localStorage.getItem('auth_token');

      xhr.open('GET', `${this.exportUrl}/users`, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Authorization', auth_token);

      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            const contentType = 'text/csv;charset=utf-8';
            const blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();

    });
  }

  getParksExport() {
    return Observable.create(observer => {

      const xhr = new XMLHttpRequest();
      const auth_token = localStorage.getItem('auth_token');

      xhr.open('GET', `${this.exportUrl}/parks`, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Authorization', auth_token);

      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            const contentType = 'text/csv;charset=utf-8';
            const blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();

    });
  }

}

