import { FC } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button as Btn } from "@rneui/base";

import styles from "./Button.styles";
import { palette } from "@src/core/styles";

interface ButtonProps {
  title: string;
  opaque?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  opaque = true,
  style,
  disabled = false,
  loading = false,
  textStyle,
  containerStyle,
}) => (
  <Btn
    title={title}
    titleStyle={[
      styles.textButton,
      opaque && { color: palette.WHITE },
      textStyle,
    ]}
    containerStyle={[
      styles.buttonContainer,
      style,
      disabled && { borderWidth: 0 },
    ]}
    buttonStyle={[
      styles.button,
      opaque && { backgroundColor: palette.ORANGE },
      disabled && { backgroundColor: palette.ORANGE2 },
      containerStyle,
    ]}
    onPress={() => !disabled && onPress()}
    // disabled={disabled}
    loading={loading}
    // disabledStyle={{
    //   backgroundColor: palette.ORANGE2,
    // }}
  />
);

export default Button;
