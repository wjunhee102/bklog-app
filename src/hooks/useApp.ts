import { useEffect } from 'react';
import useAuth from './useAuth';
import useBase from './useBase';

function useApp() {

  const { 
    baseState: { 
      dark,
      browser
    },
    onInit
  } = useBase();

  const { 
    authState: { waitingCount, user },
    onReissueToken,
    onReSignInUser
  } = useAuth();

  useEffect(() => {
    if(!user) {
      onReSignInUser();
    }
    onInit();
  }, []);

  useEffect(() => {
    console.log("browser", browser);
  }, [browser]);

  return {
    dark
  }
}

export default useApp;