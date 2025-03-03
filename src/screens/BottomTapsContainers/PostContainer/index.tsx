import {
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import CustomBackButton from '../../../components/BackButtonComponents/CustomBackButton';
import {scale} from 'react-native-size-matters';
import {PNG_IMG} from '../../../constants/ImagesName';
import {colors} from '../../../styles/color';
import TreeDots from 'react-native-vector-icons/MaterialCommunityIcons';
import IconHeart from 'react-native-vector-icons/MaterialCommunityIcons';
import IconShare from 'react-native-vector-icons/MaterialCommunityIcons';
import IconComment from 'react-native-vector-icons/FontAwesome';
import IconSave from 'react-native-vector-icons/FontAwesome';
import ResponsiveText from '../../../components/ResponsiveText/ResponsiveText';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import ReactNativeModal from 'react-native-modal';
import {ScreenWidth} from '@rneui/base';

const screenHeight = Dimensions.get('screen').height;

const PostScreen = ({navigation}: any) => {
  const [likeCount, setLikeCount] = useState(1200);
  const [like, setLike] = useState(false);
  const [post, setPost] = useState([
    {id: '1', user: 'Virat Kohli', image: PNG_IMG.VIRAT_PNG},
    {id: '2', user: 'MS Dhoni', image: PNG_IMG.VIRAT_PNG},
    {id: '3', user: 'Sachin Tendulkar', image: PNG_IMG.VIRAT_PNG},
  ]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const actionSheetRef = useRef<ActionSheetRef | null>(null);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isVisible, setIsvisible] = useState(false);

  const formatLikeCount = (num: number) => {
    if (num > 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
  };

  const handleLike = () => {
    setLike(!like);
    setLikeCount(prev => (like ? prev - 1 : prev + 1));
  };

  const handleOpenActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments(prevComments => [newComment, ...prevComments]);
      setNewComment('');
    }
  };

  const toggleModal = (postId: string | null = null) => {
    setSelectedPostId(postId);
    setIsvisible(prev => !prev);
  };

  const deletePost = () => {
    if (selectedPostId) {
      setPost(prevPosts =>
        prevPosts.filter(post => post.id !== selectedPostId),
      );
      toggleModal(); // Close the modal after deleting
    }
  };

  return (
    <View style={globalStyles.globalContainer}>
      <CustomBackButton
        navigation={navigation}
        title="Post"
        paddingLeft={scale(20)}
        paddingBottom={scale(20)}
      />
      <Animated.FlatList
        data={post}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: scale(60)}} />}
        ListEmptyComponent={<View style={{flex:1,alignItems:'center'}}>
          <ResponsiveText title='No post Available now !' fontColor={colors.white} fontWeight='500' fontSize={18}/>
        </View>}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * screenHeight * 0.6,
            index * screenHeight * 0.6,
            (index + 1) * screenHeight * 0.6,
          ];

          // Scale effect
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95], // Slight zoom effect
            extrapolate: 'clamp',
          });

          // Fade effect
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7], // Fades slightly
            extrapolate: 'clamp',
          });

          // Parallax effect on the image
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [20, 0, -20], // Moves up/down slightly while scrolling
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.postContainer, {opacity, transform: [{scale}]}]}>
              <View style={styles.headerStyles}>
                <View style={styles.userInfo}>
                  <Image source={PNG_IMG.VIRAT_PNG} style={styles.imgeStyle} />
                  <ResponsiveText
                    title={item?.user}
                    fontColor={colors.gray}
                    fontWeight="500"
                    fontSize={14}
                  />
                </View>
                <TouchableOpacity onPress={() => toggleModal(item.id)}>
                  <TreeDots
                    name="dots-vertical"
                    size={24}
                    style={styles.ThreeDotsStyle}
                  />
                </TouchableOpacity>
              </View>

              <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={toggleModal}>
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={toggleModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      onPress={deletePost}
                      style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Delete Post</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>

              <Animated.View
                style={[
                  styles.postImageContainer,
                  {transform: [{translateY}]},
                ]}>
                <Image
                  source={PNG_IMG.VIRAT_PNG}
                  style={styles.postImageStyle}
                />
              </Animated.View>

              <View style={styles.actionContainer}>
                <View style={styles.leftActions}>
                  <View style={styles.action}>
                    <IconHeart
                      name={like ? 'heart' : 'heart-outline'}
                      size={24}
                      color={like ? colors.red : colors.white}
                      onPress={handleLike}
                    />
                    <ResponsiveText
                      title={formatLikeCount(likeCount)}
                      fontColor={colors.white}
                      fontSize={12}
                    />
                  </View>
                  <View style={styles.action}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleOpenActionSheet}>
                      <IconComment
                        name="comment-o"
                        size={20}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                    <ResponsiveText
                      title={comments.length.toString()}
                      fontColor={colors.white}
                      fontSize={12}
                    />
                  </View>
                  <View style={styles.action}>
                    <IconShare
                      name="share-outline"
                      size={20}
                      color={colors.white}
                    />
                    <ResponsiveText
                      title="4,444"
                      fontColor={colors.white}
                      fontSize={12}
                    />
                  </View>
                </View>
                <IconSave name="bookmark-o" size={20} color={colors.white} />
              </View>

              <View style={styles.captionContainer}>
                <ResponsiveText
                  title="virat.kohli : "
                  fontColor={colors.darkGray}
                />
                <ResponsiveText title={comments} fontColor={colors.white} />
              </View>
            </Animated.View>
          );
        }}
      />
      {/* Action Sheet for comments */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.ActionSheetContaienr}
        gestureEnabled>
        <View style={{flexGrow: 1}}>
          <View style={{alignSelf: 'center', paddingVertical: scale(10)}}>
            <ResponsiveText
              title="Comments"
              fontSize={16}
              fontWeight="400"
              fontColor={colors.white}
            />
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            extraData={comments} // Forces re-render when comments update
            ListFooterComponent={<View style={{paddingVertical: 0}} />}
            renderItem={({item}) => (
              <View
                style={{
                  paddingVertical: scale(5),
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.gray,
                }}>
                <ResponsiveText
                  title={item}
                  fontSize={14}
                  fontColor={colors.white}
                />
              </View>
            )}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            style={{
              borderWidth: 1,
              borderColor: colors.gray,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: scale(10),
              borderRadius: scale(10),
              marginTop: scale(20),
            }}>
            <TextInput
              placeholder="Write a comment..."
              placeholderTextColor={colors.gray}
              value={newComment}
              onChangeText={setNewComment}
              style={styles.commentInput}
              keyboardAppearance="default"
            />
            <TouchableOpacity onPress={addComment}>
              <IconComment name="send" size={18} color={colors.ButtonColor} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ActionSheet>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: scale(20),
    padding: scale(10),
    backgroundColor: '#333',
    borderRadius: scale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // For Android shadow
  },
  imgeStyle: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(50),
    resizeMode: 'cover',
  },
  ThreeDotsStyle: {
    color: colors.white,
  },
  headerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  postImageContainer: {
    alignItems: 'center',
  },
  postImageStyle: {
    resizeMode: 'cover',
    height: scale(400),
    width: '100%',
    borderRadius: scale(15),
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(3),
    marginTop: scale(10),
  },
  leftActions: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  captionContainer: {
    flexDirection: 'row',
    marginTop: scale(5),
  },
  ActionSheetContaienr: {
    height: screenHeight * 0.7,
    backgroundColor: '#25282D',
    padding: scale(10),
    borderTopRightRadius: scale(25),
    borderTopLeftRadius: scale(25),
  },
  sendButton: {
    color: colors.ButtonColor,
  },
  commentInput: {color: colors.white},
  commetsItms: {},

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
