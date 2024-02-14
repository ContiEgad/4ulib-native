import type { TextStyle } from 'react-native';

interface IShape {
  borderRadius: number;
}
interface IColors {
  primary: string;
  secondary: string;
  gray: string;
  darkerGray: string;
  black: string;
  error: string;
  success: string;
  info: string;
  hint: string;
  lightGrey: string;
}
interface IImages {
  icon: string;
  logo: string;
}

interface ICardTheme {
  leftColumnBackgroundColor: string;
  rigthColumnBackgroundColor: string;
  backBackgroundColor: string;
  backStripeBackgroundColor: string;
}

type TLoginField = 'login' | 'cpf';

export interface IThemeContextProviderProps {
  children: any;
  theme: Partial<ITheme>;
}

export interface ITheme {
  shape: IShape;
  spacingValue: number;
  images: IImages;
  typography: Record<string, TextStyle>;
  colors: IColors;
  cardTheme: ICardTheme;
  spacing: (value: number) => number;
  loginField: TLoginField;
}
