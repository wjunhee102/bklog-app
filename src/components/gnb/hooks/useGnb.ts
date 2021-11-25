import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UseGnbConnectStoreType } from './useGnbConnectStore';

function useGnb( useConnectStore: UseGnbConnectStoreType ) {

  const [ onUserMenu, setOnUserMenu ] = useState<boolean>(false); 

  const history = useHistory();

  const {
    pageToggle,
    onChangeToggle,
    loading,
    user,
    onSignOutUser
  } = useConnectStore;

  const handleClickToggle = () => {
    onChangeToggle();
  }

  const handleClickUserMenu = () => {
    setOnUserMenu(!onUserMenu);
  }

  const handleClickToggleFalse = (e: any) => {
    setOnUserMenu(false);
  }

  const handleClickSignOut = () => {
    onSignOutUser();
  }

  useEffect(() => {
    console.log(user, loading, "gnb");
  }, [user, loading]);

  // useEffect(() => {
  //   console.log(history);
  //   const unblock = history.block('정말 떠나실건가요?');
    
  //   return () => {
  //     unblock();
  //   }
  // }, [history]);

  return {
    onUserMenu,
    user,
    loading,
    pageToggle,
    history,
    handleClickToggle,
    handleClickUserMenu,
    handleClickToggleFalse,
    handleClickSignOut
  }
}

export default useGnb;