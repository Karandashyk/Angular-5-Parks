import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { SurveyService } from '../_services/index';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {ISurvey} from '../_models/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'surveys.component.html',
  styleUrls: ['surveys.component.scss']

})

export class SurveysComponent implements OnInit {
  displayedColumns = ['name', 'number_of_answers', 'published'];
  dataSource: any;
  display: boolean;
  surveys: ISurvey[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private surveyService: SurveyService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getAllSurveys();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSurveyDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllSurveys();
    });
  }

  getAllSurveys() {
    this.surveyService.getAllSurveys()
      .subscribe(surveys => {
        this.surveys = surveys;
        this.dataSource = new MatTableDataSource(surveys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}





@Component({
  templateUrl: 'dialog/add-survey-dialog.html',
  styleUrls: ['dialog/add-survey-dialog.scss']
})
export class AddSurveyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surveyService: SurveyService,
    private _formBuilder: FormBuilder
  ) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  survey: any;

  ngOnInit() {
    this.survey = {
      id: '',
      name: ''
    };
    this.firstFormGroup = this._formBuilder.group({
      name: [this.survey.name, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createSurvey() {
    if (!this.survey.id) {
      this.surveyService.createSurvey(this.firstFormGroup.controls.name.value)
        .subscribe(survey => {
          this.survey = survey;
        });
    } else {
      this.surveyService.updateSurvey(this.survey.id, this.firstFormGroup.controls.name.value)
        .subscribe(() => {
          this.survey.name = this.firstFormGroup.controls.name.value;
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
