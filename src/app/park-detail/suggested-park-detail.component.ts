import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IPark } from '../_models/index';
import { ParkService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'suggested-park-detail.component.html',
  styleUrls: ['park-detail.component.scss']
})

export class SuggestedParkDetailComponent implements OnInit {
  @Input() park: IPark;

  private id: string;

  constructor(
    private route: ActivatedRoute,
    private parkService: ParkService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPark();
  }

  getPark(): void {
    this.parkService.getSuggestedPark(this.id)
      .subscribe(park => this.park = park );
  }

  publishPark(): void {
    this.parkService.publishPark(this.id)
      .subscribe( () => { this.location.back(); });
  }

  deletePark(): void {
    this.parkService.deleteSuggestedPark(this.id)
      .subscribe(() => { this.location.back(); });
  }

  goBack(): void {
    this.location.back();
  }

}
