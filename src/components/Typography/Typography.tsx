import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, type TextProps } from 'react-native';

export const Typography: React.FC<TextProps> = ({
  children,
  ...otherProps
}) => {
  const { colors } = useTheme();

  return (
    <Text {...otherProps} style={[{ color: colors.text }, otherProps.style]}>
      {children}
    </Text>
  );
};
