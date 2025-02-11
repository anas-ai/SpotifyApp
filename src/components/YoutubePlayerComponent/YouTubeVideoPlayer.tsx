import React, {useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import {colors} from '../../styles/color';
import {moderateScale, scale} from 'react-native-size-matters';
import ResponsiveText from '../ResponsiveText/ResponsiveText';
import CustomButton from '../CustomButton/CustomButton';

const extractVideoId = url => {
  const regex = /(?:embed\/|v=|v\/|watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YouTubeVideoPlayer = ({videoUrls}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const currentVideoId = extractVideoId(videoUrls[currentIndex]);
  const handlePlayPause = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const handleNextVideo = useCallback(() => {
    if (currentIndex < videoUrls.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPlaying(false);
    }
  }, [currentIndex, videoUrls.length]);

  const handlePreviousVideo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setPlaying(false);
    }
  }, [currentIndex]);

  const onStateChange = useCallback(state => {
    if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused' || state === 'ended') {
      setPlaying(false);
    }
  }, []);

  if (!currentVideoId) {
    return <Text>Invalid YouTube URL</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <YouTubeIframe
        videoId={currentVideoId}
        height={250}
        play={playing}
        onChangeState={onStateChange}
        onError={error => console.log(error)}
        onReady={() => console.log('Video is ready')}
        initialPlayerParams={{
          controls: false,
          modestbranding: false,
          rel: false,
        }}
        webViewProps={{
          injectedJavaScript: `
              document.body.style.pointerEvents = 'none';
              var style = document.createElement('style');
              style.innerHTML = '
                .ytp-chrome-top, 
                .ytp-watermark, 
                .ytp-title, 
                .ytp-pause-overlay, 
                .ytp-fullscreen-button, 
                .ytp-share-button, 
                .ytp-button { 
                  display: none !important; 
                }';
              document.head.appendChild(style);
            `,
          onShouldStartLoadWithRequest: request => {
            return request.url.startsWith('https://www.youtube.com/embed/');
          },
        }}
      />

      <Text style={styles.progressText}>
        Video {currentIndex + 1} of {videoUrls.length}
      </Text>

      <View style={styles.controls}>
        <CustomButton
          title="Previous"
          onPress={handlePreviousVideo}
          titleStyle={{fontSize: moderateScale(16)}}
          disabled={currentIndex === 0}
        />

        <CustomButton title="-10" titleStyle={{fontSize: moderateScale(16)}} />
        <CustomButton
          title={playing ? 'Pause' : 'Play'}
          onPress={handlePlayPause}
          titleStyle={{fontSize: moderateScale(16)}}
        />
        <CustomButton title="+10" titleStyle={{fontSize: moderateScale(16)}} />
        <CustomButton
          title="Next"
          titleStyle={{fontSize: moderateScale(16)}}
          onPress={handleNextVideo}
          disabled={currentIndex === videoUrls.length - 1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#B0B0B0', // Gray color for disabled button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledText: {
    color: '#D3D3D3', // Light gray color for disabled text
  },
  progressText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
});

const App = () => {
  const youtubeLinks = [
    'https://www.youtube.com/embed/25VRdPO8xJ0',
    'https://www.youtube.com/embed/WQdqgrWvy6g',
    'https://www.youtube.com/embed/4kGVdHt0U5o',
    'https://www.youtube.com/embed/NXM37eeDF74',
    'https://www.youtube.com/embed/A_1V9AColh4',
    'https://www.youtube.com/embed/V258-P0Zhs8',
  ];

  return <YouTubeVideoPlayer videoUrls={youtubeLinks} />;
};

export default App;
