import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { INewEquipment, IEquipment } from '../_models/index';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class EquipmentService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private equipmentUrl = 'http://138.68.174.118/admin/equipment';  // URL to web api

  /** GET equipment from the server */
  getEquipment(): Observable<IEquipment[]> {
    return this.http.get<IEquipment[]>(this.equipmentUrl);
  }
  /** POST equipment to the server */
  addEquipment(equipment: INewEquipment) {
    return this.http.post<IEquipment[]>(this.equipmentUrl, { equipment: equipment });
  }
  /** DELETE equipment from the server */
  deleteEquipment(id: string) {
    return this.http.delete(`${this.equipmentUrl}/${id}`);
  }

}

