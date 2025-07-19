import React, { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Like from 'react-native-vector-icons/AntDesign';
import ShareIcon from 'react-native-vector-icons/FontAwesome';
import CommentIcon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import { PNG_IMG } from '../../../constants/ImagesName';
import { colors } from '../../../styles/color';

const { height, width } = Dimensions.get('window');

const Shortvideos = [
  {
    id: '1',
    uri: require('../../../assets/videos/video.mp4'),
    likes: 138000,
    comments: 488,
    title: 'Epic Adventure',
    caption: 'Exploring the wild!',
    shareUrl: 'https://example.com/videos/epic-adventure',
  },
  {
    id: '2',
    uri: require('../../../assets/videos/video1.mp4'),
    likes: 138000,
    comments: 488,
    title: 'City Vibes',
    caption: 'Urban exploration at its best.',
    shareUrl: 'https://example.com/videos/city-vibes',
  },
  {
    id: '3',
    uri: require('../../../assets/videos/video2.mp4'),
    likes: 138000,
    comments: 488,
    title: 'Nature Bliss',
    caption: 'Chasing waterfalls.',
    shareUrl: 'https://example.com/videos/nature-bliss',
  },
  {
    id: '4',
    uri: require('../../../assets/videos/video3.mp4'),
    likes: 138000,
    comments: 488,
    title: 'Dance Fever',
    caption: 'Grooving to the beat!',
    shareUrl: 'https://example.com/videos/dance-fever',
  },
  {
    id: '5',
    uri: require('../../../assets/videos/video4.mp4'),
    likes: 138000,
    comments: 488,
    title: 'Foodie Heaven',
    caption: 'Tasty treats await!',
    shareUrl: 'https://example.com/videos/foodie-heaven',
  },
];

const VideoItem = React.memo(
  ({ item, isCurrent, paused, togglePlayPause, iconOpacity, videoRef }:any) => {
    const [like, setLike] = useState(false);

    const onShare = async () => {
      try {
        const shareOptions = {
          title: item.title,
          message: `${item.title}: ${item.caption} Check it out at ${item.shareUrl}`,
          url: item.shareUrl,
        };
        await Share.share(shareOptions);
      } catch (error) {
        console.warn('Share error:', error);
      }
    };

    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.videoTouchArea}
          onPress={togglePlayPause}>
          <Video
            source={item.uri}
            style={styles.video}
            resizeMode="contain"
            paused={!isCurrent || paused}
            repeat
            ref={videoRef}
          />
          <Animated.View
            style={[styles.playPauseIconContainer, { opacity: iconOpacity }]}>
            <ShareIcon
              name={paused || !isCurrent ? 'play' : 'pause'}
              size={scale(40)}
              color="white"
              style={{ marginLeft: paused || !isCurrent ? scale(10) : 0 }}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Like Button */}
        <View style={[styles.iconButton, { bottom: '42%' }]}>
          <TouchableOpacity
            onPress={() => setLike(!like)}
            activeOpacity={0.8}
            style={styles.iconWrapper}>
            <Like
              name={like ? 'like1' : 'like2'}
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
          <ResponsiveText
            title={`${(item.likes / 1000).toFixed(1)}k`}
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{ marginLeft: scale(5), marginTop: scale(2) }}
          />
        </View>

        {/* Comment Button */}
        <View style={[styles.iconButton, { bottom: '30%' }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconWrapper}
            onPress={() => console.log('Open comments for:', item.id)}>
            <CommentIcon name="comment" size={26} color={colors.white} />
          </TouchableOpacity>
          <ResponsiveText
            title={`${item.comments}`}
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{ marginLeft: scale(5), marginTop: scale(2) }}
          />
        </View>

        {/* Share Button */}
        <View style={[styles.iconButton, { bottom: '18%' }]}>
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.8}
            style={styles.iconWrapper}>
            <ShareIcon name="share" size={26} color={colors.white} />
          </TouchableOpacity>
          <ResponsiveText
            title="Share"
            fontColor={colors.white}
            fontWeight="600"
            fontStyle={{ marginLeft: scale(5), marginTop: scale(2) }}
          />
        </View>

        {/* Profile and Title */}
        <View style={styles.profileContainer}>
          <Image
            source={PNG_IMG.APP_LOGO_WEBP}
            style={styles.profileImage}
          />
          <ResponsiveText
            title={item.title}
            fontColor={colors.white}
            fontSize={16}
          />
        </View>

        {/* Caption */}
        <View style={styles.captionContainer}>
          <ResponsiveText
            title={item.caption}
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
  const [isTabFocused, setIsTabFocused] = useState(true);
  const [paused, setPaused] = useState(false);
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const videoRefs = useRef(Shortvideos.map(() => React.createRef())).current;

  useFocusEffect(
    useCallback(() => {
      setIsTabFocused(true);
      setPaused(false);
      return () => {
        setIsTabFocused(false);
        setPaused(true);
      };
    }, []),
  );

  const togglePlayPause = useCallback(() => {
    setPaused(prev => !prev);
    Animated.timing(iconOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(iconOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }, [iconOpacity]);

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        setCurrentIndex(index);
        setPaused(false);
      }
    },
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <VideoItem
        item={item}
        isCurrent={index === currentIndex && isTabFocused}
        paused={paused}
        togglePlayPause={togglePlayPause}
        iconOpacity={iconOpacity}
        videoRef={videoRefs[index]}
      />
    ),
    [currentIndex, isTabFocused, paused, togglePlayPause, iconOpacity],
  );

  return (
    <FlatList
      data={Shortvideos}
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
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    width,
    backgroundColor: '#000',
  },
  videoTouchArea: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playPauseIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
  },
  iconButton: {
    position: 'absolute',
    right: scale(10),
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: scale(8),
    borderRadius: scale(20),
  },
  profileContainer: {
    position: 'absolute',
    left: scale(10),
    bottom: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  profileImage: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(20),
  },
  captionContainer: {
    position: 'absolute',
    left: scale(10),
    bottom: '16%',
  },
});

export default ShortsScreen;