export interface ISurvey {
  id: string;
  name: string;
  number_of_answers: number;
  published: boolean;
}

export interface IFullSurvey {
  id: string;
  name: string;
  number_of_answers: number;
  published: boolean;
  questions: [
    {
      id: string;
      text: string;
      type: string;
      options: [
        {
          id: string;
          text: string;
        }
      ];
    }
  ];
}

export interface INewQuestion {
  text: string;
  q_type: string;
  options_attributes: [
    {
      text: string;
    }
    ];
}

export interface IQuestion {
  id: string;
  text: string;
  type: string;
  options: [
    {
      id: string;
      text: string;
    }
    ];
}


export interface IResult {
  survey_id: string;
  question_id: string;
  user_id: string;
  options_ids: string[];
}
