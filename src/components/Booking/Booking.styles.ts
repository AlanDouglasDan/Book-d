import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  text14: {
    ...typography.text14,
    color: palette.GREY1,
    textAlign: "center",
  },
  flexedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  header14: {
    ...typography.header14,
    color: palette.BLACK,
  },
  text12: {
    ...typography.text12,
    color: palette.GREY1,
  },
  transactionContainer: {
    backgroundColor: palette.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 21,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: -1,
  },
  gap: {
    gap: 4,
  },
  textRight: {
    textAlign: "right",
  },
  dropdownContainer: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: palette.WHITE,
    position: "absolute",
    width: "35%",
    bottom: -50,
    right: -10,
    zIndex: 999,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: palette.GREY2,
    marginVertical: 8,
  },
});
