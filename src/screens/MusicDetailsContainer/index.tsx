import Slider from '@react-native-community/slider';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import TrackPlayer, { Capability } from 'react-native-track-player';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {default as IconPlus} from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import SongsPlayer from '../../components/SongsPlayerComponents/SongsPlayer';
import { PNG_IMG } from '../../constants/ImagesName';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MusicDetailsScreen = ({navigation, route, currentSongs}) => {
  const {selectedSong, songsList} = route.params || {};
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(selectedSong || songsList[0]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [showBottomPlayer, setShowBottomPlayer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    setupPlayer();
  }, []);

  const formatTime = (time: number) => {
    if (time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const timeLeft = Math.max(0, duration - position);

  const fetchProgress = useCallback(async () => {
    try {
      const {duration, position} = await TrackPlayer.getProgress();
      if (!isSliding) {
        setPosition(position);
        setDuration(duration || 1);
      }
    } catch (error) {
      console.log('Error fetching track progress', error.message);
    }
  }, [isSliding]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    fetchProgress();
    interval = setInterval(fetchProgress, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  const handleSlidingStart = () => {
    setIsSliding(true);
  };

  const handleSlidingComplete = async (value: number) => {
    await TrackPlayer.seekTo(value); // Seek to the selected position
    setPosition(value);
    setIsSliding(false);
  };

  const playSong = async () => {
    await TrackPlayer.play();
    setPlaying(true);
  };
  const pauseSong = async () => {
    await TrackPlayer.pause();
    setPlaying(false);
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(songsList);
    } catch (error) {}
  };

  const RestSongs =
    songsList?.filter(item => item?.id !== selectedSong?.id) || [];

 
  return (
    <LinearGradient
      colors={[colors.graytextColor, '#2a2a2a', '#241001', '#000000']}
      style={{
        flex: 1,
        paddingVertical: scale(10),
        paddingHorizontal: scale(14),
      }}>
      <View>
        {/* Back Button */}
        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH)}
          style={{marginBottom: scale(10)}}
        />

        {/* Search Bar */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
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
            }}>
            <Icon name="search" size={24} color={colors.white} />
            <TextInput
              placeholder="Find in playlist"
              placeholderTextColor={colors.graytextColor}
              style={{
                flex: 1,
                color: colors.white,
                fontSize: scale(14),
                fontWeight: '600',
                marginLeft: scale(8),
              }}
              keyboardType="twitter"
            />
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: scale(60),
              height: scale(42),
              backgroundColor: '#1E1E1E',
              borderRadius: scale(6),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: scale(10),
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <ResponsiveText
              title="Sort"
              fontColor={colors.white}
              fontWeight="500"
              fontSize={14}
            />
          </TouchableOpacity> */}
        </View>

        {/* Artist Image */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(16),
          }}>
          <Image
            source={{uri: selectedSong?.artwork}}
            style={{
              width: screenWidth * 0.6,
              height: screenHeight * 0.3,
              borderRadius: scale(12),
              borderWidth: 2,
              borderColor: '#704830',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.3,
              shadowRadius: 6,
            }}
          />
        </View>
        <ResponsiveText
          title={currentSong?.title}
          fontColor={colors.gray}
          fontStyle={{marginTop: scale(10), textAlign: 'center'}}
          fontSize={13}
          fontWeight="600"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: scale(5),
        }}>
        <Image
          source={PNG_IMG.SPOTIFY_ICONS_PNG}
          style={{height: scale(24), width: scale(24), resizeMode: 'contain'}}
        />
        <ResponsiveText
          title="Made for you"
          fontColor={colors.gray}
          fontSize={13}
          fontWeight="500"
        />
      </View>
      <ResponsiveText
        title={`- ${formatTime(timeLeft)}` || 'songs'}
        fontColor={colors.gray}
        fontSize={13}
        fontWeight="500"
        fontStyle={{marginTop: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(10),
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}>
          <IconPlus
            name="pluscircleo"
            size={scale(28)}
            color={colors.white}
            style={{width: scale(30)}}
          />
          {/* <IconDownload
            name="download-circle"
            size={30}
            color={colors.white}
            style={styles.IconStyle}
          /> */}
          <Image
            source={PNG_IMG.THREE_DOTS_PNG}
            style={{
              height: scale(25),
              width: scale(25),
              tintColor: colors.white,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity >
            <Image
              source={PNG_IMG.SUFFLE_PNG}
              style={{
                tintColor: colors.white,
                height: scale(35),
                width: scale(35),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity> */}

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {playing ? (
              <TouchableOpacity activeOpacity={0.8} onPress={pauseSong}>
                <Image
                  source={PNG_IMG.PAUSE_PNG}
                  style={{
                    height: scale(30),
                    width: scale(30),
                    tintColor: colors.ButtonColor,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.8} onPress={playSong}>
                <IconPlay
                  name="play"
                  size={scale(30)}
                  style={{
                    color: colors.ButtonColor,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}} />
      <FlatList
        data={RestSongs}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: screenHeight * 0.12}} // Prevents last item from hiding behind bottom bar
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={async () => {
              try {
                await TrackPlayer.reset();
                await TrackPlayer.add(item);
                await TrackPlayer.play();
                setCurrentSong(item); // ✅ Updates the main player
                setShowBottomPlayer(item); // ✅ Updates the bottom player
                setPlaying(true); // ✅ Mark it as playing
              } catch (error) {
                console.log('error playing song:', error);
              }
            }}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: scale(10),
              marginBottom: scale(10),
              backgroundColor:
                currentSong?.id === item.id
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
              borderRadius: scale(10),
              paddingHorizontal: scale(10),
            }}>
            {/* Song Info */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(15),
              }}>
              <Image
                source={{uri: item?.artwork}}
                style={{
                  width: screenWidth * 0.18,
                  height: screenHeight * 0.08,
                  borderRadius: scale(8),
                }}
              />
              <View>
                <ResponsiveText
                  title={item?.title}
                  fontColor={
                    currentSong?.id === item.id
                      ? colors.ButtonColor
                      : colors.white
                  }
                  fontSize={16}
                />
                <ResponsiveText
                  title={item?.artist}
                  fontColor={colors.gray}
                  fontSize={14}
                />
              </View>
            </View>

            {/* Playing Indicator & More Options */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(15),
              }}>
              {currentSong?.id === item.id && playing && (
                <Image
                  source={PNG_IMG.PLAYING_PNG}
                  style={{
                    height: scale(20),
                    width: scale(20),
                    tintColor: colors.white,
                  }}
                />
              )}
              <TouchableOpacity activeOpacity={0.7}>
                <Image
                  source={PNG_IMG.THREE_DOTS_PNG}
                  style={{
                    height: scale(24),
                    width: scale(24),
                    tintColor: colors.white,
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {showBottomPlayer && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100%',
            height: screenHeight * 0.1, // Increased height for better visibility
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            paddingVertical: scale(0),
            paddingHorizontal: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(5),
            justifyContent: 'space-between',
            elevation: 5, // Shadow effect for depth
            shadowColor: colors.primary,
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}>
          {/* Left - Song Info */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(15),
              }}>
              <Image
                source={{uri: currentSong?.artwork}}
                style={{
                  height: scale(50),
                  width: scale(50),
                  borderRadius: scale(10),
                }}
              />
              <View>
                <ResponsiveText
                  title={currentSong?.title || 'Unknown Title'}
                  fontColor={colors.white}
                  fontSize={14}
                  fontWeight="bold"
                />
                <ResponsiveText
                  title={currentSong?.artist || 'Unknown Artist'}
                  fontColor={colors.gray}
                  fontSize={12}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Right - Play/Pause Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={playing ? pauseSong : playSong}
            style={{
              backgroundColor: colors.primary,
              borderRadius: scale(25),
              width: scale(45),
              height: scale(45),
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 5, // 3D Effect
              shadowColor: colors.primary,
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }}>
            {playing ? (
              <Image
                source={PNG_IMG.PAUSE_PNG}
                style={{
                  height: scale(25),
                  width: scale(25),
                  tintColor: colors.white,
                }}
              />
            ) : (
              <IconPlay name="play" size={scale(25)} color={colors.white} />
            )}
          </TouchableOpacity>

          {/* 🎵 Gradient Progress Bar as Bottom Border */}
          <Slider
            style={{
              position: 'absolute',
              bottom: 0, // Stick to bottom border
              left: 10,
              right: 10,
              width: '100%',
              height: 5, // Slightly thicker for visibility
            }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={setPosition} // Update UI while dragging
            onSlidingStart={handleSlidingStart}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor={colors.Neon_Pink} // Neon Pink
            maximumTrackTintColor={colors.gray} // Gray
            thumbTintColor="transparent" // Glowing Orange Thumb
          />
        </View>
      )}

     
      <SongsPlayer
        currentSong={currentSong}
        playing={playing}
        onPlayPause={playing ? pauseSong : playSong}
        position={position}
        duration={duration}
        onSeek={handleSlidingComplete}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  IconStyle: {width: scale(30)},
  MusicControls: {
    color: '#3ad943',
  },
});
export default MusicDetailsScreen;
