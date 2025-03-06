import {createContext, useEffect, useReducer, useState} from 'react';
import {rootReducer} from './RootReducer/RootReducer';
import {postInitialState} from './Reducers/postReducer';
import {authInitialState} from './Reducers/authReducer';
import {favoritesInitialState} from './Reducers/favoritesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VideoInitialState} from './Reducers/favoritesVideoReducer';

type AuthContextType = {
  isLoading: boolean;
  setIsloading: (loading: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
  favoriteVideosCount?: number;
  favoriteSongsCount?: number;
  removeItemsVideo: (item?: FavoriteItemVideo) => Promise<void>; // ✅ Added this line
  removeItemsSongs: (item?: FavoriteItemSongs) => Promise<void>;
};

const initialState = {
  auth: authInitialState,
  posts: postInitialState,
  favorites: favoritesInitialState,
  favoritesVideos: VideoInitialState,
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  setIsloading: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  state: initialState,
  dispatch: () => null,
  removeItemsVideo: async () => {},
  removeItemsSongs: async () => {},
});

type FavoriteItemVideo = {
  id?: string;
  artwork?: string;
  title?: string;
  artist?: string;
};

type FavoriteItemSongs = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
};

const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [refreshApp, setRefreshApp] = useState(false);
  const [favoriteVideosCount, setFavoriteVideosCount] = useState(0);
  const [favoriteSongsCount, setFavoriteSongsCount] = useState(0);
  const [favoritesVideo, setFavoriteVideo] = useState<FavoriteItemVideo[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<FavoriteItemSongs[]>([]);

  const fetchCounts = async () => {
    try {
      const songs = await AsyncStorage.getItem('favoriteSongs');
      const videos = await AsyncStorage.getItem('video');

      const songsCount = songs ? JSON.parse(songs).length : 0;
      const videosCount = videos ? JSON.parse(videos).length : 0;

      setFavoriteSongsCount(songsCount);
      setFavoriteVideosCount(videosCount);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  

  const fetchFavoriteVideos = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('video');
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavoriteVideosCount(parsedFavorites.length);
    } catch (error) {}
  };

  const FetchFavoritesSongs = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteSongs');
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavoriteSongsCount(parsedFavorites.length);
    } catch (error) {
      console.log('Error fetching favorite songs:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favoriteSongs');
      if (savedFavorites) {
        dispatch({type: 'LOAD_FAVORITES', payload: JSON.parse(savedFavorites)});
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeItemsVideo = async (item?: FavoriteItemVideo) => {
    if (!item || !item.id) {
      console.error('Error: item or item.id is undefined in removeItems');
      return;
    }

    try {
      dispatch({type: 'REMOVE_FROM_FAVORITES_VIDEOS', payload: item.id});

      const storedFavorites = await AsyncStorage.getItem('video');
      let updatedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      updatedFavorites = updatedFavorites.filter(
        (video: FavoriteItemVideo) => video.id !== item.id,
      );

      await AsyncStorage.setItem('video', JSON.stringify(updatedFavorites));
      setFavoriteVideo(updatedFavorites);
      setFavoriteVideosCount(updatedFavorites.length);
      setFavoriteVideo(updatedFavorites);
      await fetchCounts();
    } catch (error) {
      console.error('Error during removeItemVideo', error);
    }
  };

  const removeItemsSongs = async (item?: FavoriteItemSongs) => {
    if (!item || !item.id) {
      console.error(
        'Error: item or item.id is undefined in removeItemsSongs',
        item,
      );
      return; // ✅ Prevent function execution if item is invalid
    }
    try {
      // Remove from Context State
      dispatch({type: 'REMOVE_FROM_FAVORITES', payload: item?.id});

      // Remove from AsyncStorage
      const storedFavorites = await AsyncStorage.getItem('favoriteSongs');
      let updatedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      updatedFavorites = updatedFavorites.filter(
        ({song}: any) => song.id !== item?.id,
      );

      await AsyncStorage.setItem(
        'favoriteSongs',
        JSON.stringify(updatedFavorites),
      );

      setFavoriteSongsCount(updatedFavorites.length);
      setFavoriteSongs(updatedFavorites);

      // Update local state to re-render UI
      setFavoriteSongs(updatedFavorites);
      await fetchCounts();
    } catch (error) {
      console.log('Error removing song:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
    fetchFavoriteVideos();
    FetchFavoritesSongs();
    fetchCounts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsloading,
        isAuthenticated,
        setIsAuthenticated,
        state,
        dispatch,
        favoriteVideosCount,
        favoriteSongsCount,
        removeItemsVideo,
        removeItemsSongs,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
