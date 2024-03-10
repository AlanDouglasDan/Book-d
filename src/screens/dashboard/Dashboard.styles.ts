import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.BG_COLOR,
  },
  innerContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    ...ifIphoneX({ paddingBottom: 0 }, { paddingBottom: 30 }),
  },
  paddedContainer: {
    padding: 24,
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  semiHeader16: {
    ...typography.semiheader16,
    color: palette.GREY1,
  },
  header: {
    backgroundColor: palette.WHITE,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    position: "relative",
  },
  topContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: palette.WHITE,
    flex: 1,
    shadowColor: "#999",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  text14: {
    ...typography.text12,
    color: palette.BLACK,
  },
  header20: {
    ...typography.header20,
    color: palette.ORANGE,
    marginBottom: 12
  },
});
