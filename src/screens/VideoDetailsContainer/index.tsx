import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
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
import { globalStyles } from '../../styles/globalStyles';
import { videoUrls } from '../Home';

const VideoDetailsScreen = ({navigation}: any) => {
  const route = useRoute();
  const {videoUrl} = route.params;
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgrees] = useState(0);

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
  }, []);

  return (
    <SafeAreaView style={globalStyles.globalContainer}>
      <Icon
        name="arrow-back"
        size={30}
        color={colors.white}
        onPress={() => navigation.navigate(ScreenName.HOME_SCREEN_IN_AUTH)}
      />

      <View style={{marginTop: verticalScale(20)}}>
        <YouTubeIframe
          ref={youtubePlayerRef}
          videoId={videoId}
          height={250}
          play={playing}
          onReady={() => console.log('Video is ready')}
          onError={e => console.log('Error:', e)}
          onChangeState={onStateChange}
          initialPlayerParams={{
            controls: false,
            modestbranding: false,
            rel: false,
          }}
          webViewProps={{
            injectedJavaScript: `
              document.body.style.pointerEvents = 'none';
              var style = document.createElement('style');
              style.innerHTML = \`
                .ytp-chrome-top, 
                .ytp-watermark, 
                .ytp-title, 
                .ytp-pause-overlay, 
                .ytp-fullscreen-button, 
                .ytp-share-button, 
                .ytp-button { 
                  display: none !important; 
                }
              \`;
              document.head.appendChild(style);
            `,
          }}
        />
      </View>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor="#ff0000"
        maximumTrackTintColor="#ffffff"
        thumbTintColor="#ff0000"
        onSlidingComplete={value => {
          youtubePlayerRef.current?.seekTo(value * 100, true);
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePreviousVideo}>
          <Stepbackward
            name="stepbackward"
            size={moderateScale(24)}
            color={colors.white}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity onPress={skipRewind}>
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Icon
                name="replay-10"
                size={moderateScale(30)}
                color={colors.white}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePlayorPause}>
          <Icon
            name={playing ? 'pause' : 'play-arrow'}
            size={moderateScale(30)}
            color="white"
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={skipForward}>
            <Animated.View>
              <Icon
                name="forward-10"
                size={moderateScale(30)}
                color={colors.white}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View>
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
      </View>

      <View style={{marginVertical: verticalScale(20)}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(16),
  },
  progressBar: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default VideoDetailsScreen;
