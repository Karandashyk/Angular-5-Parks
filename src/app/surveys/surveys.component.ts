import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { SurveyService } from '../_services/index';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {ISurvey, INewQuestion, IQuestion, IFullSurvey} from '../_models/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatStepper } from '@angular/material';


@Component({
  moduleId: module.id,
  templateUrl: 'surveys.component.html',
  styleUrls: ['surveys.component.scss']

})

export class SurveysComponent implements OnInit {
  displayedColumns = ['name', 'number_of_answers', 'published', 'show'];
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

  openSurveyDialog(id: string): void {
    const dialogRef = this.dialog.open(DetailedSurveyDialogComponent, {
      width: '800px',
      data: { id: id}
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
  ) { }
  questionsCounter = 0;
  newQuestion: any;
  questions: INewQuestion[] = [];
  survey: any;
  saved = false;
  separatorKeysCodes = [ENTER, COMMA];

  ngOnInit() {
    this.survey = {
      id: '',
      name: ''
    };
    this.newQuestion = {
      text: '',
      q_type: '',
      options_attributes: []
    };
  }

  createSurvey() {
    if (!this.survey.id) {
      this.surveyService.createSurvey(this.survey.name)
        .subscribe(survey => {
          this.survey = survey;
        });
    } else {
      this.surveyService.updateSurvey(this.survey.id, this.survey.name);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.newQuestion.options_attributes.push({ text: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(question: any): void {
    const index = this.newQuestion.options_attributes.indexOf(question);

    if (index >= 0) {
      this.newQuestion.options_attributes.splice(index, 1);
    }
  }

  deleteQuestion(question: any) {
    this.questionsCounter--;
    const index = this.questions.indexOf(question);

    if (index >= 0) {
      this.questions.splice(index, 1);
    }
  }

  addQuestion() {
    this.questionsCounter++;
    this.questions.push(this.newQuestion);
    this.newQuestion = {
      text: '',
      q_type: '',
      options_attributes: []
    };
  }

  saveSurvey(stepper: MatStepper) {
    this.saved = true;
    this.questions.map( question => {
      this.surveyService.addQuestion(this.survey.id, question).subscribe();
    });
    stepper.next();
  }

  onNoClick(): void {
    if (!this.saved) {
      this.surveyService.deleteSurvey(this.survey.id)
        .subscribe();
    }
    this.dialogRef.close();
  }
}




@Component({
  templateUrl: 'dialog/detailed-survey-dialog.html',
  styleUrls: ['dialog/detailed-survey-dialog.scss']
})
export class DetailedSurveyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailedSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surveyService: SurveyService,
  ) { }
  survey: IFullSurvey;

  ngOnInit() {
    this.surveyService.getSurvey(this.data.id)
      .subscribe( (survey) => {
        this.survey = survey;
      });
  }

  publishSurvey() {
    this.surveyService.publishSurvey(this.survey.id)
      .subscribe();
  }

  deleteSurvey() {
    this.surveyService.deleteSurvey(this.survey.id)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
