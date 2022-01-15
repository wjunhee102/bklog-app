import { useEffect } from 'react';
import useAuth from './useAuth';
import useBase from './useBase';

function useApp() {

  const { baseState: { dark } } = useBase();

  const { 
    authState: { waitingCount, user },
    onReissueToken,
    onReSignInUser
  } = useAuth();

  useEffect(() => {
    if(!user) {
      onReSignInUser();
    }
  }, []);

  return {
    dark
  }
}

export default useApp;