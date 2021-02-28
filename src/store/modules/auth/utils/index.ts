export const SIGNUP = "auth/SIGNUP" as const;
export const SIGNIN = "auth/SIGNIN" as const;
export const SIGNIN_ASYNC = "auth/SIGNIN_ASYNC" as const;
export const SIGNOUT_ASYNC = "auth/SIGNOUT_ASYNC" as const;
export const REFRESH_TOKEN = "suth/REFRESH_TOKEN" as const;

export type User = {
  name: string;
  email: string;
  penName: string;
  userId: string;
  profileId: string;
}

export interface AuthState {
  user: User | null;
}