import { authReducer } from "../Reducers/authReducer";
import { postReducer } from "../Reducers/postReducer";
import { favoritesReducer } from "../Reducers/favoritesReducer"; // ✅ Import it
import { favoritesVideoReducer } from "../Reducers/favoritesVideoReducer";

export const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  posts: postReducer(state.posts, action),
  favorites: favoritesReducer(state.favorites, action), // ✅ Add favorites here
  favoritesVideos:favoritesVideoReducer(state.favoritesVideos,action)
});
