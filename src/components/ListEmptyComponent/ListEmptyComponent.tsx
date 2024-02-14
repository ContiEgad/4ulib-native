import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks';
import type { IListEmptyComponentProps } from './model';
import { Typography } from '../Typography';

const ListEmptyComponent: React.FC<IListEmptyComponentProps> = ({
  message,
  description,
}) => {
  const { spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: spacing(4),
          flex: 1,
          gap: spacing(20),
          alignItems: 'center',
        },
        textContainer: {
          gap: spacing(2),
        },
        image: {
          width: 220,
          height: 200,
        },
      }),
    [spacing]
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography style={typography.title2}>{message}</Typography>
        {description && (
          <Typography style={typography.subtitle2}>{description}</Typography>
        )}
      </View>
    </View>
  );
};

export default ListEmptyComponent;
