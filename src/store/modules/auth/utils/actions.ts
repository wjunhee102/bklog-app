import { 
  RequiredUserInfo, 
  SIGNUPUSER, 
  UserAuthInfo, 
  SIGNINUSER, 
  User, 
  SIGNINUSER_SUCCESS, 
  SIGNINUSER_ERROR, 
  SIGNOUTUSER,
  SIGNOUTUSER_SUCCESS,
  SIGNOUTUSER_ERROR,
  RESIGNINUSER,
  RESIGNINUSER_SUCCESS,
  RESIGNINUSER_ERROR,
  SIGNUPUSER_SUCCESS,
  SIGNUPUSER_ERROR,
  REISSUETOKEN_ERROR,
  REISSUETOKEN,
  RESET_AUTH,
  CHECK_EMAIL_USED,
  CHECK_EMAIL_USED_SUCCESS,
  CHECK_EMAIL_USED_ERROR,
  CHECK_PENNAME_USED,
  CHECK_PENNAME_USED_ERROR,
  CHECK_PENNAME_USED_SUCCESS,
  UserInfo,
  RESET_ERROR,
  ClearAuthStateType,
  CLEAR_AUTH_STATE
 } from ".";
import { ApiErrorType } from "../../../../utils/api-utils";

function clearAuthState(...key: ClearAuthStateType[]) {
  return {
    type: CLEAR_AUTH_STATE,
    payload: key
  }
}

function checkEmailUsed(email: string) {
  return {
    type: CHECK_EMAIL_USED,
    payload: email
  }
} 

function checkEmailUsedSuccess(used: string) {
  return {
    type: CHECK_EMAIL_USED_SUCCESS,
    payload: used
  }
}

function checkEmailUsedError(error: ApiErrorType) {
  return {
    type: CHECK_EMAIL_USED_ERROR,
    payload: error
  }
}

function checkPenNameUsed(penName: string) {
  return {
    type: CHECK_PENNAME_USED,
    payload: penName
  }
} 

function checkPenNameUsedSuccess(used: string) {
  return {
    type: CHECK_PENNAME_USED_SUCCESS,
    payload: used
  }
}

function checkPenNameUsedError(error: ApiErrorType) {
  return {
    type: CHECK_PENNAME_USED_ERROR,
    payload: error
  }
}

function signUpUser(requiredUserInfo: RequiredUserInfo) {
  return {
    type: SIGNUPUSER,
    payload: requiredUserInfo
  }
}

function signUpUserSuccess(success: string) {
  return {
    type: SIGNUPUSER_SUCCESS,
    payload: success
  }
}

function signUpUserError(error: ApiErrorType) {
  return {
    type: SIGNUPUSER_ERROR,
    payload: error
  }
}

function signInUser(userAuthInfo: UserAuthInfo) {
  return {
    type: SIGNINUSER,
    payload: userAuthInfo
  }
}

function signInUserSuccess(payload: UserInfo) {
  return {
    type: SIGNINUSER_SUCCESS,
    payload
  }
};

function signInUserError(payload: ApiErrorType) {
  return {
    type: SIGNINUSER_ERROR,
    payload
  }
}
  
function signOutUser() {
  return {
    type: SIGNOUTUSER
  }
}

function signOutUserSuccess() {
  return {
    type: SIGNOUTUSER_SUCCESS
  }
}

function signOutUserError(error: ApiErrorType) {
  return {
    type: SIGNOUTUSER_ERROR,
    payload: error
  }
};

function reSignInUser() {
  return {
    type: RESIGNINUSER
  }
}

function reSignInUserSuccess(payload: UserInfo) {
  return {
    type: RESIGNINUSER_SUCCESS,
    payload
  }
};

function reSignInUserError(payload: ApiErrorType) {
  return {
    type: RESIGNINUSER_ERROR,
    payload
  }
};

function reissueToken() {
  return {
    type: REISSUETOKEN
  }
}

function reissueTokenError(payload: ApiErrorType) {
  return {
    type: REISSUETOKEN_ERROR,
    payload
  }
}

function resetError() {
  return {
    type: RESET_ERROR
  }
}

function resetAuth() {
  return {
    type: RESET_AUTH
  }
}

export default {
  clearAuthState,
  checkEmailUsed,
  checkEmailUsedSuccess,
  checkEmailUsedError,
  checkPenNameUsed,
  checkPenNameUsedSuccess,
  checkPenNameUsedError,
  signUpUser,
  signUpUserSuccess,
  signUpUserError,
  signInUser,
  signInUserError,
  signInUserSuccess,
  signOutUser,
  signOutUserError,
  signOutUserSuccess,
  reSignInUser,
  reSignInUserError,
  reSignInUserSuccess,
  reissueToken,
  reissueTokenError,
  resetError,
  resetAuth  
}