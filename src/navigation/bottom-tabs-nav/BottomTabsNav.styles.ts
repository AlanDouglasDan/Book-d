import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";
import { ifIphoneX } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  tabBar: {
    // ...ifIphoneX({ paddingTop: 15 }, { paddingBottom: 10 }),
    paddingTop: 10,
    paddingBottom: 15,
    height: 75,
    backgroundColor: palette.WHITE,
    marginBottom: 20,
    borderRadius: 8,
  },
  text10: {
    ...typography.text12,
    color: palette.GREY5,
  },
  text10Focus: {
    ...typography.text12,
    color: palette.ORANGE,
  },
});
