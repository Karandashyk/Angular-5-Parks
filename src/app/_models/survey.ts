export interface ISurvey {
  id: string;
  name: string;
  number_of_answers: number;
  published: boolean;
}


export interface INewQuestion {
  text: string;
  type: string;
  options: [
    {id: string;
      text: string;
    }
    ];
}

export interface IQuestion {
  id: string;
  text: string;
  type: string;
  options: [
    {id: string;
    text: string;
    }
    ];
}
