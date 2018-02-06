import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

import { INewPark } from '../_models/index';
import { ParkService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'park-add.component.html',
  styleUrls: ['park-add.component.scss']
})

export class ParkAddComponent implements OnInit {

  park: INewPark = {
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    year_built: '',
    category_ids: [],
    equipment_ids: [],
  };

  pictures: string[] = [];

  constructor(
    private parkService: ParkService,
    private location: Location
  ) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.park.latitude = position.coords.latitude;
      this.park.longitude = position.coords.longitude;
    });
  }

  markerDragEnd($event) {
    this.park.latitude = $event.coords.lat;
    this.park.longitude = $event.coords.lng;
  }

  save(): void {
    this.parkService.addPark(this.park, this.pictures)
      .subscribe( () => { this.location.back(); });
  }

  onUploadFinished($event) {
    this.pictures.push($event.src);
  }

  deletePicture(picture: string): void {
    const index = this.pictures.indexOf(picture);
    this.pictures.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }

}
