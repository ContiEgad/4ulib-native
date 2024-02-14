import React from 'react';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

import type { IFaqQuestion } from '../../models';
import Accordion from '../../../Accordion/Accordion';
import { FaqQuestionFeeback } from './FaqQuestionFeedback';

interface IFaqQuestionProps {
  data: IFaqQuestion;
}

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({
  data: { answer, question, id },
}) => {
  const { colors } = useTheme();

  const { width } = useWindowDimensions();

  return (
    <Accordion title={question}>
      <RenderHTML
        source={{ html: answer }}
        contentWidth={width}
        baseStyle={{
          color: colors.text,
        }}
        ignoredStyles={['color']}
      />
      <FaqQuestionFeeback id={id} />
    </Accordion>
  );
};
