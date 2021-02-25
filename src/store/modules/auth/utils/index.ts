export const SIGNUP = "auth/SIGNUP" as const;
export const SIGNIN = "auth/SIGNIN" as const;
export const SIGNIN_ASYNC = "auth/SIGNIN_ASYNC" as const;
export const SIGNOUT_ASYNC = "auth/SIGNOUT_ASYNC" as const;
export const REFRESH_TOKEN = "suth/REFRESH_TOKEN" as const;

export interface AuthState {
  email: string;
  name: string;
}