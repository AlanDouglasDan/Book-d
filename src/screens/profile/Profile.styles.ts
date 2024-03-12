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
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexGrow: 1,
    ...ifIphoneX({ paddingBottom: 0 }, { paddingBottom: 30 }),
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  header24: {
    ...typography.header20,
    color: palette.ORANGE,
    marginBottom: 25,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.GREY2,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.ORANGE,
  },
});
