import { scale } from "react-native-size-matters";
import { colors } from "../../styles/color";
import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  IconStyle: {width: scale(30)},
  LinearGradientStyle: {
    flex: 1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
  },
  searchBarStyle: {
    flex: 1,
    backgroundColor: colors.DarkerTone,
    height: scale(42),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  ArtisImageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(16),
  },
  ArtisImage: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.3,
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: '#704830',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  MusicControls: {
    color: '#3ad943',
  },

  SportifyIconContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: scale(5),
  },

  ActionSheetContianer: {
    backgroundColor: colors.bgBlack1,
    height: screenHeight * 0.4,
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
  },

  ControlsStyleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  ControlsStyle:{
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
  },
  PlayPauseContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  shuffleContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  artistsCurrentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(20),
  },
  ActionSheetImgStyle: {
    height: screenHeight * 0.07,
    width: screenWidth * 0.2,
    resizeMode: 'contain',
    borderRadius: scale(5),
  },
});