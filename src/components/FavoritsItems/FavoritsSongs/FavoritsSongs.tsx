import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveText from '../../ResponsiveText/ResponsiveText';
import {colors} from '../../../styles/color';
import {scale} from 'react-native-size-matters';
import ThreeDot from 'react-native-vector-icons/Entypo';
import SongsPlayer from '../../SongsPlayerComponents/SongsPlayer';
import {AuthContext} from '../../../Contexts/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FavoriteItemSongs = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
};

const FavoritsSongs: React.FC = () => {
  const {dispatch, state,removeItemsSongs} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favoriteSongs, setFavoriteSongs] = useState<FavoriteItemSongs[]>([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteSongs');
        const parsedFavorites = storedFavorites
          ? JSON.parse(storedFavorites)
          : [];
        setFavoriteSongs(parsedFavorites);
      } catch (error) {
        console.log('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteSongs();
  }, [state.favorites]); // ✅ Re-fetch when favorites change


  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgBlack1,
        paddingHorizontal: scale(12),
      }}>
      <View style={{alignSelf: 'center'}}>
        <ResponsiveText
          title="Liked Songs"
          fontColor={colors.white}
          fontWeight="700"
          fontSize={20}
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
          data={favoriteSongs}
          ListEmptyComponent={
            <View style={{alignItems: 'center', marginTop: scale(50)}}>
              <Icon name="library-music" size={scale(50)} color={colors.gray} />
              <ResponsiveText
                title="No Songs Added Yet!"
                fontColor={colors.gray}
                fontWeight="600"
                fontSize={16}
              />
            </View>
          }
          ListFooterComponent={<View style={{height: scale(80)}} />}
          ListHeaderComponent={<View style={{marginTop: scale(20)}} />}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: scale(12),
                marginTop: scale(10),
                backgroundColor: '#1E1E1E',
                borderRadius: scale(12),
                marginBottom: scale(10),
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 5,
                elevation: 3,
                padding: scale(10),
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(16),
                  }}>
                  <Image
                    source={{uri: item.artwork}}
                    style={{
                      height: scale(50),
                      width: scale(50),
                      resizeMode: 'contain',
                      marginLeft: scale(15),
                      borderRadius: scale(10),
                    }}
                  />
                  <View>
                    <ResponsiveText
                      title={item.title}
                      fontColor={colors.white}
                      fontSize={14}
                    />
                    <ResponsiveText
                      title={item.artist}
                      fontColor={colors.gray}
                      fontSize={12}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeItemsSongs(item)}>
                <ThreeDot
                  name="dots-three-vertical"
                  size={scale(20)}
                  color="red"
                  style={{width: scale(30)}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FavoritsSongs;
