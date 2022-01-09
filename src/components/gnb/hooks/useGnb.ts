import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseGnbConnectStoreType } from './useGnbConnectStore';

function useGnb( useConnectStore: UseGnbConnectStoreType ) {

  const [ onUserMenu, setOnUserMenu ] = useState<boolean>(false); 

  const navigate = useNavigate();

  const {
    pageToggle,
    onChangeToggle,
    loading,
    user,
    onSignOutUser,
    onAllReset
  } = useConnectStore;

  const handleClickToggle = useCallback(() => {
    onChangeToggle();
  }, [onChangeToggle]);

  const handleClickUserMenu = useCallback(() => {
    setOnUserMenu(!onUserMenu);
  }, [setOnUserMenu, onUserMenu]);

  const handleClickToggleFalse = useCallback((e: any) => {
    setOnUserMenu(false);
  }, [setOnUserMenu]);

  const handleClickSignOut = useCallback(() => {
    onSignOutUser();
    onAllReset();
    navigate('/home');
  }, [onSignOutUser, onAllReset, navigate]);

  const handleNavigate = useCallback((to: string) => {
    navigate(to);
  }, [navigate]);

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
    handleNavigate,
    handleClickToggle,
    handleClickUserMenu,
    handleClickToggleFalse,
    handleClickSignOut
  }
}

export default useGnb;