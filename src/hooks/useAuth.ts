import { useSelector, useDispatch } from 'react-redux';
import { AuthState, User, UserAuthInfo, UserInfo } from '../store/modules/auth/utils';
import { RootState } from '../store/modules';
import { useMemo, useCallback } from 'react';
import { signInUser, reSignInUser } from '../store/modules/auth';

function useAuth() {
  const state: AuthState = useSelector((state: RootState) => state.auth);
 
  const getUserInfo: UserInfo| null = state.user.userInfo;

  const dispatch = useDispatch();

  const onSignInUser = useCallback((userAuthInfo: UserAuthInfo) => 
      dispatch(signInUser(userAuthInfo))
    ,[dispatch]);
  
  const onReSignInUser = useCallback(()=> 
      dispatch(reSignInUser())
    ,[dispatch]);

  return {
    stateAuth: state,
    getUserInfo,
    onSignInUser,
    onReSignInUser
  }
}

export default useAuth;