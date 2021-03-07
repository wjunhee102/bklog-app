import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AuthState, 
  UserAuthInfo, 
  UserInfo,
  signInUser, 
  reSignInUser, 
  signOutUser,
  reissueToken,
  RequiredUserInfo,
  signUpUser
} from '../store/modules/auth/utils';
import { RootState } from '../store/modules';
import authApiUtils from '../store/modules/auth/utils/apiUtils';

function useAuth() {
  const state: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const onSignUpUser = useCallback((requiredUserInfo: RequiredUserInfo) => 
    dispatch(signUpUser(requiredUserInfo)), [dispatch]);

  const onSignInUser = useCallback((userAuthInfo: UserAuthInfo) => 
      dispatch(signInUser(userAuthInfo))
    ,[dispatch]);
  
  const onReSignInUser = useCallback(()=> dispatch(reSignInUser()),[dispatch]);

  const onSignOutUser = useCallback(()=> dispatch(signOutUser()),[dispatch]);

  const onReissueToken = useCallback(()=> dispatch(reissueToken()),[dispatch]);

  const onCheckToken = async () => {
    const response = await authApiUtils.authFetchGet('check-token');
    console.log(response);
    const data = response.data? response.data : null;
    const success = response.data? response.data.success : false;

     if(!success) {

       if(state.user) {
        onReissueToken();
       }

     } else {

       if(!state.user) {

         onReSignInUser();
       
        } else {
         
          if(state.user.userId !== data.userId) {
            onSignOutUser();
          }

       }
     }
  }

  return {
    authState: state,
    onSignUpUser,
    onSignInUser,
    onReSignInUser,
    onSignOutUser,
    onReissueToken,
    onCheckToken
  }
}

export default useAuth;