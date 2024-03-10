import { StyleSheet } from "react-native";

export const common = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  shadow: {
    // shadow effect
    shadowColor: '#222',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    // height: 1,
  },
});
