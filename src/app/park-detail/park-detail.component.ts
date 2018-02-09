import {Component, OnInit, Input, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { INewPark, IPark, IReport } from '../_models/index';
import { ParkService } from '../_services/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  moduleId: module.id,
  templateUrl: 'park-detail.component.html',
  styleUrls: ['park-detail.component.scss']
})

export class ParkDetailComponent implements OnInit {
  @Input() park: IPark;
  @Input() reports: IReport[] = [];

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
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPark();
    this.getReports();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SuggestionsDialogComponent, {
      width: '800px',
      data: { id: this.id, park: this.park }
    });
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



@Component({
  templateUrl: 'dialog/suggestions-dialog.html',
  styleUrls: ['dialog/suggestions-dialog.scss']
})
export class SuggestionsDialogComponent implements OnInit {

  suggestions: IPark[] = [];

  constructor(
    public dialogRef: MatDialogRef<SuggestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parkService: ParkService
  ) { }

  ngOnInit(): void {
    this.getSuggestions();
  }

  getSuggestions(): void {
    this.parkService.getParkSuggestions(this.data.id)
      .subscribe(suggestions => {this.suggestions = suggestions; console.log(this.suggestions); });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compare(obj1: IPark, obj2: IPark): boolean {
    for (const p in obj1) {
      if (typeof (obj1[p]) === 'object') {
        if (!this.compare(obj1[p], obj2[p])) { return false; }
      } else if (obj1[p] !== obj2[p]) { return false; }
    }
    return true;
  }

}
