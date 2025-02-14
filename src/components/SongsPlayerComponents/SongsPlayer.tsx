import Slider from '@react-native-community/slider';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { default as IconPlus } from 'react-native-vector-icons/AntDesign';
import {
    default as ArrowDownIcon,
    default as NextIcon,
    default as PrveIcon,
} from 'react-native-vector-icons/Entypo';
import {
    default as IconPause,
    default as IconPlay,
} from 'react-native-vector-icons/MaterialIcons';
import { PNG_IMG } from '../../constants/ImagesName';
import { colors } from '../../styles/color';
import ResponsiveText from '../ResponsiveText/ResponsiveText';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SongsPlayer = ({
  currentSong,
  playing,
  onPlayPause,
  position,
  duration,
  onSeek,
  onClose,
  modalVisible,
 
}) => {
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <ReactNativeModal
      isVisible={modalVisible}
      style={styles.ModelStyle}
      animationIn="slideInUp">
      <LinearGradient
        colors={['#B12E2A', '#ACAEA3', '#381A1C', '#000000']}
        style={{
          flex: 1,
          paddingVertical: scale(26),
          paddingHorizontal: scale(16),
        }}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => onClose()}>
            <ArrowDownIcon
              name="chevron-thin-down"
              size={scale(30)}
              color={colors.white}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <ResponsiveText
              title="PLAYING FORM PLAYLIST"
              fontColor={colors.white}
              fontSize={scale(12)}
            />
            <ResponsiveText
              title="Hot Hits Telugu"
              fontSize={scale(14)}
              fontColor={colors.white}
              fontWeight="bold"
            />
          </View>
          <Image
            source={PNG_IMG.THREE_DOTS_PNG}
            style={{
              height: scale(20),
              width: scale(20),
              tintColor: colors.white,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(20),
          }}>
          <Image
            source={{uri: currentSong?.artwork}}
            style={{
              height: screenHeight * 0.4,
              width: screenWidth * 0.8,
              resizeMode: 'contain',
              borderRadius: scale(10),
            }}
          />
        </View>
        <View
          style={{
            marginVertical: scale(28),
            marginHorizontal: scale(30),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <ResponsiveText
              title={currentSong?.title}
              fontColor={colors.white}
              fontWeight="700"
            />
          </View>
          <IconPlus
            name="pluscircleo"
            size={scale(28)}
            color={colors.white}
            style={{width: scale(30)}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: colors.gray}}>{formatTime(position)}</Text>
          <Slider
            style={{flex: 1}}
            maximumValue={duration}
            minimumValue={0}
            value={position}
            onSlidingComplete={onSeek}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.gray}
            thumbTintColor="white"
          />

          <Text style={{color: colors.gray}}>{formatTime(duration)}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: scale(35),
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity >
            <PrveIcon
              name="controller-jump-to-start"
              size={scale(60)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause} activeOpacity={0.8}>
            {playing ? (
              <IconPause
                name="pause-circle-filled"
                size={scale(60)}
                color={colors.white}
              />
            ) : (
              <IconPlay
                name="play-circle-fill"
                size={scale(60)}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <NextIcon name="controller-next" size={60} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ReactNativeModal>
  );
};

export default SongsPlayer;

const styles = StyleSheet.create({
  ModelStyle: {
    margin: 0,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {alignItems: 'center'},
});
