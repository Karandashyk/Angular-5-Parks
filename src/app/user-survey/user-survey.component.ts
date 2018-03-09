import { Component, OnInit} from '@angular/core';
import { SurveyService } from '../_services/index';
import { IFullSurvey } from '../_models/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'user-survey.component.html',
  styleUrls: ['user-survey.component.scss']

})

export class UserSurveyComponent implements OnInit {
  results = {};

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
  ) {}
  surveyId: string;
  userId: string;
  survey: IFullSurvey;
  finished = false;
  error = false;

  ngOnInit() {
    // this.surveyId = '5a9e79a9e60ea27e648106d2';
    // this.userId = '5a69789de60ea21ec2abef8e';
    this.surveyId = this.route.snapshot.params.survey_id;
    this.userId = this.route.snapshot.params.user_id;

    this.surveyService.getUserSurvey(this.surveyId, this.userId)
      .subscribe(survey => {
        this.survey = survey;
        // for (let q in survey.questions) {
        //   this.results[survey.questions[q].id] = [];
        // }
      }, err => {
        this.error = true;
      });
  }

  isAswSelected(qId: string, id: string): boolean {
    return (this.results[qId] ? this.results[qId].indexOf(id) : -1) >= 0;
  }

  selectAsw(qId: string, id: string): void {
    if (!this.results[qId]) {
      this.results[qId] = [];
      this.results[qId].push(id);
      return;
    }
    const index = this.results[qId].indexOf(id);

    if (index >= 0) {
      this.results[qId].splice(index, 1);
    } else {
      this.results[qId].push(id);
    }
  }

  finish() {
    for (let res in this.results) {
      this.surveyService.submitAnswer({
        survey_id: this.surveyId,
        question_id: res,
        user_id: this.userId,
        options_ids: Array.isArray(this.results[res]) ? this.results[res] : [this.results[res]]
      }).subscribe(() => this.finished = true );
    }
    this.surveyService.submitSurvey(this.surveyId, this.userId).subscribe();
  }

  isDisabled() {
    return Object.keys(this.results).length === this.survey.questions.length;
  }

}
