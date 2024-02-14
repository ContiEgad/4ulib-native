import { FlatList, View } from 'react-native';
import React, { useMemo } from 'react';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';

import type { IFaqQuestion } from '../models';
import ListEmptyComponent from '../../ListEmptyComponent/ListEmptyComponent';
import { FaqQuestion } from './FaqQuestion/FaqQuestion';

export const FaqQuestions: React.FC<MaterialTopTabScreenProps<any>> = ({
  route,
}) => {
  const questions = route.params?.questions as IFaqQuestion[];

  const { t } = useTranslation();

  const orderedQuestions = useMemo(
    () =>
      questions.sort((a, b) => {
        return a.displayOrder - b.displayOrder;
      }),
    [questions]
  );

  return (
    <FlatList
      data={orderedQuestions}
      renderItem={({ item }) => <FaqQuestion data={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <ListEmptyComponent message={t('screens.faq.no_questions')} />
      }
    />
  );
};
