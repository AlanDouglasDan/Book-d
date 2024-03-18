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
    // gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: palette.ORANGE,
  },
  semiheader14: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
  header18: {
    ...typography.header18,
    color: palette.RED,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
});
