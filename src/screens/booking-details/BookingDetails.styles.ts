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
  },
  flexedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  header16: {
    ...typography.header16,
    color: palette.GREY1,
    textAlign: "center",
  },
  body: {
    backgroundColor: palette.WHITE,
    borderRadius: 8,
    padding: 16,
  },
  text12: {
    ...typography.text12,
    color: palette.BLACK,
  },
  header14: {
    ...typography.header14,
    color: palette.BLACK,
  },
});
