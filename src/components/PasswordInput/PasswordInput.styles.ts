import { Platform, StyleSheet } from "react-native";

import { palette } from "core/styles/palette";
import { typography } from "core/styles/typography";

export default StyleSheet.create({
  input: {
    ...typography.textPlaceholder,
    width: "100%",
    height: 50,
    backgroundColor: palette.WHITE,
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 55,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.BLACK,
    borderWidth: 1,
    borderColor: palette.GREY3,
    // letterSpacing: 4,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: palette.RED
  },
  label: {
    ...typography.text16,
    color: palette.GREY1,
  },
  inputContainer: {
    marginTop: 6,
    position: "relative",
  },
  textCode: {
    ...typography.text18,
    position: "absolute",
    top: 14,
    left: 61,
  },
  iconContainer: {
    position: "absolute",
    top: 14,
    right: 27,
    height: 22,
    justifyContent: "center",
  },
  icon: {},
  textError: {
    ...typography.text12,
    color: palette.RED,
    marginTop: 4,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
    textDecorationLine: "underline",
  },
});
