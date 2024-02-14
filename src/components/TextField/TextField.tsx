import React, { useState, useMemo } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { useTheme as UT } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import type { ITextFieldProps } from './model';
import { Typography } from '../Typography';
import { MaskedTextInput } from 'react-native-mask-text';

export const TextField: React.FC<ITextFieldProps> = ({
  label,
  placeholder,
  textInputprops,
  error,
  onChangeText,
  onBlur,
  icon,
  options,
  mask,
  type,
  value,
  disable,
  inputRef,
}) => {
  const [focused, SetFocused] = useState(false);
  const { t } = useTranslation();
  const { colors } = UT();

  const handleFocus = () => SetFocused(true);

  const {
    spacing,
    colors: { error: eColor, darkerGray },
    shape,
  } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          ...Platform.select({
            ios: {
              padding: spacing(3),
            },
            android: {
              padding: spacing(2),
            },
          }),
          paddingRight: 20,
          marginBottom: spacing(1),
          fontSize: 15,
          borderWidth: 1,
          borderRadius: shape.borderRadius,
          borderColor: darkerGray,
        },
        error: {
          borderColor: eColor,
          borderWidth: 2,
        },
        focused: {
          borderColor: colors.primary,
        },
        text: {
          color: eColor,
          marginLeft: 2,
        },
        label: {
          marginBottom: spacing(2),
          fontSize: 15,
          fontWeight: '600',
        },
        inputArea: {
          position: 'relative',
        },
        icon: {
          position: 'absolute',
          right: 10,
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        iconPosition: {
          top: 42,
        },
      }),
    [spacing, darkerGray, eColor, shape, colors]
  );

  const handleBlur = () => {
    SetFocused(false);
    if (onChangeText) {
      if (value) {
        onChangeText(value.trim());
      }
    }
  };

  return (
    <View style={styles.inputArea}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      {mask || type || options ? (
        <MaskedTextInput
          editable={!disable}
          focusable={!disable}
          {...textInputprops}
          type={type}
          style={[
            styles.input,
            focused && styles.focused,
            error && !disable && styles.error,
            {
              color: colors.text,
            },
            disable && { opacity: 0.4 },
            textInputprops?.multiline && {
              minHeight: 100,
              textAlignVertical: 'top',
            },
          ]}
          ref={inputRef}
          options={options}
          placeholder={placeholder || label}
          placeholderTextColor={darkerGray}
          mask={mask}
          onBlur={() => {
            if (onBlur) {
              onBlur();
            }
            handleBlur();
          }}
          onFocus={handleFocus}
          onChangeText={(m, u) => {
            if (onChangeText) {
              onChangeText(u, m);
            }
          }}
          value={value}
        />
      ) : (
        <TextInput
          {...textInputprops}
          style={[
            styles.input,
            focused && styles.focused,
            error && !disable && styles.error,
            {
              color: colors.text,
            },
            disable && { opacity: 0.4 },
            textInputprops?.multiline && {
              minHeight: 100,
              textAlignVertical: 'top',
            },
          ]}
          ref={inputRef}
          editable={!disable}
          focusable={!disable}
          placeholderTextColor={darkerGray}
          placeholder={placeholder || label}
          onBlur={() => {
            if (onBlur) {
              onBlur();
            }
            handleBlur();
          }}
          onFocus={handleFocus}
          onChangeText={(v) => {
            if (onChangeText) {
              onChangeText(v);
            }
          }}
          value={value}
        />
      )}

      {error && !disable && (
        <Typography style={styles.text}>{t(error.message || '')}</Typography>
      )}

      {icon && (
        <View
          style={[
            styles.icon,
            label ? styles.iconPosition : null,
            { backgroundColor: colors.background },
          ]}
        >
          {icon}
        </View>
      )}
    </View>
  );
};
