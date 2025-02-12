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
import {scale} from 'react-native-size-matters';
import {
  default as IconDownload,
  default as IconPlus,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconPause from 'react-native-vector-icons/MaterialCommunityIcons';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {PNG_IMG} from '../../constants/ImagesName';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {useEffect, useState} from 'react';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import IconPlay from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MusicDetailsScreen = ({navigation, route}) => {
  const {selectedSong, songsList} = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setupPlayer();
  }, []);

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

  const RestSongs = songsList.filter(item => item.id !== selectedSong.id);
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

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        {/* Artist Image */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(24),
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
          title={selectedSong?.title}
          fontColor={colors.gray}
          fontStyle={{marginTop: scale(10), textAlign: 'center'}}
          fontSize={(13)}
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
        title="2h 44 min"
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
            name="plus-circle"
            size={30}
            color={colors.white}
            style={{width: scale(30)}}
          />
          <IconDownload
            name="download-circle"
            size={30}
            color={colors.white}
            style={styles.IconStyle}
          />
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
          <Image
            source={PNG_IMG.SUFFLE_PNG}
            style={{
              tintColor: colors.white,
              height: scale(35),
              width: scale(35),
              resizeMode: 'contain',
            }}
          />

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {playing ? (
              <TouchableOpacity activeOpacity={0.8} onPress={pauseSong}>
                <Image
                  source={PNG_IMG.PAUSE_PNG}
                  style={{
                    height: scale(30),
                    width: scale(30),
                    tintColor: colors.ButtonColor,
                    marginLeft: scale(10),
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
                    marginLeft: scale(10),
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
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: index === 0 ? 0 : 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={{uri: item?.artwork}}
                    style={{width: 70, height: 70, borderRadius: scale(5)}}
                  />
                </View>
                <View>
                  <ResponsiveText
                    title={item?.title}
                    fontColor={colors.white}
                    fontSize={16}
                    fontStyle={{marginLeft: scale(16)}}
                  />
                  <ResponsiveText
                    title={item?.artist}
                    fontColor={colors.gray}
                    fontSize={14}
                    fontStyle={{marginLeft: scale(16)}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            
            <View>
              <Image
                source={PNG_IMG.THREE_DOTS_PNG}
                style={{height: scale(24), width: scale(24), tintColor: colors.white}}
              />
            </View>
          </View>
        )}
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
