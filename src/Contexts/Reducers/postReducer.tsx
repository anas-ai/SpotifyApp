export const postInitialState = {
  posts: [],
  loading: true,
  error: null,
};

export const postReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return { 
        ...state, 
        posts: Array.isArray(action.payload) ? action.payload : [], 
        loading: false 
      };
    case "SET_POSTS":
      return { ...state, posts: action.payload, loading: false, error: null };

    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post: any) => post.id !== action.payload),
      };

    case "TOGGLE_LIKE":
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post.id === action.payload ? { ...post, liked: !post.liked } : post
        ),
      };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post.id === action.payload
            ? { ...post, favorite: !post.favorite }
            : post
        ),
      };

      case 'ADD_COMMENT':
        return {
          ...state,
          posts: state.posts.map(post =>
            post.id === action.payload.postId
              ? { 
                  ...post, 
                  comments: Array.isArray(post.comments) 
                    ? [...post.comments, action.payload.comment] 
                    : [action.payload.comment] 
                }
              : post
          ),
        };

      
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
