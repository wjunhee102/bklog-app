import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AuthState, 
  UserAuthInfo, 
  UserInfo,
  signInUser, 
  reSignInUser, 
  signOutUser,
  reissueToken
} from '../store/modules/auth/utils';
import { RootState } from '../store/modules';
import authApiUtils from '../store/modules/auth/utils/apiUtils';

function useAuth() {
  const state: AuthState = useSelector((state: RootState) => state.auth);
 
  const getUserInfo: UserInfo| null = state.user.userInfo;

  const getError = state.user.error;

  const dispatch = useDispatch();

  const onSignInUser = useCallback((userAuthInfo: UserAuthInfo) => 
      dispatch(signInUser(userAuthInfo))
    ,[dispatch]);
  
  const onReSignInUser = useCallback(()=> dispatch(reSignInUser()),[dispatch]);

  const onSignOutUser = useCallback(()=> dispatch(signOutUser()),[dispatch]);

  const onReissueToke = useCallback(()=> dispatch(reissueToken()),[dispatch]);

  const onCheckToken = async () => {
    const { data } = await authApiUtils.authFetchGet('check-token');
     if(!data.success) {

       if(getUserInfo) {
        onReissueToke();
       }

     } else {

       if(!getUserInfo) {

         onReSignInUser();
       
        } else {
         
          if(getUserInfo.userId !== data.userId) {
            onSignOutUser();
          }

       }
     }
  }

  return {
    stateAuth: state,
    getUserInfo,
    getError,
    onSignInUser,
    onReSignInUser,
    onSignOutUser,
    onReissueToke,
    onCheckToken
  }
}

export default useAuth;