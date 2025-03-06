import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../../hooks/useAuth';
import ResponsiveText from '../../ResponsiveText/ResponsiveText';
import {colors} from '../../../styles/color';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FavoriteItemTypes = {
  id?: string;
  artwork?: string;
  title?: string;
  artist?: string;
};

const FavouriteVideo = () => {
  const [favoritesVideo, setFavoriteVideo] = useState<FavoriteItemTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const {state, dispatch,removeItemsVideo} = useAuth();

  const fetchFavoriteVideos = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('video');
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavoriteVideo(parsedFavorites);
    } catch (error) {
      console.error('Error fetching favorite videos:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchFavoriteVideos();
  }, [state?.favoritesVideos?.favoritesVideo]);

  return (
    <View
      style={{flex: 1, backgroundColor: colors.bgBlack1, padding: scale(16)}}>
      {/* ✅ Header */}
      <View style={{alignSelf: 'center', marginBottom: scale(20)}}>
        <ResponsiveText
          title="Favourite Videos"
          fontColor={colors.white}
          fontWeight="600"
          fontSize={22}
        />
      </View>

      {/* ✅ Loading Indicator */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.ButtonColor}
          style={{marginTop: scale(20)}}
        />
      ) : (
        <FlatList
          data={favoritesVideo}
          ListEmptyComponent={
            <View style={{alignItems: 'center', marginTop: scale(50)}}>
              <Icon name="video-library" size={scale(50)} color={colors.gray} />
              <ResponsiveText
                title="No Videos Added Yet!"
                fontColor={colors.gray}
                fontWeight="600"
                fontSize={16}
              />
            </View>
          }
          ListFooterComponent={<View style={{marginBottom: scale(20)}} />}
          ListHeaderComponent={<View style={{marginTop: scale(10)}} />}
          renderItem={({item}) => (
            <TouchableOpacity
            onPress={()=>removeItemsVideo(item)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1E1E1E',
                padding: scale(12),
                borderRadius: scale(12),
                marginBottom: scale(10),
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 5,
                elevation: 3,
              }}>
              <Image
                source={{uri: item.artwork}}
                style={{
                  height: scale(55),
                  width: scale(55),
                  borderRadius: scale(8),
                  resizeMode: 'cover',
                }}
              />
              <View style={{flex: 1, marginLeft: scale(12)}}>
                <ResponsiveText
                  title={item.title}
                  fontColor={colors.white}
                  fontSize={14}
                  fontWeight="500"
                />
                <ResponsiveText
                  title={item.artist}
                  fontColor={colors.gray}
                  fontSize={12}
                />
              </View>
              <Icon name="more-vert" size={scale(20)} color={colors.white} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FavouriteVideo;
