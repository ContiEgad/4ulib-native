import React, { createContext } from 'react';
import type { ITheme, IThemeContextProviderProps } from './model';

export const DEFAULT_THEME: ITheme = {
  shape: {
    borderRadius: 10,
  },
  loginField: 'cpf',
  colors: {
    primary: '#0A79BE',
    secondary: '#0D93E6',
    gray: '#EEEEEE',
    darkerGray: '#898A82',
    lightGrey: '#BDBDBD',
    black: '#1E1E1E',
    error: '#FF6D6C',
    success: '#198754',
    info: '#219ebc',
    hint: '#918fab',
  },
  spacingValue: 5,
  typography: {
    title1: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    title2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    title3: {
      fontSize: 16,
    },
    subtitle1: {
      fontSize: 17,
    },
    subtitle2: {
      fontSize: 15,
    },
    hint: {
      fontSize: 12,
    },
  },
  images: {
    icon: 'https://www.portal.itamed.com.br/assets/ITAMED_LOGO_2.png',
    logo: 'https://www.portal.itamed.com.br/assets/ITAMED_LOGO_1.png',
  },
  cardTheme: {
    leftColumnBackgroundColor: '#DCE8D0',
    rigthColumnBackgroundColor: '#5995A1',
    backBackgroundColor: 'white',
    backStripeBackgroundColor: '#4B607D',
  },
  spacing: (value: number) => value * DEFAULT_THEME.spacingValue,
};

export const ThemeContext = createContext<ITheme>(DEFAULT_THEME);

export const ThemeContextProvider: React.FC<IThemeContextProviderProps> = ({
  children,
  theme,
}) => {
  return (
    <ThemeContext.Provider value={{ ...DEFAULT_THEME, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
