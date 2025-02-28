import {StyleSheet} from 'react-native';
import {colors} from './color';
import {scale} from 'react-native-size-matters';

export const globalStyles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: colors.bgBlack1,
    paddingVertical: scale(18),
    paddingHorizontal: scale(14),
  },
  itemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Hmargin: {
    marginHorizontal: 20,
  },
  Vmargin: {
    marginVertical: 18,
  },
  VHmargin: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  Hpadding: {
    paddingHorizontal: 20,
  },
  Vpadding: {
    paddingVertical: 12,
  },
  VHpadding: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
