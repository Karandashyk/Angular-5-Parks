import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ICategory } from '../_models/index';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private categoriesUrl = 'http://185.57.255.205:8000/admin/categories';  // URL to web api

  /** GET categories from the server */
  getCategories (): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl);
  }

  /** POST park to the server */
  addCategory(name: string) {
    return this.http.post(this.categoriesUrl, { category: { name: name } });
  }

  /** DELETE category from the server */
  deleteCategory(id: string) {
    return this.http.delete(`${this.categoriesUrl}/${id}`);
  }

}

