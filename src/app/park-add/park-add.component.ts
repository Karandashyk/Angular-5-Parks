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

  edit = {
    name: true,
    description: true,
    address: true
  };
  park: INewPark;
  private pictures: string[] = [];

  constructor(
    private parkService: ParkService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

}
