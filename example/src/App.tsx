import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  Button,
  ThemeContextProvider,
  Typography,
  DEFAULT_THEME,
} from 'react-native-awesome-library';

export default function App() {
  return (
    <View style={styles.container}>
      <ThemeContextProvider
        theme={{ colors: { ...DEFAULT_THEME.colors, primary: 'red' } }}
      >
        <Button title="teste" />
        <Typography>ovo2</Typography>
      </ThemeContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
