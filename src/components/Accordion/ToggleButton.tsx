import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

import type { IToggleButtonProps } from './models';

const ToggleButton: React.FC<IToggleButtonProps> = ({ value, onPress }) => {
  const {
    colors: { text },
  } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Ionicons
        name={`chevron-${!value ? 'down' : 'up'}`}
        size={24}
        color={text}
      />
    </TouchableOpacity>
  );
};

export default memo(ToggleButton);
