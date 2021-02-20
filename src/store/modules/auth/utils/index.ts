export const SIGNUP = "auth/SIGNUP" as const;
export const SIGNIN = "auth/SIGNIN" as const;
export const SIGNIN_ASYNC = "auth/SIGNIN_ASYNC" as const;

export interface AuthState {
  email: string;
  name: string;
}