import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button as Btn } from "@rneui/base";

import styles from "./Button.styles";
import { palette } from "@src/core/styles";

interface ButtonProps {
  title: string;
  opaque?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  opaque = true,
  style,
  disabled = false,
  loading = false,
}) => (
  <Btn
    title={title}
    titleStyle={[styles.textButton, opaque && { color: palette.WHITE }]}
    containerStyle={[styles.buttonContainer, style]}
    buttonStyle={[styles.button, opaque && { backgroundColor: palette.ORANGE }]}
    onPress={onPress}
    disabled={disabled}
    loading={loading}
    disabledStyle={{ backgroundColor: "#333" }}
  />
);

export default Button;
