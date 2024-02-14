import React, { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import type { IAccordionPanelProps } from './models';

const AccordionPanel: React.FC<IAccordionPanelProps> = ({ children, open }) => {
  const animatedController = useMemo(
    () => new Animated.Value(open ? 1 : 0),
    [open]
  );

  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  useEffect(() => {
    if (!open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [open, animatedController]);

  const bodyHeight = useMemo(
    () =>
      animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
      }),
    [bodySectionHeight, animatedController]
  );

  return (
    <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
      <View
        onLayout={(event) => {
          setBodySectionHeight(event.nativeEvent.layout.height);
        }}
        style={styles.bodyContainer}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
  },
  bodyBackground: {
    overflow: 'hidden',
  },
});

export default AccordionPanel;
