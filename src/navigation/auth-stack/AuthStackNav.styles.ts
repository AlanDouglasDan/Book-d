import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";
import { ifIphoneX } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  headerTitle: {
    ...typography.text14,
    color: palette.WHITE,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: "6.54%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    ...Platform.select({
      ios: ifIphoneX({ paddingTop: 56 }, { paddingTop: 42 }),
      android: { paddingTop: 56 },
    }),
  },
});
