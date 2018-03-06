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

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
  ) {}
  surveyId: string;
  userId: string;
  survey: IFullSurvey;

  ngOnInit() {
    this.surveyId = '5a9e79a9e60ea27e648106d2';
    this.userId = '5a69789de60ea21ec2abef8e';
    // this.surveyId = this.route.snapshot.params.survey_id;
    // this.userId = this.route.snapshot.params.user_id;
    this.surveyService.getUserSurvey(this.surveyId, this.userId)
      .subscribe(survey => {
        this.survey = survey;
        console.log(survey);
      });
  }

  // isCatSelected(id: string): boolean {
  //   const index = this.park.category_ids.indexOf(id);
  //   return index >= 0;
  // }
  //
  // selectCat(id: string): void {
  //   const index = this.park.category_ids.indexOf(id);
  //
  //   if (index >= 0) {
  //     this.park.category_ids.splice(index, 1);
  //   } else {
  //     this.park.category_ids.push(id);
  //   }
  // }

}
