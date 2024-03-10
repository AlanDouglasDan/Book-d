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
    ...ifIphoneX({ paddingBottom: 0 }, { paddingBottom: 20 }),
  },
  header24: {
    ...typography.header24,
    color: palette.ORANGE,
    marginBottom: 25,
    textAlign: "center",
  },
  text16: {
    ...typography.text16,
    color: palette.BLACK,
  },
  loginInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    alignSelf: "center",
    flexWrap: "wrap",
  },
  textInfo: {
    ...typography.text15,
    color: palette.BLACK,
  },
  textHighlight: {
    ...typography.semiheader15,
    color: palette.BLACK,
  },
  flexedRow: {
    flexDirection: "row",
  },
});
