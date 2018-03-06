import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISurvey, INewQuestion, IFullSurvey } from '../_models/index';

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

  getSurvey(id: string) {
    return this.http.get<IFullSurvey>(`${this.surveysUrl}/${id}`);
  }

  getUserSurvey(survey_id: string, user_id: string) {
    return this.http.get<IFullSurvey>(`${this.surveysUrl}/${survey_id}?user_id=${user_id}`);
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
    return this.http.post(`${this.surveysUrl}/${id}/questions`, {question: question});
  }

}