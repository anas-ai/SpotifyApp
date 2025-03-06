import Slider from '@react-native-community/slider';
import {useContext, useEffect, useState} from 'react';
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
import {scale} from 'react-native-size-matters';
import {default as IconPlus} from 'react-native-vector-icons/AntDesign';
import {
  default as ArrowDownIcon,
  default as NextIcon,
  default as PrveIcon,
} from 'react-native-vector-icons/Entypo';
import {
  default as IconPause,
  default as IconPlay,
} from 'react-native-vector-icons/MaterialIcons';
import {PNG_IMG} from '../../constants/ImagesName';
import {AuthContext} from '../../Contexts/Context';
import {colors} from '../../styles/color';
import CustomAlert from '../CustomAlert/CustomAlert';
import ResponsiveText from '../ResponsiveText/ResponsiveText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type SongsPlayerProps = {
  currentSong: {
    id: string;
    title: string;
    artist: string;
    url: string;
    cover?: string;
  } | null;
  playing: boolean;
  onPlayPause: () => void;
  position: number;
  duration: number;
  onSeek: (value: number) => void;
  onClose: () => void;
  modalVisible: boolean;
  onNext: () => void;
  onPreves: () => void;
};

const SongsPlayer: React.FC<SongsPlayerProps> = ({
  currentSong,
  playing,
  onPlayPause,
  position,
  duration,
  onSeek,
  onClose,
  modalVisible,
  onNext,
  onPreves,
}) => {
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const {state, dispatch} = useContext(AuthContext);
  const [isFavorites, setIsFavorites] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [refreshKey, setRefreshKey] = useState(0); // New state for forcing re-render


  useEffect(() => {
    const checkFavoriteStatus = () => {
      const isFav = state.favorites?.favoriteSongs?.some(
        song => song.id === currentSong?.id,
      );
      setIsFavorites(isFav);
    };
    checkFavoriteStatus();
  }, [state.favorites, currentSong]);

  const handleFavoritesPress = async () => {
    if (!currentSong) return;
  
    let updatedFavorites = [];
  
    if (isFavorites) {
      updatedFavorites = state.favorites.favoriteSongs.filter(
        song => song.id !== currentSong.id
      );
      setIsFavorites(false); // ✅ Update UI immediately
      dispatch({type: 'REMOVE_FROM_FAVORITES', payload: currentSong.id});
      setAlertMessage('Removed from Favorites');
      setAlertType('error');
    } else {
      updatedFavorites = [...state.favorites.favoriteSongs, currentSong];
      setIsFavorites(true); // ✅ Update UI immediately
      dispatch({type: 'ADD_TO_FAVORITES', payload: currentSong});
      setAlertMessage('Added to Favorites');
      setAlertType('success');
    }
  
    await AsyncStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
    setAlertVisible(true);
    setRefreshKey(prevKey => prevKey + 1); // ✅ Force re-render
  };
  

  useEffect(() => {
    console.log('Updated Favorites:', state.favorites.favoriteSongs);
  }, [state.favorites]);

  return (
    <ReactNativeModal
      isVisible={modalVisible}
      style={styles.ModelStyle}
      animationIn="slideInUp"
      avoidKeyboard={true} // ✅ Correct way
    >
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
          <TouchableOpacity onPress={handleFavoritesPress}>
            <IconPlus
              name={isFavorites ? 'heart' : 'hearto'}
              size={scale(28)}
              color={isFavorites ? 'red' : colors.white}
              style={{width: scale(30)}}
            />
          </TouchableOpacity>
        </View>
        <CustomAlert
          isVisible={alertVisible}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertVisible(false)}
        />
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
          <TouchableOpacity onPress={onPreves}>
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
          <TouchableOpacity onPress={onNext}>
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
