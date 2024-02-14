export interface IFaqQuestion {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  enable: boolean;
}

export interface IFaq {
  id: string;
  name: string;
  mail: string;
  whatsappPhoneNumber: string;
  enable: boolean;
  faqQuestions: IFaqQuestion[];
  language: {
    name: string;
    code: string;
    id: string;
  };
}

export interface INewComment {
  faqQuestionId: string;
  comment: string;
}
