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
    paddingHorizontal: 24
  },
  contentContainer: {
    flexGrow: 1,
    ...ifIphoneX({ paddingBottom: 0 }, { paddingBottom: 30 }),
  },
  uploadContainer: {
    borderRadius: 10,
    backgroundColor: palette.GREY6,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bordered: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: palette.BORDER,
  },
  text14: {
    ...typography.text14,
    color: palette.GREY1,
  },
  flexedRow: {
    flexDirection: "row",
    gap: 20,
  },
  header24: {
    ...typography.header20,
    color: palette.ORANGE,
    marginBottom: 16,
  },
});
