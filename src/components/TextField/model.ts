import type { RefCallback } from 'react';
import type { FieldError } from 'react-hook-form';
import type { TextInputProps } from 'react-native';

export interface ITextFieldProps {
  label?: string;
  placeholder?: string;
  textInputprops?: TextInputProps;
  error?: FieldError;
  onChangeText?: (v: string, masked?: string) => any;
  onBlur?: () => void;
  value: string;
  icon?: any;
  mask?: string;
  options?: any;
  type?: any;
  disable?: boolean;
  inputRef?: RefCallback<any>;
}
