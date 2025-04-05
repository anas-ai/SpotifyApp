import Slider from '@react-native-community/slider';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { default as Stepbackward, default as StepForward } from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import YouTubeIframe, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import { ScreenName } from '../../constants/ScreensNames';
import { colors } from '../../styles/color';
import { videoUrls } from '../Home';
import Orientation from 'react-native-orientation-locker';
import FullScreen from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { default as HeartIcon } from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../Contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const VideoDetailsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { videoUrl } = route.params;
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgrees] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isfullScreen, setIsfullScreen] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [refreshKey, setRefreshKey] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const Toast = useToast()

  useFocusEffect(
    useCallback(() => {
      return () => {
        Orientation.lockToPortrait();
        StatusBar.setHidden(false);
      };
    }, [])
  );

  useEffect(() => {
    if (isFullscreen) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
      SystemNavigationBar.stickyImmersive();
    } else {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  useEffect(() => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.getDuration().then(duration => {
        setTotalDuration(duration);
      });
    }
  }, []);

  const handleScreenTap = () => {
    if (isFullscreen) {
      setShowControls(true);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    }
    setIsFullscreen(!isFullscreen);
    setShowControls(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.getCurrentTime().then(time => {
          setCurrentTime(time);
          setProgrees(totalDuration ? time / totalDuration : 0);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalDuration]);

  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const videoId = videoUrl.includes('youtube.com/embed/')
    ? videoUrl.split('/embed/')[1].split('?')[0]
    : videoUrl.split('/')[4];

  // Define currentVideo object for favorites purposes
  const currentVideo = {
    id: videoId,
    category: 'video',
    title: route.params.title || 'Video Title',
    artwork: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    url: videoUrl,
  };

  const CategoryVideo = videoUrls.filter(
    (item: { link: string }) =>
      item?.link.includes('youtube.com/embed/') &&
      item?.link.split('/embed/')[1].split('?')[0] !== videoId
  );

  const skipForward = useCallback(async () => {
    animationButton();
    if (youtubePlayerRef.current) {
      const currentTime = await youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime + 10, true);
    }
  }, []);

  const animationButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      youtubePlayerRef.current?.getCurrentTime().then(currentTime => {
        youtubePlayerRef.current?.getDuration().then(duration => {
          if (duration > 0) {
            setProgrees(currentTime / duration);
          }
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const skipRewind = useCallback(async () => {
    animationButton();
    if (youtubePlayerRef.current) {
      const currentTime = await youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(Math.max(0, currentTime - 10), true);
    }
  }, []);

  const handlePlayorPause = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleNextVideo = useCallback(() => {
    if (currentIndex < CategoryVideo.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPlaying(false);
      navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
        videoUrl: CategoryVideo[currentIndex + 1]?.link,
      });
    }
  }, [currentIndex, CategoryVideo, navigation]);

  const handlePreviousVideo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setPlaying(false);
      navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
        videoUrl: CategoryVideo[currentIndex - 1]?.link,
      });
    }
  }, [currentIndex, CategoryVideo, navigation]);

  const onStateChange = useCallback(state => {
    if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused' || state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

 // Load favorites from AsyncStorage when component mounts
 useEffect(() => {
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("video");
      if (storedFavorites) {
        dispatch({ type: "ADD_TO_FAVORITES_VIDEOS", payload: JSON.parse(storedFavorites) });
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };
  loadFavorites();
}, []);


  // Check if the current video is already in favorites
  useEffect(() => {
    const checkFavoriteStatus = () => {
      const isFav = state?.favoritesVideos?.favoritesVideo.some(
        video => video.id === currentVideo?.id
      );
      setIsFavorites(isFav);
    };
    checkFavoriteStatus();
  }, [state?.favoritesVideos?.favoritesVideo, currentVideo]); // FIX: Correct dependency
  

  // Toggle adding or removing the current video from favorites
  const toggleFavoriteVideo = async () => {
    if (!currentVideo) return;
  
    let updatedFavorites = [];
  
    if (isFavorites) {
      updatedFavorites = state?.favoritesVideos?.favoritesVideo.filter(
        video => video.id !== currentVideo.id
      );
      setIsFavorites(false);
      dispatch({ type: 'REMOVE_FROM_FAVORITES_VIDEOS', payload: currentVideo.id }); // FIX: Pass only ID
      Toast.show('Video removed from favorites', {
        type: 'danger', // FIX: Corrected "denger" to "danger"
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else {
      updatedFavorites = [...state?.favoritesVideos?.favoritesVideo, currentVideo];
      setIsFavorites(true);
      dispatch({ type: 'ADD_TO_FAVORITES_VIDEOS', payload: currentVideo }); // FIX: Correct action type
      Toast.show('Video added to favorites', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  
    await AsyncStorage.setItem('video', JSON.stringify(updatedFavorites));
    setAlertVisible(true);
    setRefreshKey(prevKey => prevKey + 1);
  };
  

  useEffect(() => {
    console.log('Updated Favorites:', state?.favoritesVideos?.favoritesVideo);
  }, [state?.favoritesVideos]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bgBlack,
        paddingHorizontal: scale(4),
      }}>
      

      <View style={[styles.YouTubeIframeStyleContainer]}>
        <View style={[styles.videoWrapper]}>
          <YouTubeIframe
            ref={youtubePlayerRef}
            videoId={videoId}
            height={isFullscreen ? Dimensions.get('window').height : '100%'}
            width={isFullscreen ? Dimensions.get('window').width * 1.08 : '100%'}
            play={playing}
            onReady={() => console.log('Video is ready')}
            onProgress={({ currentTime }) => setCurrentTime(currentTime)}
            onError={e => console.log('Error:', e)}
            onChangeState={onStateChange}
            initialPlayerParams={{
              controls: false,
              modestbranding: false,
              rel: false,
              showinfo: false,
              iv_load_policy: 3,
              fs: 0,
              playsinline: 1,
            }}
            webViewProps={{
              injectedJavaScript: `
                var removeElements = function() {
                  var elements = [
                    '.ytp-chrome-top', 
                    '.ytp-watermark', 
                    '.ytp-title', 
                    '.ytp-title-text', 
                    '.ytp-pause-overlay', 
                    '.ytp-fullscreen-button', 
                    '.ytp-share-button', 
                    '.ytp-button', 
                    '.ytp-settings-button', 
                    '.ytp-subtitles-button', 
                    '.ytp-gradient-bottom', 
                    '.ytp-gradient-top', 
                    '.ytp-spinner', 
                    '.ytp-time-display', 
                    '.ytp-progress-bar', 
                    '.ytp-ad-overlay-container', 
                    '.ytp-autonav-endscreen-upnext', 
                    '.ytp-autonav-endscreen', 
                    '.ytp-cued-thumbnail-overlay', 
                    '.ytp-show-cards-title', 
                    '.ytp-tooltip', 
                    '.ytp-play-button', 
                    '.ytp-endscreen-content', 
                    '.ytp-ce-element', 
                    '.ytp-scroll-min', 
                    '.ytp-caption-window', 
                    '.ytp-caption-segment', 
                    '.ytp-next-button', 
                    '.ytp-autonav-toggle-button-container', 
                    '.ytp-endscreen-previous', 
                    '.ytp-endscreen-next', 
                    '.ytp-title-text', 
                    '.ytp-description-text', 
                    '.ytp-channel-name', 
                    '.ytp-watch-queue-stats'
                  ];
                  elements.forEach(selector => {
                    var el = document.querySelector(selector);
                    if (el) el.style.display = 'none';
                  });
                };
                setTimeout(removeElements, 2000);
                setInterval(removeElements, 500);
                var overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'transparent';
                overlay.style.zIndex = '9999';
                overlay.style.pointerEvents = 'auto';
                document.body.appendChild(overlay);
              `,
            }}
          />
        </View>
      </View>

      <View style={styles.formatTime}>
        <Text style={{ color: colors.white, fontSize: scale(10) }}>
          {formatTime(currentTime)} / {formatTime(totalDuration - currentTime)}
        </Text>
        <TouchableOpacity onPress={toggleFavoriteVideo} style={{position:'absolute'}}>
          <HeartIcon
            name={isFavorites ? 'heart' : 'hearto'}
            size={scale(20)}
            color={isFavorites ? 'red' : colors.white}
            style={{ width: scale(30) ,bottom:scale(30),left:scale(10)}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFullscreen} activeOpacity={0.8}>
          <FullScreen
            name={isfullScreen ? 'fullscreen-exit' : 'fullscreen'}
            size={28}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleScreenTap}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(8),
          }}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onValueChange={setProgrees}
            onSlidingStart={() => setPlaying(false)}
            onSlidingComplete={value => {
              youtubePlayerRef.current?.seekTo(value * totalDuration, true);
              setPlaying(true);
            }}
            minimumTrackTintColor={colors.ButtonColor}
            maximumTrackTintColor={colors.gray}
            thumbTintColor={colors.ButtonColor}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePreviousVideo}>
          <Stepbackward
            name="stepbackward"
            size={moderateScale(24)}
            color={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipRewind}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Icon name="replay-10" size={moderateScale(30)} color={colors.white} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayorPause}>
          <Icon name={playing ? 'pause' : 'play-arrow'} size={moderateScale(30)} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipForward}>
          <Animated.View>
            <Icon name="forward-10" size={moderateScale(30)} color={colors.white} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextVideo}>
          <Animated.View>
            <StepForward name="stepforward" size={moderateScale(24)} color={colors.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {!isFullscreen && (
        <View
          style={{
            marginVertical: verticalScale(20),
            paddingHorizontal: scale(8),
          }}>
          <ResponsiveText
            title="Related Videos"
            fontColor={colors.white}
            fontWeight="700"
            fontSize={20}
            fontStyle={{ paddingVertical: scale(10) }}
          />
          <FlatList
            data={CategoryVideo}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                    videoId: item.id,
                    videoUrl: item.link,
                  })
                }
                style={{ marginLeft: index === 0 ? 0 : 15 }}>
                <Image
                  source={{
                    uri: `https://img.youtube.com/vi/${
                      item.link.split('/embed/')[1].split('?')[0]
                    }/0.jpg`,
                  }}
                  style={{
                    width: Dimensions.get('window').width * 0.6,
                    height: Dimensions.get('window').height * 0.25,
                    borderRadius: scale(10),
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  formatTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    marginTop: scale(32),
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 5,
    marginVertical: 8,
  },
  YouTubeIframeStyleContainer: {
    height: SCREEN_HEIGHT * 0.26,
  },
  fullscreenContainer: {
    top: 0,
    left: 0,
    width: SCREEN_HEIGHT,
    height: SCREEN_WIDTH,
    backgroundColor: 'black',
    zIndex: 9999,
  },
  videoWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default VideoDetailsScreen;
