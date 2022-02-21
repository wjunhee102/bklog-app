import authApiUtils from './apiUtils';
import actions from './actions';
import { ApiErrorType } from '../../../../utils/api-utils';

export interface UserProfile {
  penName: string | null;
  id: string | null;
  photo: string | null;
  coverImage: string | null;
  coverColor: string | null;
  bio: string | null; 
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

export interface AuthState2 {
  loading: boolean;
  user: UserInfo | null;
  error: {
    signInUser: SignInError | null,
    signUpUser: SignUpError,
    signOutUser: any
  },
  errorA: ApiErrorType | null
}

export interface SignUpState {
  penNameUsed: boolean;
  emailUsed: boolean;
}

export interface SignUpStateProps {
  penNameUsed?: boolean;
  emailUsed?: boolean;
}

export interface AuthState {
  loading: boolean;
  user: UserInfo | null;
  signUpSuccess: boolean | null;
  signUpState: SignUpState; 
  error: ApiErrorType | null;
  waitingCount: number;
  errorToggle: boolean;
}

export type AuthStateProps = {
  [Property in keyof AuthState]?: AuthState[Property]; 
}

export type ClearAuthStateType = 'loading'
  | 'user'
  | 'signUpSuccess'
  | 'signUpState'
  | 'error'
  | 'waitingCount'
  | 'errorToggle'
;

export const initFetchState = {
  loading: true,
  error: null,
  errorToggle: false,
  waitingCount: 0
}

/**
 * actions
 */
export const CLEAR_AUTH_STATE = "auth/CLEAR_AUTH_STATE" as const;

export const CHECK_EMAIL_USED         = "auth/CHECK_EMAIL_USED" as const;
export const CHECK_EMAIL_USED_SUCCESS = "auth/CHECK_EMAIL_USED_SUCCESS" as const;
export const CHECK_EMAIL_USED_ERROR   = "auth/CHECK_EMAIL_USED_ERROR" as const;

export const CHECK_PENNAME_USED         = "auth/CHECK_PENNAME_USED" as const;
export const CHECK_PENNAME_USED_SUCCESS = "auth/CHECK_PENNAME_USED_SUCCESS" as const;
export const CHECK_PENNAME_USED_ERROR   = "auth/CHECK_PENNAME_USED_ERROR" as const;

export const SIGNUPUSER         = "auth/SIGN_UP_USER" as const;
export const SIGNUPUSER_SUCCESS = "auth/SIGN_UP_USER_SUCCESS" as const;
export const SIGNUPUSER_ERROR   = "auth/SIGN_UP_USER_ERROR" as const;

export const SIGNINUSER         = "auth/SIGN_IN_USER" as const;
export const SIGNINUSER_SUCCESS = "auth/SIGN_IN_USER_SUCCESS" as const;
export const SIGNINUSER_ERROR   = "auth/SIGN_IN_USER_ERROR" as const;

export const SIGNOUTUSER         = "auth/SIGN_OUT_USER" as const;
export const SIGNOUTUSER_SUCCESS = "auth/SIGN_OUT_USER_SUCCESS" as const;
export const SIGNOUTUSER_ERROR   = "auth/SIGN_OUT_USER_ERROR" as const;

export const RESIGNINUSER         = "auth/RESIGN_IN_USER" as const;
export const RESIGNINUSER_SUCCESS = "auth/RESIGN_IN_USER_SUCCESS" as const;
export const RESIGNINUSER_ERROR   = "auth/RESIGN_IN_USER_ERROR" as const;

export const REISSUETOKEN       = "REISSUETOKEN" as const;
export const REISSUETOKEN_ERROR = "REISSUETOKEN_ERROR" as const;

export const RESET_ERROR = "auth/RESET_ERROR" as const;

export const RESET_AUTH = "auth/RESET_AUTH" as const;

export const ERROR_AUTH = 'auth/ERROR_AUTH' as const;

export const clearAuthState          = actions.clearAuthState;
export const checkEmailUsed          = actions.checkEmailUsed;
export const checkEmailUsedSuccess   = actions.checkEmailUsedSuccess;
export const checkEmailUsedError     = actions.checkEmailUsedError;
export const checkPenNameUsed        = actions.checkPenNameUsed;
export const checkPenNameUsedSuccess = actions.checkPenNameUsedSuccess;
export const checkPenNameUsedError   = actions.checkPenNameUsedError;
export const signUpUser              = actions.signUpUser;
export const signUpUserSuccess       = actions.signUpUserSuccess;
export const signUpUserError         = actions.signUpUserError;
export const signInUser              = actions.signInUser;
export const signInUserSuccess       = actions.signInUserSuccess;
export const signInUserError         = actions.signInUserError;
export const signOutUser             = actions.signOutUser;
export const signOutUserSuccess      = actions.signOutUserSuccess;
export const signOutUserError        = actions.signOutUserError;
export const reSignInUser            = actions.reSignInUser;
export const reSignInUserSuccess     = actions.reSignInUserSuccess;
export const reSignInUserError       = actions.reSignInUserError;
export const reissueToken            = actions.reissueToken;
export const reissueTokenError       = actions.reissueTokenError;
export const resetError              = actions.resetError;
export const resetAuth               = actions.resetAuth;

export type AuthActions = ReturnType<typeof clearAuthState>
  | ReturnType<typeof signUpUser>
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

export const authFetchPost   = authApiUtils.authFetchPost;
export const authFetchGet    = authApiUtils.authFetchGet;
export const authFetchDelete = authApiUtils.authFetchDelete;


