import AsyncStorage from '@react-native-async-storage/async-storage';

type Videotypes = {
  id?: string;
  category?: string;
  title?: string;
  artwork?: string;
  url?: string;
};

type FavoriteVideosState = {
  favoritesVideo: Videotypes[];
};

type FavoriteVideosAction =
  | {
      payload: any;
      type: 'ADD_TO_FAVORITES_VIDEOS';
    }
  | {
      payload: any;
      type: 'REMOVE_FROM_FAVORITES_VIDEOS';
    }
  | {type: 'CLEAR_FAVORITES_VIDEOS'};
export const VideoInitialState: FavoriteVideosState = {
  favoritesVideo: [],
};

const saveToStorage = async (videos: Videotypes[]) => {
  try {
    await AsyncStorage.setItem('video', JSON.stringify(videos));
  } catch (error) {
    console.error(error, 'Error Saveing Favorites');
  }
};

export const favoritesVideoReducer = (
  state: FavoriteVideosState,
  action: FavoriteVideosAction,
) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES_VIDEOS': {
      const exists = state?.favoritesVideo.some(
        video => video.id === action.payload.id,
      );
      if (exists) return state;

      const updatedFavorites = [...state.favoritesVideo, action.payload];
      saveToStorage(updatedFavorites);
      return {...state, favoritesVideo: updatedFavorites};
    }
    case 'REMOVE_FROM_FAVORITES_VIDEOS': {
      const filteredFavorites = state?.favoritesVideo.filter(
        video => video.id !== action.payload,
      );
      saveToStorage(filteredFavorites);
      return {...state, favoritesVideo: filteredFavorites};
    }
    case 'CLEAR_FAVORITES_VIDEOS': {
      saveToStorage([]);
      return {...state, favoritesVideo: []};
    }
    default:
      return state;
  }
};
