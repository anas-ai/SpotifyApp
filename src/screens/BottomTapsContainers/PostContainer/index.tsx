// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Alert,
// } from 'react-native';
// import {useContext, useEffect, useState} from 'react';
// import {useToast} from 'react-native-toast-notifications';
// import {AuthContext} from '../../../Contexts/Context';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import {colors} from '../../../styles/color';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {scale} from 'react-native-size-matters';
// import {globalStyles} from '../../../styles/globalStyles';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const PostScreen = () => {
//   const {state, dispatch} = useContext(AuthContext);
//   const [image, setImage] = useState<string | null>(null);
//   const [caption, setCaption] = useState<string>('');
//   const [Comment, setComment] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     const savePosts = async () => {
//       try {
//         await AsyncStorage.setItem('posts', JSON.stringify(state.posts.posts));
//       } catch (error) {
//         console.error('Error saving posts:', error);
//       }
//     };

//     if (state.posts.posts.length > 0) {
//       savePosts();
//     }
//   }, [state.posts]);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const storedPosts = await AsyncStorage.getItem('posts');
//         const parsedPosts = storedPosts ? JSON.parse(storedPosts) : [];

//         if (!Array.isArray(parsedPosts)) {
//           console.error('❌ Stored posts is not an array:', parsedPosts);
//           return;
//         }

//         dispatch({type: 'LOAD_POSTS', payload: parsedPosts});
//       } catch (error) {
//         console.error('Error loading posts:', error);
//         dispatch({type: 'SET_ERROR', payload: 'Failed to load posts'});
//       }
//     };

//     loadPosts();
//   }, []);

//   const postsArray = Array.isArray(state.posts.posts) ? state.posts.posts : [];

//   const requestPermissions = async () => {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       ]);

//       if (
//         granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
//           PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         return true;
//       } else {
//         Alert.alert(
//           'Permissions Denied',
//           'You need to allow camera and storage access.',
//         );
//         return false;
//       }
//     } catch (error) {
//       console.error('Permission error:', error);
//       return false;
//     }
//   };

//   const PickFromGallery = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) return;

//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response.assets && response.assets[0].uri) {
//         cropImage(response.assets[0].uri);
//       }
//     });
//   };

//   const TakeImageFromCamera = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) return;

//     launchCamera({mediaType: 'photo'}, response => {
//       if (response.assets && response.assets[0].uri) {
//         cropImage(response.assets[0].uri);
//       }
//     });
//   };

//   const cropImage = async (uri: string) => {
//     setLoading(true);
//     try {
//       const croppedImage = await ImageCropPicker.openCropper({
//         path: uri,
//         width: 300,
//         height: 300,
//         cropping: true,
//         mediaType: 'photo',
//       });
//       setImage(croppedImage.path);
//     } catch (error) {
//       toast.show('Error cropping image', {type: 'danger'});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addPost = async () => {
//     if (!image || caption.trim() === '') {
//       toast.show('Image and caption required!', {type: 'warning'});
//       return;
//     }

//     const newPost = {
//       id: Date.now().toString(),
//       image,
//       caption,
//       liked: false,
//       favorite: false,
//       comments: [],
//     };

//     const updatedPosts = [newPost, ...state.posts.posts];
//     dispatch({type: 'ADD_POST', payload: newPost});

//     try {
//       await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
//     } catch (error) {
//       console.error('Error saving posts:', error);
//     }

//     setImage(null);
//     setCaption('');
//     toast.show('Post added!', {type: 'success'});
//   };

//   const addComment = async (postId: any) => {
//     if (!Comment.trim()) {
//       toast.show('Comment cannot be empty!', {type: 'warning'});
//       return;
//     }

//     const newComment = {
//       id: Date.now().toString(),
//       text: Comment,
//     };

//     dispatch({type: 'ADD_COMMENT', payload: {postId, comment: newComment}});

//     // Save updated posts to AsyncStorage
//     try {
//       await AsyncStorage.setItem('posts', JSON.stringify(state.posts.posts));
//     } catch (error) {
//       console.log('Error saving posts:', error);
//     }

//     setComment('');
//     toast.show('Comment added', {type: 'success'});
//   };

//   const addToFavorite = async (postId, isFavorite) => {
//     dispatch({type: 'TOGGLE_FAVORITE', payload: postId});
//     try {
//       const updatedPosts = state?.posts?.posts.map(post =>
//         post.id === postId ? {...post, favorite: !post.favorite} : post,
//       );
//       await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
//     } catch (error) {
//       console.error(error, 'Error updating storage after toggling favorite');
//     }
//     toast.show(isFavorite ? 'Removed from favorites' : 'Added to favorites', {
//       type: isFavorite ? 'warning' : 'success', // ❗ Change toast type dynamically
//     });
//   };

//   const deletePost = async postId => {
//     dispatch({type: 'DELETE_POST', payload: postId});
//     try {
//       const updatedPosts = state?.posts?.posts.filter(
//         post => post.id !== postId,
//       );
//       await AsyncStorage.setItem('post', JSON.stringify(updatedPosts));
//     } catch (error) {
//       console.error('Error updateing storage after deleting post :', error);
//     }
//     toast.show('Post deleted successfully!', {type: 'danger'});
//   };

//   return (
//     <View style={globalStyles.globalContainer}>
//       {loading && <ActivityIndicator size="large" color={colors.ButtonColor} />}

//       {image && (
//         <Image
//           source={{uri: image}}
//           style={{
//             width: '100%',
//             height: 200,
//             borderRadius: 15,
//             marginBottom: 10,
//           }}
//         />
//       )}

