import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../../hooks';
import { Typography } from '../Typography';
import type { IButtonComponent } from './model';

export const Button: React.FC<IButtonComponent> = ({
  title,
  onPress,
  style,
  loading = false,
  color,
  fontSize,
  variant = 'contained',
  startIcon,
  disable,
}) => {
  const { spacing, shape, colors } = useTheme();

  const handlePress: ((event: GestureResponderEvent) => void) | null = (
    event
  ) => {
    if (!loading && onPress && !disable) {
      onPress(event);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        pressed: {
          opacity: 0.7,
        },
        text: {
          textAlign: 'center',
        },
        button: {
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(3),
          borderRadius: shape.borderRadius,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: spacing(1),
        },
      }),
    [shape, spacing]
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={disable}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
        variant === 'contained' && {
          backgroundColor: colors.primary,
        },
        variant === 'outlined' && {
          borderWidth: 1,
          borderColor: colors.primary,
        },
        variant === 'text' && {
          backgroundColor: 'transparent',
        },
        disable && {
          opacity: 0.4,
        },
      ]}
    >
      {!loading && startIcon && startIcon(color || 'white')}
      {loading && <ActivityIndicator size={20} color={color || 'white'} />}
      {!loading && (
        <Typography
          style={[styles.text, { color: color || 'white', fontSize }]}
        >
          {title}
        </Typography>
      )}
    </Pressable>
  );
};
