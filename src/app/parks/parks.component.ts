import {Component, OnInit, Inject} from '@angular/core';
import { IPark, INewPark, ICategory } from '../_models/index';
import { IEquipment } from '../_models/index';
import { ParkService } from '../_services/index';
import { EquipmentService, CategoryService } from '../_services/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'parks.component.html',
  styleUrls: ['parks.component.scss']
})

export class ParksComponent implements OnInit {
  parks: IPark[] = [];
  userCreatedParks: IPark[] = [];

  constructor(
    private parkService: ParkService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadParks();
    this.loadUserCreatedParks();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadParks();
    });
  }

  loadUserCreatedParks() {
    this.parkService.getUserCreatedParks()
      .subscribe(userCreatedParks => { this.userCreatedParks = userCreatedParks; });
  }

  loadParks() {
    this.parkService.getParks()
      .subscribe(parks => { this.parks = parks; });
  }
}


@Component({
  templateUrl: 'dialog/add-park-dialog.html',
  styleUrls: ['dialog/add-park-dialog.scss']
})
export class AddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parkService: ParkService,
    private equipmentService: EquipmentService,
    private categoryService: CategoryService,

  ) { }

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
  equipment: IEquipment[] = [];
  categories: ICategory[] = [];

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.park.latitude = position.coords.latitude;
      this.park.longitude = position.coords.longitude;
    });
    this.getEquipment();
    this.getCategories();
  }

  markerDragEnd($event) {
    this.park.latitude = $event.coords.lat;
    this.park.longitude = $event.coords.lng;
  }

  save(): void {
    this.parkService.addPark(this.park, this.pictures)
      .subscribe( () => { this.dialogRef.close(); });
  }

  onUploadFinished($event) {
    this.pictures.push($event.src);
  }

  deletePicture(picture: string): void {
    const index = this.pictures.indexOf(picture);
    this.pictures.splice(index, 1);
  }

  getEquipment() {
    this.equipmentService.getEquipment()
      .subscribe(equipment => {
        this.equipment = equipment;
      });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  isEqSelected(id: string): boolean {
    const index = this.park.equipment_ids.indexOf(id);
    return index >= 0;
  }

  selectEq(id: string): void {
    const index = this.park.equipment_ids.indexOf(id);

    if (index >= 0) {
      this.park.equipment_ids.splice(index, 1);
    } else {
      this.park.equipment_ids.push(id);
    }
  }

  isCatSelected(id: string): boolean {
    const index = this.park.category_ids.indexOf(id);
    return index >= 0;
  }

  selectCat(id: string): void {
    const index = this.park.category_ids.indexOf(id);

    if (index >= 0) {
      this.park.category_ids.splice(index, 1);
    } else {
      this.park.category_ids.push(id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
