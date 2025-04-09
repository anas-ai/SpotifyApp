import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../../hooks/useAuth';
import ResponsiveText from '../../ResponsiveText/ResponsiveText';
import {colors} from '../../../styles/color';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalComponent from '../../ModelComponet/ModalComponet';
import { ScreenName } from '../../../constants/ScreensNames';

type FavoriteItemTypes = {
  id?: string;
  artwork?: string;
  title?: string;
  artist?: string;
};

const FavouriteVideo = ({navigation}:any) => {
  const [favoritesVideo, setFavoriteVideo] = useState<FavoriteItemTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FavoriteItemTypes | null>(null);

  const {state, dispatch} = useAuth();

  const fetchFavoriteVideos = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('video');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteVideo(parsedFavorites);
    } catch (error) {
      console.error('Error fetching favorite videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async (item: FavoriteItemTypes) => {
    try {
      const updatedFavorites = favoritesVideo.filter(fav => fav.id !== item.id);
      setFavoriteVideo(updatedFavorites);
      await AsyncStorage.setItem('video', JSON.stringify(updatedFavorites));
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting favorite video:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteVideos();
  }, [state?.favoritesVideos?.favoritesVideo]);

  const renderItem = ({item}: {item: FavoriteItemTypes}) => (
    <TouchableOpacity
    onPress={()=>navigation.navigate(ScreenName.VIDEO_FAV_DETAILS_SCREEN,{
      selectedItem:item,
      favoritesVideo:favoritesVideo
    })}
      activeOpacity={0.8}
      style={styles.itemContainer}>
      <Image
        source={{uri: item.artwork}}
        style={styles.artwork}
      />
      <View style={styles.itemText}>
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
      <TouchableOpacity onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}>
        <Icon name="more-vert" size={scale(20)} color={colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ResponsiveText
          title="Favourite Videos"
          fontColor={colors.white}
          fontWeight="600"
          fontSize={22}
        />
      </View>

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
            <View style={styles.emptyContainer}>
              <Icon name="video-library" size={scale(50)} color={colors.gray} />
              <ResponsiveText
                title="No Videos Added Yet!"
                fontColor={colors.gray}
                fontWeight="600"
                fontSize={16}
              />
            </View>
          }
          ListHeaderComponent={<View style={{marginTop: scale(10)}} />}
          ListFooterComponent={<View style={{marginBottom: scale(20)}} />}
          renderItem={renderItem}
        />
      )}

      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[
          {
            label: 'Delete Video',
            onPress: () => {
              if (selectedItem) {
                deleteFavorite(selectedItem);
              }
            },
            type: 'delete',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBlack1,
    padding: scale(16),
  },
  header: {
    alignSelf: 'center',
    marginBottom: scale(20),
  },
  itemContainer: {
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
  },
  artwork: {
    height: scale(55),
    width: scale(55),
    borderRadius: scale(8),
    resizeMode: 'cover',
  },
  itemText: {
    flex: 1,
    marginLeft: scale(12),
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: scale(50),
  },
});

export default FavouriteVideo;
