import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISurvey, INewQuestion, IQuestion } from '../_models/index';

import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SurveyService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private surveysUrl = 'http://185.57.255.205:8000/admin/surveys';  // URL to web api

  getAllSurveys (): Observable<ISurvey[]>  {
    return this.http.get<ISurvey[]>(this.surveysUrl);
  }

  createSurvey (name: string) {
    return this.http.post(this.surveysUrl, { survey: {name: name} } );
  }

  updateSurvey (id: string, name: string) {
    return this.http.put(`${this.surveysUrl}/${id}`, { survey: {name: name} } );
  }

  publishSurvey (id: string) {
    return this.http.post(`${this.surveysUrl}/${id}/publish`, id);
  }

  deleteSurvey (id: string) {
    return this.http.delete(`${this.surveysUrl}/${id}`);
  }

  addQuestion(id: string, question: INewQuestion) {
    return this.http.post<IQuestion>(`${this.surveysUrl}/${id}/questions`, {question: question});
  }

}
