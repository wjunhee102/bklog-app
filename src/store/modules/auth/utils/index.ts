import authApiUtils from './apiUtils';

export const SIGNUP = "auth/SIGNUP" as const;
export const SIGNIN = "auth/SIGNIN" as const;
export const SIGNIN_ASYNC = "auth/SIGNIN_ASYNC" as const;
export const SIGNOUT_ASYNC = "auth/SIGNOUT_ASYNC" as const;
export const REFRESH_TOKEN = "suth/REFRESH_TOKEN" as const;

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

export interface AuthState {
  loading: boolean;
  user: User;
}

export type UserProfile = {
  penName: string;
  profileId: string;
  userPhoto: string;
  bio: string; 
}

export type UserInfo = UserProfile & {
  name: string;
  email: string;
  userId: string;
}

export type UserError = {
  countOfFail: number;
  isActive: boolean;
  isNotDormant: boolean;
}

export type User = {
  userInfo: UserInfo | null;
  error: {
    signIn: UserError | null;
    signUp: any;
    signOut: any;
  };
}

export type AuthReq<T = any> = {
  url: string,
  data: T
}

export type UserAuthInfo = {
  email: string;
  password: string;
}

export type RequiredUserInfo = UserAuthInfo & {
  penName: string;
  name: string;
}

export type ResSignUpUser = {
  error?: {
    emailValid: boolean;
    passwordValid: boolean;
    penNameValid: boolean;
    emailUsed: boolean;
    penNameUsed: boolean;
  }
}

export const authFetchPost = authApiUtils.authFetchPost;
export const authFetchGet  = authApiUtils.authFetchGet;

