import type { GestureResponderEvent, StyleProp } from 'react-native';

export interface IButtonComponent {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  style?: StyleProp<any>;
  loading?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  startIcon?: (color: string) => JSX.Element;
  disable?: boolean;
}
