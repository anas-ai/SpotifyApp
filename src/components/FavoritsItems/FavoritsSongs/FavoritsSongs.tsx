import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveText from '../../ResponsiveText/ResponsiveText';
import {colors} from '../../../styles/color';
import {scale} from 'react-native-size-matters';
import ThreeDot from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../../Contexts/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import {songsList} from '../../../screens/Home';

type FavoriteItemSongs = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
};

const FavoritsSongs: React.FC = () => {
  const {dispatch, state, removeItemsSongs} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favoriteSongs, setFavoriteSongs] = useState<FavoriteItemSongs[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState<FavoriteItemSongs | null>(
    null,
  );
  const [playing, setPlaying] = useState(false); // Track if song is playing

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

  // Toggle Modal
  const toggleModal = (song: FavoriteItemSongs | null) => {
    setSelectedSong(song);
    setIsVisible(!isVisible);
  };

  // Delete Song from Favorites
  const deleteSong = () => {
    if (!selectedSong) {
      console.log('No song selected for deletion');
      return;
    }

    console.log('Removing song:', selectedSong);
    removeItemsSongs(selectedSong);
    setFavoriteSongs(prevSongs =>
      prevSongs.filter(song => song.id !== selectedSong.id),
    );
    toggleModal(null);
  };

  // Add to Playlist (Replace with your playlist logic)
  const addToPlaylist = () => {
    toggleModal(null);
  };

  const playSong = async () => {
    if (selectedSong) {
      await TrackPlayer.reset(); // Clears any existing track
      await TrackPlayer.add({
        id: selectedSong.id,
        url: selectedSong.url, // Ensure this URL is a valid audio file
        title: selectedSong.title,
        artist: selectedSong.artist,
        artwork: selectedSong.artwork,
      });
      await TrackPlayer.play(); // Start playing
    }
    toggleModal(null);
  };

  const playPauseSong = async () => {
    if (playing) {
      await TrackPlayer.pause(); // Pause the song
      setPlaying(false);
    } else if (selectedSong) {
      await TrackPlayer.reset(); // Clears the previous track
      await TrackPlayer.add({
        id: selectedSong.id,
        url: selectedSong.url,
        title: selectedSong.title,
        artist: selectedSong.artist,
        artwork: selectedSong.artwork,
      });
      await TrackPlayer.play(); // Start playing
      setPlaying(true);
    }
    toggleModal(null);
  };

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
          keyExtractor={item => item.id}
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

              <TouchableOpacity onPress={() => toggleModal(item)}>
                <ThreeDot
                  name="dots-three-vertical"
                  size={scale(20)}
                  color={colors.white}
                  style={{width: scale(30)}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal for Actions */}
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={() => toggleModal(null)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => toggleModal(null)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={playPauseSong}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {playing ? '⏸️ Pause Song' : '▶️ Play Song'}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={addToPlaylist}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>➕ Add to Playlist</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={deleteSong}
              style={styles.modalButtonDelete}>
              <Text style={styles.modalButtonText}>🗑️ Delete Song</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center' as 'center', // ✅ Fix here
    alignItems: 'center' as 'center', // ✅ Fix here
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    padding: scale(20),
    borderRadius: scale(10),
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#333',
    paddingVertical: scale(12),
    borderRadius: scale(5),
    marginVertical: scale(5),
    alignItems: 'center' as 'center', // ✅ Fix here
  },
  modalButtonDelete: {
    backgroundColor: 'red',
    paddingVertical: scale(12),
    borderRadius: scale(5),
    marginVertical: scale(5),
    alignItems: 'center' as 'center', // ✅ Fix here
  },
  modalButtonText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});

export default FavoritsSongs;
