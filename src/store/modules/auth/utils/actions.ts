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
  RESET_AUTH
 } from ".";

const signUpUser = ( requiredUserInfo: RequiredUserInfo ) => {
  return {
    type: SIGNUPUSER,
    payload: requiredUserInfo
  }
}

const signUpUserSuccess = () => {
  return {
    type: SIGNUPUSER_SUCCESS
  }
}

const signUpUserError = (error: any) => {
  return {
    type: SIGNUPUSER_ERROR,
    payload: {
      error
    }
  }
}

const signInUser = ( userAuthInfo: UserAuthInfo ) => {
  return {
    type: SIGNINUSER,
    payload: userAuthInfo
  }
}

const signInUserSuccess = (payload: User) => {
  return {
    type: SIGNINUSER_SUCCESS,
    payload
  }
};

const signInUserError = (payload: User) => {
  return {
    type: SIGNINUSER_ERROR,
    payload
  }
}
  
const signOutUser = () => {
  return {
    type: SIGNOUTUSER
  }
}

const signOutUserSuccess = () => {
  return {
    type: SIGNOUTUSER_SUCCESS
  }
}

const signOutUserError = () => {
  return {
    type: SIGNOUTUSER_ERROR
  }
};

const reSignInUser = () => {
  return {
    type: RESIGNINUSER
  }
}

const reSignInUserSuccess = (payload: User) => {
  return {
    type: RESIGNINUSER_SUCCESS,
    payload
  }
};

const reSignInUserError = (payload: User) => {
  return {
    type: RESIGNINUSER_ERROR,
    payload
  }
};

const reissueToken = () => {
  return {
    type: REISSUETOKEN
  }
}

const reissueTokenError = (payload: User) => {
  return {
    type: REISSUETOKEN_ERROR,
    payload
  }
}

const resetAuth = () => {
  return {
    type: RESET_AUTH
  }
}

const actions = {
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
  resetAuth
}

export default actions;