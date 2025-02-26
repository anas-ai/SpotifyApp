import Slider from '@react-native-community/slider';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
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
import {globalStyles} from '../../styles/globalStyles';
import {videoUrls} from '../Home';
import Orientation from 'react-native-orientation-locker';
import FullScreen from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

// Determine if the device is in landscape mode
const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

const VideoDetailsScreen = ({navigation}: any) => {
  const route = useRoute();
  const {videoUrl} = route.params;
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgrees] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isfullScreen, setIsfullScreen] = useState(false);

  useFocusEffect(useCallback(()=>{
    return ()=>{
      Orientation.lockToPortrait()
      StatusBar.setHidden(false)
    }
  },[]))

  useEffect(() => {
    if (isFullscreen) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
      SystemNavigationBar.stickyImmersive();
    } else {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
      // SystemNavigationBar.leanBack();
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
    setShowControls(true); // Fullscreen switch pe bhi controls dikho
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.getCurrentTime().then(time => {
          setCurrentTime(time);
          setProgrees(time / totalDuration); // Normalize progress
        });
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [totalDuration]);

  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const videoId = videoUrl.includes('youtube.com/embed/')
    ? videoUrl.split('/embed/')[1].split('?')[0]
    : videoUrl.split('/')[4];

  const CategoryVideo = videoUrls.filter(
    (item: {link: string}) =>
      item?.link.includes('youtube.com/embed/') &&
      item?.link.split('/embed/')[1].split('?')[0] !== videoId,
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
            setProgrees(currentTime / duration); // Normalize value between 0 and 1
          }
        });
      });
    }, 1000); // Update every second

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
    setPlaying(!playing);
  }, [playing]);

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

  const onProgress = useCallback(({currentTime, duration}) => {
    setProgrees(currentTime / duration);
    setTotalDuration(duration); // Store the total video duration
  }, []);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bgBlack,
        paddingVertical: scale(14),
        paddingHorizontal: scale(4),
      }}>
      {!isFullscreen && (
        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH)}
        />
      )}

      <View
        style={[
          styles.YouTubeIframeStyleContainer,
          isFullscreen && styles.fullscreenContainer,
        ]}>
        <View
          style={[styles.videoWrapper, isFullscreen && styles.fullscreenVideo]}>
          <YouTubeIframe
            ref={youtubePlayerRef}
            videoId={videoId}
            height={'100%'}
            play={playing}
            onReady={() => console.log('Video is ready')}
            onProgress={({currentTime}) => setCurrentTime(currentTime)}
            onError={e => console.log('Error:', e)}
            onChangeState={onStateChange}
            initialPlayerParams={{
              controls: false, // Hide controls
              modestbranding: false, // Reduce YouTube branding
              rel: false, // Disable related videos
              showinfo: false, // Hide title (deprecated, but still useful)
              iv_load_policy: 3, // Hide annotations
              fs: 0, // Disable fullscreen button
              playsinline: 1, // Prevents fullscreen auto-switching
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

        // Run function when iframe loads
        setTimeout(removeElements, 2000);
        setInterval(removeElements, 500); // Keep hiding elements if they reappear

        // Block all clicks on YouTube iframe
        var overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'transparent';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'auto'; // Block YouTube clicks

        document.body.appendChild(overlay);
      `,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(10),
          paddingTop: scale(10),
        }}>
        <Text style={{color: colors.white, fontSize: scale(10)}}>
          {formatTime(currentTime)} / {formatTime(totalDuration - currentTime)}
        </Text>

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
            maximumValue={1} // Normalized progress (0 to 1)
            value={progress} // Updated progress state
            onValueChange={setProgrees} // Allows UI update while dragging
            onSlidingStart={() => setPlaying(false)} // Pause while dragging
            onSlidingComplete={value => {
              youtubePlayerRef.current?.seekTo(value * totalDuration, true);
              setPlaying(true); // Resume playing
            }}
            minimumTrackTintColor={colors.ButtonColor} // Neon Pink
            maximumTrackTintColor={colors.gray} // Gray
            thumbTintColor={colors.ButtonColor} // Transparent thumb
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
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <Icon
              name="replay-10"
              size={moderateScale(30)}
              color={colors.white}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayorPause}>
          <Icon
            name={playing ? 'pause' : 'play-arrow'}
            size={moderateScale(30)}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Animated.View>
            <Icon
              name="forward-10"
              size={moderateScale(30)}
              color={colors.white}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextVideo}>
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
                 data={CategoryVideo}
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 keyExtractor={(item, index) =>
                   item?.id ? item.id.toString() : index.toString()
                 }
                 renderItem={({item, index}) => (
                   <TouchableOpacity
                     onPress={() =>
                       navigation.navigate(ScreenName.VIDEO_DETAILS_SCREEN, {
                         videoId: item.id,
                         videoUrl: item.link,
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
                   </TouchableOpacity>
                 )}
               />
             </View>
            )}
     
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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
    backgroundColor: 'black',
    width:'100%',
    height:SCREEN_HEIGHT * 0.25
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_HEIGHT,  // Swap width & height for landscape
    height: SCREEN_WIDTH,
    backgroundColor: 'black',
    zIndex: 9999,
  },
  videoWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fullscreenVideo: {
    position: 'absolute',
    width: SCREEN_HEIGHT,
    height: SCREEN_WIDTH,
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
