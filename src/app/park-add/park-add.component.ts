import {Component} from '@angular/core';
import { Location } from '@angular/common';

import { INewPark } from '../_models/index';
import { ParkService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'park-add.component.html',
  styleUrls: ['park-add.component.scss']
})

export class ParkAddComponent {

  park: INewPark = {
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    year_built: '',
    category_ids: [],
    equipment_ids: [],
  };
  private pictures: string[] = [];

  constructor(
    private parkService: ParkService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

}
