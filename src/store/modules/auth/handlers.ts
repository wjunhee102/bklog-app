import { initialState } from ".";
import { updateObject } from "../../utils";
import { 
  AuthState, 
  AuthStateProps, 
  checkEmailUsedError, 
  checkEmailUsedSuccess, 
  checkPenNameUsedError, 
  checkPenNameUsedSuccess, 
  CHECK_EMAIL_USED_ERROR, 
  CHECK_EMAIL_USED_SUCCESS, 
  CHECK_PENNAME_USED_ERROR, 
  CHECK_PENNAME_USED_SUCCESS, 
  initFetchState, 
  reissueTokenError, 
  REISSUETOKEN_ERROR, 
  resetError, 
  RESET_ERROR, 
  RESIGNINUSER, 
  reSignInUser, 
  reSignInUserSuccess, 
  RESIGNINUSER_ERROR, 
  RESIGNINUSER_SUCCESS, 
  SIGNINUSER, 
  signInUser, 
  signInUserError, 
  signInUserSuccess, 
  SIGNINUSER_ERROR, 
  SIGNINUSER_SUCCESS, 
  SIGNOUTUSER, 
  signOutUser, 
  signOutUserError, 
  signOutUserSuccess, 
  SIGNOUTUSER_ERROR, 
  SIGNOUTUSER_SUCCESS, 
  SignUpState, 
  SignUpStateProps, 
  SIGNUPUSER, 
  signUpUserError, 
  signUpUserSuccess, 
  SIGNUPUSER_ERROR, 
  SIGNUPUSER_SUCCESS
} from "./utils";

function checkEmailUsedSuccessHandler(
  state: AuthState,
  { payload }: ReturnType<typeof checkEmailUsedSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    signUpState: updateObject<SignUpState, SignUpStateProps>(state.signUpState, {
      emailUsed: payload === "y"? true : false
    })
  });
}

function checkEmailUsedErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof checkEmailUsedError>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    error: payload,
    errorToggle: false
  });
}

function checkPenNameUsedSuccessHandler(
  state: AuthState,
  { payload }: ReturnType<typeof checkPenNameUsedSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    signUpState: updateObject<SignUpState, SignUpStateProps>(state.signUpState, {
      penNameUsed: payload === "y"? true : false
    })
  });
}

function checkPenNameUsedErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof checkPenNameUsedError>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    error: payload,
    errorToggle: false
  });
}

function signUpUserHandler(
  state: AuthState, 
  action: ReturnType<typeof signInUser>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, initFetchState, {
    signUpSuccess: null
  });
}

function signUpUserSuccessHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signUpUserSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    signUpSuccess: true
  });
}

function signUpUserErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signUpUserError>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    error: payload,
    errorToggle: true
  });
}

function signInUserHandler(
  state: AuthState,
  action: ReturnType<typeof signInUser>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, initFetchState, {
    user: null
  });
}

function signInUserSuccessHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signInUserSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    user: payload,
    waitingCount: 0
  });
}

function signInUserErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signInUserError>
) {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    error: payload,
    errorToggle: true
  });
}

function reSignInUserHandler(
  state: AuthState,
  action: ReturnType<typeof reSignInUser>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, initFetchState, {
    user: null
  })
}

function reSignInUserSuccessHandler(
  state: AuthState,
  { payload }: ReturnType<typeof reSignInUserSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    user: payload
  });
}

function reSignInUserErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signInUserError>
) {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: false,
    error: payload
  });
}

function signOutUserHandler(
  state: AuthState,
  action: ReturnType<typeof signOutUser>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, {
    loading: true,
    error: null,
    user: null
  });
}

function signOutUserSuccessHandler(
  state: AuthState,
  action: ReturnType<typeof signOutUserSuccess>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, initialState);
}

function signOutUserErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof signOutUserError>
): AuthState {
  return updateObject<AuthState, AuthStateProps>(state, initialState, {
    loading: false,
    error: payload,
    errorToggle: true
  });
}

function reissueTokenErrorHandler(
  state: AuthState,
  { payload }: ReturnType<typeof reissueTokenError>
) {
  return updateObject<AuthState, AuthStateProps>(state, initialState, {
    loading: true,
    waitingCount: ++state.waitingCount,
    error: payload,
    errorToggle: true
  });
}

function resetErrorHandler(
  state: AuthState,
  action: ReturnType<typeof resetError>
) {
  return updateObject<AuthState, AuthStateProps>(state, {
    error: null,
    waitingCount: 0,
    errorToggle: false
  });
}

export default {
  [CHECK_EMAIL_USED_SUCCESS]   : checkEmailUsedSuccessHandler,
  [CHECK_EMAIL_USED_ERROR]     : checkEmailUsedErrorHandler,
  [CHECK_PENNAME_USED_SUCCESS] : checkPenNameUsedSuccessHandler,
  [CHECK_PENNAME_USED_ERROR]   : checkPenNameUsedErrorHandler,
  [SIGNUPUSER]                 : signUpUserHandler,
  [SIGNUPUSER_SUCCESS]         : signUpUserSuccessHandler,
  [SIGNUPUSER_ERROR]           : signUpUserErrorHandler,
  [SIGNINUSER]                 : signInUserHandler,
  [SIGNINUSER_SUCCESS]         : signInUserSuccessHandler,
  [SIGNINUSER_ERROR]           : signInUserErrorHandler,
  [RESIGNINUSER]               : reSignInUserHandler,
  [RESIGNINUSER_SUCCESS]       : reSignInUserSuccessHandler,
  [RESIGNINUSER_ERROR]         : reSignInUserErrorHandler,
  [SIGNOUTUSER]                : signOutUserHandler,
  [SIGNOUTUSER_SUCCESS]        : signOutUserSuccessHandler,
  [SIGNOUTUSER_ERROR]          : signOutUserErrorHandler,
  [REISSUETOKEN_ERROR]         : reissueTokenErrorHandler,
  [RESET_ERROR]                : resetErrorHandler
}