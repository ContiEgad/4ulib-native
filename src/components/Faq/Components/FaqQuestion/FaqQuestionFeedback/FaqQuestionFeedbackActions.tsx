import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetch, useTheme } from '../../../../../hooks';
import { Typography } from '../../../../Typography';
import { usefulQuestion } from '../../../service';

interface IFaqQuestionFeedbackActionsProps {
  onUseLess: () => void;
  onUseFull: () => void;
  id: string;
}

export const FaqQuestionFeedbackActions: React.FC<IFaqQuestionFeedbackActionsProps> =
  memo(({ onUseLess, onUseFull, id }) => {
    const { sendRequest, loading } = useFetch(usefulQuestion);

    const { t } = useTranslation();

    const usefulQuestionHandler = useCallback(async () => {
      const { success } = await sendRequest(id);
      if (success) {
        onUseFull();
      }
    }, [sendRequest, id, onUseFull]);

    const { colors, spacing } = useTheme();

    const styles = useMemo(
      () =>
        StyleSheet.create({
          actionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing(2),
          },
        }),
      [spacing]
    );

    return (
      <>
        <Typography>{t('screens.faq.util')}</Typography>
        {!loading && (
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={usefulQuestionHandler}>
              <AntDesign name="like1" size={24} color={colors.success} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onUseLess}>
              <AntDesign name="dislike1" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}
        {loading && <ActivityIndicator size={25} color={colors.primary} />}
      </>
    );
  });
