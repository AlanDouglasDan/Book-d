import { Platform, StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.BG_COLOR,
  },
  innerContainer: {
    paddingHorizontal: "6%",
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
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameFields: {
    width: wp("43%"),
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
  optionContainer: {
    paddingTop: -6,
    marginLeft: -10,
  },
  optionLabel: {
    ...typography.text16,
    color: palette.BLACK,
  },
});
