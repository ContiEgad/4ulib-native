import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Animated, FlatList, Pressable } from 'react-native';
import { useTheme as uT } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';

import { useTheme } from '../../hooks';

export const TopTabBar: React.FC<MaterialTopTabBarProps> = ({
  descriptors,
  navigation,
  position,
  state,
}) => {
  const themee = uT();
  const theme = useTheme();
  const flatlistRef = useRef<FlatList>(null);
  const TabIndex = state.index;
  useEffect(() => {
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: TabIndex,
      viewPosition: 0.5,
    });
  }, [TabIndex, flatlistRef]);

  const opts = descriptors[state.routes[0]!.key]?.options!;

  return (
    <FlatList
      horizontal
      ref={flatlistRef}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={opts.tabBarScrollEnabled}
      style={opts.tabBarStyle}
      contentContainerStyle={opts.tabBarContentContainerStyle}
      data={state.routes}
      renderItem={({ item, index }) => {
        const { options } = descriptors[item.key]!;

        const label = options.title !== undefined ? options.title : item.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: item.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: item.name,
              merge: true,
              params: item.params,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: item.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);

        let color:
          | string
          | Animated.Value
          | Animated.AnimatedInterpolation<string | number>
          | undefined = theme.colors.primary;

        if (inputRange.length > 1) {
          color = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) =>
              i === index ? theme.colors.primary : themee.colors.border
            ),
          });
        }

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[
              {
                marginRight: options.tabBarGap,
              },
              options.tabBarItemStyle,
            ]}
            key={index}
            onLongPress={onLongPress}
          >
            <Animated.View
              style={{
                backgroundColor: color,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
                paddingVertical: theme.spacing(1.5),
              }}
            >
              <Animated.Text
                style={{
                  textAlign: 'center',
                  color: isFocused ? 'white' : themee.colors.text,
                  maxWidth: 200,
                }}
                numberOfLines={2}
              >
                {label}
              </Animated.Text>
            </Animated.View>
          </Pressable>
        );
      }}
    />
  );
};
