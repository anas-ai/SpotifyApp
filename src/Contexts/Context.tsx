import {createContext, useEffect, useReducer, useState} from 'react';

const initialState = {
  artists: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTISTS':
      return {...state, artists: action.payload, error: null};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload, artists: []};
    default:
      return state;
  }
};
export const AuthContext = createContext<any>(null);

const ContextProvider = ({children}: any) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoading, setIsloading, isAuthenticated, state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
