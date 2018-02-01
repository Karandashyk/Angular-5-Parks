import {Component, OnInit} from '@angular/core';
import { IPark } from '../_models/index';
import { ParkService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'parks.component.html',
  styleUrls: ['parks.component.scss']
})

export class ParksComponent implements OnInit {
  parks: IPark[] = [];

  constructor(private parkService: ParkService) {}

  ngOnInit() {
    this.loadAllParks();
  }
  loadAllParks() {
    this.parkService.getParks().subscribe(parks => { this.parks = parks; });
  }
  tiles = [
    {text: 'One', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
  ];
}
