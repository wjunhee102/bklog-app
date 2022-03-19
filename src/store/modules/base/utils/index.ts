export const CHANGE_DARK_MODE = "base/CHANGE_DARK_MODE" as const;
export const SERVER_DISCONNECTED = "base/SERVER_DISCONNECTED" as const;
export const INIT = "base/INIT" as const;

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

export function init() {
  return {
    type: INIT
  }
}

export type BaseActions = ReturnType<typeof changeDarkMode> 
  | ReturnType<typeof disconnectedSever>
  | ReturnType<typeof init>
;

export interface BaseState {
  dark: boolean;
  error: any;
}

export type BaseStateProps = {
  [P in keyof BaseState]?: BaseState[P];
}