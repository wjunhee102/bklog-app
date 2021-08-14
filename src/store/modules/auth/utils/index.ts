import authApiUtils from './apiUtils';
import actions from './actions';
import { ApiErrorType } from '../../../../utils/api-utils';
import { createAction } from 'typesafe-actions';

export const SIGNUPUSER = "auth/SIGN_UP_USER" as const;
export const SIGNUPUSER_SUCCESS = "auth/SIGN_UP_USER_SUCCESS" as const;
export const SIGNUPUSER_ERROR = "auth/SIGN_UP_USER_ERROR" as const;

export const SIGNINUSER = "auth/SIGN_IN_USER" as const;
export const SIGNINUSER_SUCCESS = "auth/SIGN_IN_USER_SUCCESS" as const;
export const SIGNINUSER_ERROR = "auth/SIGN_IN_USER_ERROR" as const;

export const SIGNOUTUSER = "auth/SIGN_OUT_USER" as const;
export const SIGNOUTUSER_SUCCESS = "auth/SIGN_OUT_USER_SUCCESS" as const;
export const SIGNOUTUSER_ERROR = "auth/SIGN_OUT_USER_ERROR" as const;

export const RESIGNINUSER = "auth/RESIGN_IN_USER" as const;
export const RESIGNINUSER_SUCCESS = "auth/RESIGN_IN_USER_SUCCESS" as const;
export const RESIGNINUSER_ERROR = "auth/RESIGN_IN_USER_ERROR" as const;

export const REISSUETOKEN = "REISSUETOKEN" as const;
export const REISSUETOKEN_ERROR = "REISSUETOKEN_ERROR" as const;

export const RESET_AUTH = "auth/RESET_AUTH" as const;

export const ERROR_AUTH = 'auth/RESET_AUTH' as const;

export interface AuthState {
  loading: boolean;
  user: UserInfo | null;
  error: {
    signInUser: SignInError | null,
    signUpUser: SignUpError,
    signOutUser: any
  },
  errorA: ApiErrorType | null
}

export interface AuthState2 {
  loading: boolean;
  user: UserInfo | null;
  signUp: SignUpError; 
  error: ApiErrorType;
}

export interface UserProfile {
  penName: string;
  profileId: string;
  userPhoto: string;
  bio: string; 
}

export interface UserInfo extends UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  userInfo: UserInfo | null;
  error: SignInError | null;
}

export interface SignInError {
  countOfFail: number;
  isActive: boolean;
  isNotDormant: boolean;
}

export interface AuthReq<T = any> {
  url: string,
  data: T
}

export interface UserAuthInfo {
  email: string;
  password: string;
}

export interface RequiredUserInfo extends UserAuthInfo {
  penName: string;
  firstName: string;
  lastName: string;
}

export interface SignUpError {
  emailValid: boolean;
  passwordValid: boolean;
  penNameValid: boolean;
  emailUsed: boolean;
  penNameUsed: boolean;
}

export interface ResSignUpUser {
  error? : {
    emailValid: boolean;
    passwordValid: boolean;
    penNameValid: boolean;
    emailUsed: boolean;
    penNameUsed: boolean;
  }
}

/**
 * actions
 */
export const signUpUser = actions.signUpUser;
export const signInUser = actions.signInUser;
export const signOutUser = actions.signOutUser;
export const reSignInUser = actions.reSignInUser;
export const reissueToken = actions.reissueToken;
export const resetAuth = actions.resetAuth;

const { 
  signUpUserSuccess,
  signUpUserError,
  signInUserSuccess, 
  signInUserError,
  signOutUserSuccess,
  signOutUserError,
  reSignInUserError,
  reSignInUserSuccess,
  reissueTokenError
} = actions;

export type AuthActions = 
  ReturnType<typeof signUpUser>
  | ReturnType<typeof signUpUserSuccess>
  | ReturnType<typeof signUpUserError>
  | ReturnType<typeof signInUser>
  | ReturnType<typeof signOutUser>
  | ReturnType<typeof signInUserSuccess>
  | ReturnType<typeof signInUserError>
  | ReturnType<typeof signOutUserSuccess>
  | ReturnType<typeof signOutUserError>
  | ReturnType<typeof reSignInUser>
  | ReturnType<typeof reSignInUserSuccess>
  | ReturnType<typeof reSignInUserError>
  | ReturnType<typeof reissueTokenError>
  | ReturnType<typeof resetAuth>
;

export const authFetchPost = authApiUtils.authFetchPost;
export const authFetchGet  = authApiUtils.authFetchGet;

