import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.BG_COLOR,
  },
  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    ...ifIphoneX({ paddingBottom: 0 }, { paddingBottom: 30 }),
  },
  header24: {
    ...typography.header20,
    color: palette.ORANGE,
    marginBottom: 25,
  },
  text14: {
    ...typography.text14,
    color: palette.GREY1,
  },
  flexedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionContainer: {
    backgroundColor: palette.WHITE,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
  },
  header14: {
    ...typography.header14,
    color: palette.BLACK,
  },
  text12: {
    ...typography.text12,
    color: palette.GREY1,
  },
  input: {
    paddingVertical: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.BORDER,
    borderRadius: 12,
    paddingLeft: 12,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.GREY1,
  },
});
