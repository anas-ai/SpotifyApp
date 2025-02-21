import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<any>(null);
const ContextProvider = ({children}: any) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  
  
  

  return (
    <AuthContext.Provider value={{isLoading, setIsloading, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
