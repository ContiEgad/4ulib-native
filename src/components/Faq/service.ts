import axios from 'axios';

import type { IFaq } from './models';

const DOMAIN_CODE = '90e5ea05-339d-4e40-b978-5f08e61d2ac2';

export const getFaq = (LanguageId: string) => {
  return axios.get<IFaq[]>(process.env.EXPO_PUBLIC_APP + '/api/v1/Faq/list', {
    headers: {
      'Domain': DOMAIN_CODE,
      'Accept-Language': 'pt-BR',
    },
    params: {
      LanguageId: LanguageId,
    },
  });
};

export const usefulQuestion = (faqQuestionId: string) => {
  return axios.put(
    process.env.EXPO_PUBLIC_APP + '/api/v1/Faq/IncreaseWasUseful',
    { faqQuestionId },
    {
      headers: {
        'Domain': DOMAIN_CODE,
        'Accept-Language': 'pt-BR',
      },
    }
  );
};

export const sendComment = (props: {
  faqQuestionId: string;
  comment: string;
}) => {
  return axios.post(
    process.env.EXPO_PUBLIC_APP + '/api/v1/Faq/SendFaqComment',
    props,
    {
      headers: {
        'Domain': DOMAIN_CODE,
        'Accept-Language': 'pt-BR',
      },
    }
  );
};