//       <TextInput
//         placeholder="Enter caption..."
//         value={caption}
//         onChangeText={setCaption}
//         style={{
//           backgroundColor: colors.gray,
//           color: colors.white,
//           padding: 10,
//           borderRadius: 10,
//           marginBottom: 10,
//         }}
//         placeholderTextColor={colors.white}
//       />

//       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <TouchableOpacity onPress={PickFromGallery} style={{padding: 10}}>
//           <Icon name="image" size={24} color={colors.primary} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={TakeImageFromCamera} style={{padding: 10}}>
//           <Icon name="camera" size={24} color={colors.primary} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={addPost} style={{padding: 10}}>
//           <Icon name="send" size={24} color={colors.green} />
//         </TouchableOpacity>
//       </View>
//       {state.posts.posts.length === 0 ? (
//         <Text style={{textAlign: 'center', color: colors.white, marginTop: 20}}>
//           No posts available
//         </Text>
//       ) : (
//         <FlatList
//           data={postsArray}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <View
//               style={{
//                 backgroundColor: colors.greyColor,
//                 padding: scale(10),
//                 marginTop: scale(20),
//                 borderRadius: scale(10),
//               }}>
//               <Image
//                 source={{uri: item.image}}
//                 style={{
//                   width: '100%',
//                   height: 200,
//                   borderRadius: 10,
//                   resizeMode: 'contain',
//                 }}
//               />
//               <Text
//                 style={{
//                   color: colors.white,
//                   fontSize: 16,
//                   fontWeight: 'bold',
//                   marginTop: 5,
//                 }}>
//                 {item.caption}
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   marginTop: 5,
//                 }}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     dispatch({type: 'TOGGLE_LIKE', payload: item.id})
//                   }>
//                   <Icon
//                     name={item?.liked ? 'heart' : 'heart-o'}
//                     size={24}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => addToFavorite(item.id, item.favorite)}>
//                   <Icon
//                     name={item.favorite ? 'star' : 'star-o'}
//                     size={24}
//                     color={colors.secondary}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => deletePost(item.id)}>
//                   <Icon name="trash" size={24} color={colors.red} />
//                 </TouchableOpacity>
//               </View>

//               <FlatList
//                 data={Array.isArray(item.comments) ? item?.comments : []}
//                 keyExtractor={(comment, index) => index.toString()}
//                 renderItem={({item}) => (
//                   <Text style={{color: colors.white, marginBottom: 5}}>
//                     🔹 {item.text}
//                   </Text>
//                 )}
//               />
//               <View>
//                 <TextInput
//                   placeholder="Add a comment..."
//                   value={Comment}
//                   onChangeText={setComment}
//                   placeholderTextColor={colors.white}
//                   style={{
//                     flex: 1,
//                     backgroundColor: colors.gray,
//                     color: colors.white,
//                     padding: 5,
//                     borderRadius: 5,
//                   }}
//                 />
//                 <TouchableOpacity
//                   onPress={() => item?.id && addComment(item.id)}>
//                   <Icon name="send" size={24} color={colors.ButtonColor} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default PostScreen;

import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const PostScreen = ({navigation}: any) => {
  const [likeCount, setLikeCount] = useState(1200);

  const [like, setLike] = useState(false);

  const formatLikeCount = (num:number)=>{
    if(num > 1000){
      return (num/1000).toFixed(1).replace('.0','')+'k'
    }
    return num.toString()
  }

  const handleLike = () => {
    if (like) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLike(!like);
  };
  
  return (
    <View style={globalStyles.globalContainer}>
      <CustomBackButton
        navigation={navigation}
        title="Post"
        paddingLeft={scale(20)}
      />
      <FlatList
        data={[1, 1, 1, 1, 1, 1]}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 60 }} />} // Adds space at the end

        renderItem={({item,index}) => (
          <View>
            <View style={styles.headerStyles}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scale(10),
                }}>
                <Image source={PNG_IMG.VIRAT_PNG} style={styles.imgeStyle} />
                <ResponsiveText
                  title="virat.kohali"
                  fontColor={colors.gray}
                  fontWeight="500"
                  fontSize={14}
                />
              </View>
              <TreeDots
                name="dots-vertical"
                size={24}
                style={styles.ThreeDotsStyle}
              />
            </View>
            <View style={styles.postImageContainer}>
              <Image source={PNG_IMG.VIRAT_PNG} style={styles.postImageStyle} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                  <IconHeart
                    name={like ? 'heart' : 'heart-outline'}
                    size={24}
                    color={colors.white}
                    onPress={handleLike}
                  />
                  <ResponsiveText
                    title={formatLikeCount(likeCount)}
                    fontColor={colors.white}
                    fontSize={12}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                  <IconComment
                    name="comment-o"
                    size={22}
                    color={colors.white}
                  />
                  <ResponsiveText
                    title="6,738"
                    fontColor={colors.white}
                    fontSize={12}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
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
              <View>
                <IconSave name="bookmark-o" size={20} color={colors.white} />
              </View>
            </View>
            <View style={{flexDirection:'row'}}>

            <ResponsiveText title='virat.kohli : ' fontColor={colors.darkGray}/>
            <ResponsiveText title='we are champions' fontColor={colors.white}/>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  imgeStyle: {
    height: scale(22),
    width: scale(22),
    borderRadius: scale(50),
    resizeMode: 'cover',
  },
  ThreeDotsStyle: {
    color: colors.white,
  },
  headerStyles: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:scale(20)
  },
  postImageContainer: {alignItems: 'center'},
  postImageStyle: {
    resizeMode: 'contain',
    height: scale(600),
    width: '100%',
    borderRadius: scale(20),
  },
});
