import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  textButton: {
    ...typography.semiheader16,
    color: palette.BLACK,
  },
  buttonContainer: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: palette.ORANGE,
  },
  button: {
    paddingVertical: 12,
    backgroundColor: palette.WHITE,
    padding: 15,
    width: "100%",
  },
});
