import Slider from '@react-native-community/slider';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {
  default as Stepbackward,
  default as StepForward,
} from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import YouTubeIframe, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import ResponsiveText from '../../components/ResponsiveText/ResponsiveText';
import {ScreenName} from '../../constants/ScreensNames';
import {colors} from '../../styles/color';
import {videoUrls} from '../Home';
import Orientation from 'react-native-orientation-locker';
import FullScreen from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {default as HeartIcon} from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../Contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {styles} from './style';

const {width, height} = Dimensions.get('window');

const VideoDetailsScreen = ({navigation}: any) => {
  const route = useRoute();
  const {videoUrl, videoItem, videoTitle} = route.params;
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFavorites, setIsFavorites] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const {state, dispatch} = useContext(AuthContext);
  const Toast = useToast();
  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const videoId = videoUrl.includes('youtube.com/embed/')
    ? videoUrl.split('/embed/')[1].split('?')[0]
    : videoUrl.split('/')[4];

  const currentVideo = {
    id: videoId,
    category: 'video',
    title: videoItem?.title || videoTitle || 'Video Title',
    artwork: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    url: videoUrl,
  };

  const RestVide = videoUrls.filter(item => item.id !== videoId);

  useFocusEffect(
    useCallback(() => {
      return () => {
        Orientation.lockToPortrait();
        StatusBar.setHidden(false);
      };
    }, []),
  );

  useEffect(() => {
    console.log('Route Params:', {videoUrl, videoItem, videoTitle});
  }, [videoUrl, videoItem, videoTitle]);

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
    const interval = setInterval(async () => {
      if (youtubePlayerRef.current) {
        const currentTime = await youtubePlayerRef.current.getCurrentTime();
        const duration = await youtubePlayerRef.current.getDuration();
        setCurrentTime(currentTime);
        setDuration(duration);
        if (duration > 0) {
          setProgress(currentTime / duration);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
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

  const skipForward = useCallback(async () => {
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
    if (youtubePlayerRef.current) {
      const currentTime = await youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime + 10, true);
    }
  }, []);

  const skipRewind = useCallback(async () => {
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
    if (youtubePlayerRef.current) {
      const currentTime = await youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(Math.max(0, currentTime - 10), true);
    }
  }, []);

  const handlePlayorPause = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleNextVideo = useCallback(() => {
    const nextIndex = (currentIndex + 1) % RestVide.length;
    setCurrentIndex(nextIndex);
    setPlaying(false);
    navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
      videoUrl: RestVide[nextIndex]?.link,
      videoItem: RestVide[nextIndex],
      videoTitle: RestVide[nextIndex]?.title,
    });
  }, [currentIndex, RestVide, navigation]);

  const handlePreviousVideo = useCallback(() => {
    const prevIndex = (currentIndex - 1 + RestVide.length) % RestVide.length;
    setCurrentIndex(prevIndex);
    setPlaying(false);
    navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
      videoUrl: RestVide[prevIndex]?.link,
      videoItem: RestVide[prevIndex],
      videoTitle: RestVide[prevIndex]?.title,
    });
  }, [currentIndex, RestVide, navigation]);

  const onStateChange = useCallback(
    state => {
      if (state === 'playing') setPlaying(true);
      if (state === 'paused') setPlaying(false);
      if (state === 'ended') handleNextVideo();
    },
    [handleNextVideo],
  );

  const formatTime = (duration: number, currentTime: number): string => {
    if (!duration || isNaN(duration) || !currentTime || isNaN(currentTime))
      return '0:00';
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    return `${currentMinutes}:${
      currentSeconds < 10 ? '0' : ''
    }${currentSeconds} / ${totalMinutes}:${
      totalSeconds < 10 ? '0' : ''
    }${totalSeconds}`;
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('video');
        if (storedFavorites) {
          dispatch({
            type: 'ADD_TO_FAVORITES_VIDEOS',
            payload: JSON.parse(storedFavorites),
          });
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const isFav = state?.favoritesVideos?.favoritesVideo.some(
      video => video.id === currentVideo?.id,
    );
    setIsFavorites(isFav);
  }, [state?.favoritesVideos?.favoritesVideo, currentVideo?.id]);

  const toggleFavoriteVideo = async () => {
    if (!currentVideo) return;
    let updatedFavorites = [];
    if (isFavorites) {
      updatedFavorites = state?.favoritesVideos?.favoritesVideo.filter(
        video => video.id !== currentVideo.id,
      );
      setIsFavorites(false);
      dispatch({
        type: 'REMOVE_FROM_FAVORITES_VIDEOS',
        payload: currentVideo.id,
      });
      Toast.show('Video removed from favorites', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else {
      updatedFavorites = [
        ...state?.favoritesVideos?.favoritesVideo,
        currentVideo,
      ];
      setIsFavorites(true);
      dispatch({type: 'ADD_TO_FAVORITES_VIDEOS', payload: currentVideo});
      Toast.show('Video added to favorites', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
    await AsyncStorage.setItem('video', JSON.stringify(updatedFavorites));
    setRefreshKey(prevKey => prevKey + 1);
  };

  const onReady = async () => {
    if (youtubePlayerRef.current) {
      const dur = await youtubePlayerRef.current.getDuration();
      setDuration(dur);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bgBlack,
      }}>
      <View style={[styles.YouTubeIframeStyleContainer]}>
        <View style={[styles.videoWrapper]}>
          <YouTubeIframe
            ref={youtubePlayerRef}
            videoId={videoId}
            height={isFullscreen ? height : moderateScale(230)}
            play={playing}
            onReady={onReady}
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
      {!isFullscreen && (
        <ResponsiveText
          title={videoItem?.title || videoTitle || 'Video Title'}
          fontColor={colors.white}
          fontSize={14}
          fontStyle={{
            textAlign: 'center',
            paddingVertical: scale(10),
            fontWeight: '500',
          }}
        />
      )}
      <View style={[styles.formatTime]}>
        <ResponsiveText
          title={formatTime(duration, currentTime)}
          fontColor={colors.white}
          fontSize={12}
          fontStyle={{
            alignSelf: 'center',
            backgroundColor: isFullscreen
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: scale(12),
            paddingVertical: scale(8),
            borderRadius: scale(6),
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleFavoriteVideo}
          style={{position: 'absolute'}}>
          <HeartIcon
            name={isFavorites ? 'heart' : 'hearto'}
            size={scale(20)}
            color={isFavorites ? 'red' : colors.white}
            style={{width: scale(30), bottom: scale(30), left: scale(14)}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFullscreen} activeOpacity={0.9}>
          <FullScreen
            name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
            size={28}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleScreenTap} activeOpacity={0.9}>
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
            onValueChange={value => {
              setProgress(value);
              setPlaying(false);
            }}
            onSlidingComplete={async value => {
              if (youtubePlayerRef.current) {
                const seekTime = value * duration;
                await youtubePlayerRef.current.seekTo(seekTime, true);
                setCurrentTime(seekTime);
                setPlaying(true);
              }
            }}
            minimumTrackTintColor={colors.ButtonColor}
            maximumTrackTintColor={colors.gray}
            thumbTintColor={colors.ButtonColor}
          />
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.controls,
          isFullscreen && {
            position: 'absolute',
            bottom: scale(0),
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            paddingVertical: scale(12),
            paddingHorizontal: scale(20),
            zIndex: 1000,
          },
        ]}>
        <TouchableOpacity onPress={handlePreviousVideo} activeOpacity={0.9}>
          <Stepbackward
            name="stepbackward"
            size={moderateScale(24)}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipRewind} activeOpacity={0.9}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <Icon
              name="replay-10"
              size={moderateScale(30)}
              color={colors.white}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayorPause} activeOpacity={0.9}>
          <Icon
            name={playing ? 'pause' : 'play-arrow'}
            size={moderateScale(30)}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward} activeOpacity={0.9}>
          <Animated.View>
            <Icon
              name="forward-10"
              size={moderateScale(30)}
              color={colors.white}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextVideo} activeOpacity={0.9}>
          <Animated.View>
            <StepForward
              name="stepforward"
              size={moderateScale(24)}
              color={colors.white}
            />
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
            fontStyle={{paddingVertical: scale(10)}}
          />
          <FlatList
            data={RestVide}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                    videoUrl: item.link,
                    videoItem: item,
                    videoTitle: item.title,
                  })
                }
                style={{marginLeft: index === 0 ? 0 : 15}}>
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
                <ResponsiveText
                  title={
                    item?.title.length > 10
                      ? item?.title.slice(0, 24) + '...'
                      : item?.title
                  }
                  fontColor={colors.white}
                  fontSize={14}
                  fontStyle={{
                    textAlign: 'center',
                    paddingVertical: scale(10),
                    fontWeight: '500',
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

export default VideoDetailsScreen;