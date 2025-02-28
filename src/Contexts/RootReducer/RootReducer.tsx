import { authReducer } from "../Reducers/authReducer";
import { postReducer } from "../Reducers/postReducer";

export const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  posts: postReducer(state.posts, action),
});
