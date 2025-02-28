export const authInitialState = {
  isAuthenticated: false,
  isLoading: true,
};

export const authReducer = (state: any, action: { type: any; payload?: any }) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
