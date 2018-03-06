import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IStatistic } from '../_models/index';

import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class StatisticService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private statisticsUrl = 'http://185.57.255.205:8000/admin/stats';  // URL to web api

  getStatistics () {
    return this.http.get<IStatistic>(this.statisticsUrl);
  }
}
