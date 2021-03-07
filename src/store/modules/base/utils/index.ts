export const CHANGE_DARK_MODE = "base/CHANGE_DARK_MODE" as const;
export const SERVER_DISCONNECTED = "base/SERVER_DISCONNECTED" as const;

export const changeDarkMode = () => {
  return {
    type: CHANGE_DARK_MODE
  }
}

const disconnectedSever = (error: any) => {
  return {
    type: SERVER_DISCONNECTED,
    payload: {
      error
    }
  }
}

export type BaseActions = ReturnType<typeof changeDarkMode> | 
            ReturnType<typeof disconnectedSever>;

export interface BaseState {
  dark: boolean;
  error: any;
}