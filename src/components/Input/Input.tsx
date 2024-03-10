/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  KeyboardTypeOptions,
  Keyboard,
} from "react-native";

import { palette } from "core/styles/palette";
import { noop } from "core/utils";
import styles from "./Input.styles";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  error?: string;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  textBoxStyle?: any;
  rows?: number;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  label,
  containerStyle = {},
  onChangeText,
  error,
  onBlur = noop,
  keyboardType,
  textBoxStyle = {},
  rows,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={palette.GREY1}
        style={[
          styles.input,
          focused && styles.inputFocus,
          error && styles.inputError,
          textBoxStyle,
          disabled ? styles.disabled : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          if (!value) setFocused(false);
          onBlur();
        }}
        keyboardType={keyboardType}
        returnKeyLabel="Done"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        // selectionColor={palette.BLUE}
        multiline={rows ? true : false}
        numberOfLines={rows}
        editable={!disabled}
        blurOnSubmit
        // autoCapitalize='none'
      />

      {!!error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default Input;
