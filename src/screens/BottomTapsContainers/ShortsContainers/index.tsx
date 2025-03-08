import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {scale} from 'react-native-size-matters';
import {colors} from '../../../styles/color';
import Like from 'react-native-vector-icons/AntDesign';
import DisLike from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import {PNG_IMG} from '../../../constants/ImagesName';
const {height, width} = Dimensions.get('window');

const videos = [
  {
    id: '1',
    uri: require('../../../assets/videos/video.mp4'),
    likes: 138000,
    comments: 488,
  },
  {
    id: '2',
    uri: require('../../../assets/videos/video1.mp4'),
    likes: 138000,
    comments: 488,
  },
  {
    id: '3',
    uri: require('../../../assets/videos/video2.mp4'),
    likes: 138000,
    comments: 488,
  },
  {
    id: '4',
    uri: require('../../../assets/videos/video3.mp4'),
    likes: 138000,
    comments: 488,
  },
  {
    id: '5',
    uri: require('../../../assets/videos/video4.mp4'),
    likes: 138000,
    comments: 488,
  },
];

const VideoItem = React.memo(
  ({item, paused, togglePlayPause, iconOpacity}: any) => {
    const [like, setLike] = useState(false);

    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.videoTouchArea}
          onPress={togglePlayPause}>
          <Video
            source={item.uri}
            style={styles.video}
            resizeMode="cover"
            paused={paused}
            repeat
          />
          <Animated.View
            style={[styles.playPauseIconContainer, {opacity: iconOpacity}]}>
            <Icon
              name={paused ? 'play' : 'pause'}
              size={scale(40)}
              color="white"
              style={{marginLeft:paused ? scale(10):0}}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Like Button */}
        <View style={[styles.iconButton, {bottom: '42%'}]}>
          <TouchableOpacity
            onPress={() => setLike(!like)}
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: scale(8),
              borderRadius: scale(20),
            }}>
            <Like
              name={like ? 'like1' : 'like2'}
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
          <ResponsiveText
            title="Like"
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{marginLeft: scale(5), marginTop: scale(2)}}
          />
        </View>

        {/* Comment Button */}
        <View style={[styles.iconButton, {bottom: '30%'}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: scale(8),
              borderRadius: scale(20),
            }}>
            <CommentIcon name="comment" size={26} color={colors.white} />
          </TouchableOpacity>
          <ResponsiveText
            title="Like"
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{marginLeft: scale(5), marginTop: scale(2)}}
          />
        </View>

        {/* Share Button */}
        <View style={[styles.iconButton, {bottom: '18%'}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: scale(8),
              borderRadius: scale(20),
            }}>
            <ShareIcon name="share" size={26} color={colors.white} />
          </TouchableOpacity>
          <ResponsiveText
            title="Like"
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{marginLeft: scale(5), marginTop: scale(2)}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: scale(10),
            bottom: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(10),
          }}>
          <Image
            source={PNG_IMG.VIRAT_PNG}
            style={{
              height: scale(32),
              width: scale(32),
              borderRadius: scale(20),
            }}
          />
          <ResponsiveText
            title="this is title"
            fontColor={colors.white}
            fontSize={16}
          />
        </View>

        <View style={{position: 'absolute', left: scale(10), bottom: '16%'}}>
          <ResponsiveText
            title="this is caption"
            fontColor={colors.white}
            fontSize={18}
          />
        </View>
      </View>
    );
  },
);

const ShortsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [like, setLike] = useState(false);
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const videoRefs = useRef(videos.map(() => React.createRef())); // Initialize refs for each video

  const togglePlayPause = () => {
    setPaused(!paused);
    iconOpacity.setValue(1);
    Animated.timing(iconOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleSeek = (time, totalDuration = duration) => {
    setCurrentTime(time);
    setDuration(totalDuration);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      const videoRef = videoRefs.current[index]; // Get the ref for the current video

      return (
        <VideoItem
          item={item}
          paused={paused && index === currentIndex}
          togglePlayPause={togglePlayPause}
          iconOpacity={iconOpacity}
          handleLike={() => console.log('Liked:', item.id)}
          handleDislike={() => console.log('Disliked:', item.id)}
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          videoRef={videoRef}
          like={like}
          setLike={setLike}
        />
      );
    },
    [paused, currentIndex, currentTime, duration],
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
      windowSize={3}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      onScroll={event =>
        setCurrentIndex(Math.round(event.nativeEvent.contentOffset.y / height))
      }
    />
  );
};

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    width,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTouchArea: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {height: '100%', width: '100%'},
  playPauseIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
  },
  sliderContainer: {
    position: 'absolute',
    bottom: scale(80),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  slider: {flex: 1, marginHorizontal: scale(10), width: '100%'},
  timeText: {color: colors.white, fontSize: scale(10)},
  iconButton: {
    position: 'absolute',
    right: scale(10),
    padding: scale(8),
    borderRadius: scale(20),
  },
});

export default ShortsScreen;
