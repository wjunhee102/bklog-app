import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseGnbConnectStoreType } from './useGnbConnectStore';

function useGnb( useConnectStore: UseGnbConnectStoreType ) {

  const [ onUserMenu, setOnUserMenu ] = useState<boolean>(false); 

  const navigate = useNavigate();

  const {
    loading,
    user,
    onSignOutUser,
    onAllReset
  } = useConnectStore;

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

  return {
    onUserMenu,
    user,
    loading,
    handleNavigate,
    handleClickUserMenu,
    handleClickToggleFalse,
    handleClickSignOut
  }
}

export default useGnb;