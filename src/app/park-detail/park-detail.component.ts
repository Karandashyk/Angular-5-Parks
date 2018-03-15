import {Component, OnInit, Input, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { INewPark, IPark, IReport } from '../_models/index';
import { ParkService, CategoryService, EquipmentService } from '../_services/index';
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

  edit = true;
  equipment_ids = [];
  category_ids = [];
  mapCenter = [];
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
    dialogRef.afterClosed().subscribe(() => this.getPark());
  }

  openECDialog(component: string): void {
    let ids = [];
    if (component === 'categories') {
        ids = this.category_ids;
    } else {
      ids = this.equipment_ids;
    }
    const dialogRef = this.dialog.open(AddECDialogComponent, {
      width: '800px',
      data: { component: component, ids: ids}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      if (result.component === 'categories') {
        this.category_ids = this.category_ids.concat(result.data);
        this.save();
      } else {
        this.equipment_ids = this.equipment_ids.concat(result.data);
        this.save();
      }
    });
  }

  getPark(): void {
    this.parkService.getPark(this.id)
      .subscribe(park => {
        this.park = park;
        this.equipment_ids = park.equipment.map(function(eq) {
            return eq.id;
        });
        this.category_ids = park.categories.map(function(cat) {
          return cat.id;
        });
        this.mapCenter = park.coordinates;
      });
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

  deleteEquipment(id: string): void {
    const index = this.equipment_ids.indexOf(id);
    this.equipment_ids.splice(index, 1);
  }

  deleteCategory(id: string): void {
    const index = this.equipment_ids.indexOf(id);
    this.equipment_ids.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }

  mapClicked($event) {
    if (!this.edit) {
      this.park.coordinates[0] = $event.coords.lat;
      this.park.coordinates[1] = $event.coords.lng;
    }
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
      fb_page_id: this.park.fb_page_id,
      longitude: this.park.coordinates[1],
      year_built: this.park.year_built,
      equipment_ids: this.equipment_ids,
      category_ids: this.category_ids
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
  park: IPark;

  constructor(
    public dialogRef: MatDialogRef<SuggestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parkService: ParkService
  ) { }

  ngOnInit(): void {
    this.getSuggestions();
    this.park = this.data.park;
  }

  getSuggestions(): void {
    this.parkService.getParkSuggestions(this.data.id)
      .subscribe(suggestions => {this.suggestions = suggestions; });
  }

  apply(id: string) {
    this.parkService.applySuggestion(id)
      .subscribe(() => this.suggestions = this.suggestions.filter(suggestion => suggestion.id !== id));
  }

  delete(id: string) {
    this.parkService.deleteSuggestion(id)
      .subscribe(() => this.suggestions = this.suggestions.filter(suggestion => suggestion.id !== id));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compArr(eqArrS, eqArrP) {
    let objectsAreSame = true;
    const x = eqArrS;
    const y = eqArrP;
    for (const propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return !objectsAreSame;
  }

}




@Component({
  templateUrl: 'dialog/add-ec-dialog.html',
  styleUrls: ['dialog/add-ec-dialog.scss']
})
export class AddECDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddECDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipmentService: EquipmentService,
    private categoryService: CategoryService
  ) { }

  components = [];
  selectedComponents = [];

  ngOnInit(): void {
    switch (this.data.component) {
      case 'categories' : {
        this.categoryService.getCategories()
          .subscribe(categories => {
            this.components = categories.filter(cat => this.data.ids.indexOf(cat.id) === -1);
          });
        break;
      }
      case 'equipment' : {
        this.equipmentService.getEquipment()
          .subscribe(equipment => {
            this.components = equipment.filter(eq => this.data.ids.indexOf(eq.id) === -1);
          });
        break;
      }
    }
  }


  isSelected(id: string): boolean {
    const index = this.selectedComponents.indexOf(id);
    return index >= 0;
  }


  select(id: string): void {
    const index = this.selectedComponents.indexOf(id);

    if (index >= 0) {
      this.selectedComponents.splice(index, 1);
    } else {
      this.selectedComponents.push(id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
