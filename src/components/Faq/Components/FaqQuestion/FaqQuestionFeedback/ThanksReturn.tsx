import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';

import React, { useMemo } from 'react';
import { Typography } from '../../../../Typography';
import { useTheme } from '../../../../../hooks';

export const ThanksReturn = () => {
  const { t } = useTranslation();
  const { colors, spacing } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: spacing(1),
        },
      }),
    [spacing]
  );

  return (
    <View style={styles.container}>
      <Typography>{t('screens.faq.thanks')}</Typography>
      <AntDesign name="checkcircle" size={24} color={colors.success} />
    </View>
  );
};

export default ThanksReturn;
