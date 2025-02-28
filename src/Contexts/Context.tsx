import { createContext, useEffect, useReducer, useState } from 'react';
import { rootReducer } from './RootReducer/RootReducer';
import { postInitialState } from './Reducers/postReducer';
import { authInitialState } from './Reducers/authReducer';



type AuthContextType = {
  isLoading: boolean;
  setIsloading: (loading: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
};

const initialState = {
  auth: authInitialState,
  posts: postInitialState,
};

export const AuthContext = createContext<AuthContextType>({ 
  isLoading: true, 
  setIsloading: () => {}, 
  isAuthenticated: false, 
  setIsAuthenticated: () => {}, 
  state: initialState, 
  dispatch: () => null 
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  
  

  return (
    <AuthContext.Provider
      value={{ isLoading, setIsloading, isAuthenticated, setIsAuthenticated, state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
