import { Platform, StyleSheet } from 'react-native';

import { palette } from 'core/styles/palette';
import { typography } from 'core/styles/typography';

export default StyleSheet.create({
  input: {
    ...typography.textPlaceholder,
    width: '100%',
    height: 50,
    backgroundColor: palette.WHITE,
    borderRadius: 8,
    marginTop: 6,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
    color: palette.BLACK,
    borderWidth: 1,
    borderColor: palette.GREY3,
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: palette.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: palette.RED
  },
  disabled: {
    // backgroundColor: palette.SECONDARY_50
  },
  label: {
    ...typography.text16,
    color: palette.GREY1,
  },
  textError: {
    ...typography.text12,
    color: palette.RED,
    marginTop: 4,
  },
});
