/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { palette } from "core/styles";
import { noop } from "core/utils";
import styles from "./PasswordInput.styles";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  placeholder?: string;
  error?: string;
  onBlur?: () => void;
  displayEye?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
  value,
  label,
  containerStyle = {},
  onChangeText,
  placeholder,
  error,
  onBlur = noop,
  displayEye = true,
}) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={palette.GREY1}
          style={[
            styles.input,
            focused && styles.inputFocus,
            error ? styles.inputError : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!value) setFocused(false);
            onBlur();
            Keyboard.dismiss();
          }}
          secureTextEntry={!visible}
          returnKeyLabel="Done"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {displayEye && (
          <TouchableOpacity
            onPress={() => setVisible((prevState) => !prevState)}
            style={styles.iconContainer}
          >
            {visible ? (
              // <Ionicons
              //   name="eye-outline"
              //   size={24}
              //   color={palette.BLACK}
              // />
              <Text style={styles.text14}>Hide</Text>
            ) : (
              // <Ionicons
              //   name="eye-off-outline"
              //   size={20}
              //   color={palette.BLACK}
              // />
              <Text style={styles.text14}>Show</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;
