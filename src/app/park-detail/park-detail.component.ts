import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IPark } from '../_models/index';
import { ParkService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'park-detail.component.html',
  styleUrls: ['park-detail.component.scss']
})

export class ParkDetailComponent implements OnInit {
  @Input() park: IPark;

  constructor(
    private route: ActivatedRoute,
    private parkService: ParkService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPark();
    console.log(this.park);
  }

  getPark(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.parkService.getPark(id)
      .subscribe(park => this.park = park );
  }
  setPictures(pictures): void {

  }
  goBack(): void {
    // this.location.back();
    console.log(this.park);

  }


  // save(): void {
  //   this.parkService.updatePark(this.park)
  //     .subscribe(() => this.goBack());
  // }
}
