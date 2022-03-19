import { useEffect } from 'react';
import useAuth from './useAuth';
import useBase from './useBase';

function useApp() {

  const { 
    baseState: { 
      dark 
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

  return {
    dark
  }
}

export default useApp;