import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AuthState, 
  UserAuthInfo, 
  signInUser, 
  reSignInUser, 
  signOutUser,
  reissueToken,
  RequiredUserInfo,
  signUpUser,
  checkEmailUsed,
  checkPenNameUsed
} from '../store/modules/auth/utils';
import { RootState } from '../store/modules';
import authApiUtils from '../store/modules/auth/utils/apiUtils';

function useAuth() {
  const state: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const onCheckEmailUsed = useCallback((email: string) => {
    dispatch(checkEmailUsed(email));
  }, [dispatch]);

  const onCheckPenNameUsed = useCallback((penName: string) => {
    dispatch(checkPenNameUsed(penName));
  }, [dispatch]);

  const onSignUpUser = useCallback((requiredUserInfo: RequiredUserInfo) => {
    dispatch(signUpUser(requiredUserInfo))
  }, [dispatch]);

  const onSignInUser = useCallback((userAuthInfo: UserAuthInfo) => {
    dispatch(signInUser(userAuthInfo))
  },[dispatch]);
  
  const onReSignInUser = useCallback(()=> {
    dispatch(reSignInUser()) 
  },[dispatch]);

  const onSignOutUser = useCallback(()=> {
    dispatch(signOutUser())
  },[dispatch]);

  const onReissueToken = useCallback(()=> {
    dispatch(reissueToken())
  },[dispatch]);

  const onCheckToken = async () => {
    const response = await authApiUtils.authFetchGet('check-token');

    const success = response.data === "success"? true : false;

     if(!success) {

       if(state.user) {
        onReissueToken();
       } else {
         onSignOutUser();
       }

     } else {
       if(!state.user) {
          onReSignInUser();
        } 
     }
  }

  return {
    authState: state,
    onCheckEmailUsed,
    onCheckPenNameUsed,
    onSignUpUser,
    onSignInUser,
    onReSignInUser,
    onSignOutUser,
    onReissueToken,
    onCheckToken
  }
}

export default useAuth;