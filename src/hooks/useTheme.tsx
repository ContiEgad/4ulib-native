import { useContext } from 'react';
import { ThemeContext } from '../contexts';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (theme === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  console.log('22', theme);

  return theme;
};
