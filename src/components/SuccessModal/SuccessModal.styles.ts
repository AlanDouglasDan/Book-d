import { Platform, StyleSheet } from "react-native";

import { palette } from "core/styles/palette";
import { typography } from "core/styles/typography";

export default StyleSheet.create({
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalContentContainer: {
    backgroundColor: palette.SUCCESS_25,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.SUCCESS_300,
    borderRadius: 8,
    width: "85%",
    position: "relative",
  },
  flexedRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
  },
  semiHeader14: {
    ...typography.semiheader14,
    color: palette.SUCCESS_700,
    marginBottom: 6,
  },
  text14: {
    ...typography.text14,
    color: palette.SUCCESS_600,
  },
});
