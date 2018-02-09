import { Component, OnInit, Inject} from '@angular/core';
import { IEquipment, INewEquipment } from '../_models/index';
import { EquipmentService } from '../_services/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'equipment.component.html',
  styleUrls: ['equipment.component.scss']
})

export class EquipmentComponent implements OnInit {

  equipment: IEquipment[] = [];

  constructor(
    private equipmentService: EquipmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEquipment();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((equipment) => {
      if (equipment) {
        this.equipmentService.addEquipment(equipment)
        .subscribe( (newEquipment) => { this.equipment = newEquipment; });
      }
    });
  }

  deleteEquipment(id: string) {
    this.equipmentService.deleteEquipment(id)
      .subscribe(() => { this.getEquipment(); });
  }

  getEquipment() {
    this.equipmentService.getEquipment()
      .subscribe(equipment => {
        this.equipment = equipment;
      });
  }
}




@Component({
  templateUrl: 'dialog/add-equipment-dialog.html',
  styleUrls: ['dialog/add-equipment-dialog.scss']
})
export class AddEquipmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  equipment: INewEquipment = {
    name: '',
    picture: ''
  };
  pictures: string[] = [];

  onUploadFinished($event) {
    this.pictures.push($event.src);
    this.equipment.picture = $event.src;
  }

  deletePicture(picture: string): void {
    const index = this.pictures.indexOf(picture);
    this.pictures.splice(index, 1);
    this.equipment.picture = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
