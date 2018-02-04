import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IPark, IReport } from '../_models/index';
import { ParkService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'park-detail.component.html',
  styleUrls: ['park-detail.component.scss']
})

export class ParkDetailComponent implements OnInit {
  @Input() park: IPark;
  @Input() reports: IReport[];

  private id: string;
  private pictures: string[] = [];

  edit = {
    name: true,
    description: true,
    address: true
  };

  constructor(
    private route: ActivatedRoute,
    private parkService: ParkService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPark();
    this.getReports();
  }

  getPark(): void {
    this.parkService.getPark(this.id)
      .subscribe(park => this.park = park );
  }

  deletePark(): void {
    this.parkService.deletePark(this.id)
      .subscribe(() => { this.location.back(); });
  }

  getReports(): void {
    this.parkService.getReports(this.id)
      .subscribe(reports => this.reports = reports );
  }

  deleteReport(id: string): void {
    this.parkService.deleteReport(id)
      .subscribe(() => { this.getReports(); });
  }

  deletePicture(id: string): void {
    this.parkService.deletePicture(id)
      .subscribe(() => { this.getPark(); });
  }

  goBack(): void {
    this.location.back();
  }

  onUploadFinished($event) {
    this.pictures.push($event.src);
    this.parkService.addPictures(this.id, this.pictures)
      .subscribe( () => { this.getPark(); });
  }

  onRemoved($event) {
    const index = this.pictures.indexOf($event.src);
    this.pictures.splice(index, 1);
  }

  markerDragEnd($event) {
    this.park.coordinates[0] = $event.coords.lat;
    this.park.coordinates[1] = $event.coords.lng;
  }


  save(): void {
    const park = {
        name: this.park.name,
        description: this.park.description,
        latitude: this.park.coordinates[0],
        longitude: this.park.coordinates[1],
        year_built: this.park.year_built
    };
    this.parkService.updatePark(this.id, park)
      .subscribe( () => { this.getPark(); });
  }
}
