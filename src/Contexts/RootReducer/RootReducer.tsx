import {authReducer} from '../Reducers/authReducer';
import {postReducer} from '../Reducers/postReducer';
import {favoritesReducer} from '../Reducers/favoritesReducer'; 
import {favoritesVideoReducer} from '../Reducers/favoritesVideoReducer';
import { favoritesPodcastReducer } from '../Reducers/favPodcastReducer';
import { favoritesLiveReducer } from '../Reducers/liveFvReducer';

export const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  posts: postReducer(state.posts, action),
  favorites: favoritesReducer(state.favorites, action), 
  favoritesVideos: favoritesVideoReducer(state.favoritesVideos, action),
  favoritesPodcast: favoritesPodcastReducer(state.favoritesPodcast, action), // 🔥 Fix the property name
  favoritesLive:favoritesLiveReducer(state.favoritesLive,action)
});
