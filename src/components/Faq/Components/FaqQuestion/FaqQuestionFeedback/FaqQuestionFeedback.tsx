import { StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';

import UselessQuestion from './UselessQuestion';
import ThanksReturn from './ThanksReturn';
import { useTheme } from '../../../../../hooks';
import { FaqQuestionFeedbackActions } from './FaqQuestionFeedbackActions';

interface IFaqQuestionFeebackProps {
  id: string;
}

export const FaqQuestionFeeback: React.FC<IFaqQuestionFeebackProps> = ({
  id,
}) => {
  const [showThanks, setShowThanks] = useState(false);

  const [useless, setUseless] = useState(false);

  const showActions = useMemo(
    () => !showThanks && !useless,
    [useless, showThanks]
  );

  const onSendHandler = () => {
    setShowThanks(true);
    setUseless(false);
  };

  const { spacing } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: spacing(2),
        },
        actionContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing(2),
        },
      }),
    [spacing]
  );

  return (
    <View style={styles.container}>
      {showActions && (
        <FaqQuestionFeedbackActions
          id={id}
          onUseFull={() => setShowThanks(true)}
          onUseLess={() => setUseless(true)}
        />
      )}
      {showThanks && <ThanksReturn />}
      {useless && (
        <UselessQuestion
          id={id}
          onSend={onSendHandler}
          onCancel={() => setUseless(false)}
        />
      )}
    </View>
  );
};
