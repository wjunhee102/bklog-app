import acyncUtils from './acyncUtils';
import reducerUtils from './reducerUtils';

// create reducer type
// export interface Action<T extends string> {
//   type: T;
// }

// export type ActionCreator<T extends string> = (...args: any) => Action<T>;

// export type ActionsCreators<T extends string> = {
//   [creator: string]: ActionCreator<T>;
// }

// export type ActionsUnion<P extends string, T extends ActionsCreators<P>> = ReturnType<T[keyof T]>;

// export type ActionHandlers<P extends string, T extends ActionsCreators<P>, State> = {
//   [K in ReturnType<T[keyof T]>["type"]]: (
//       state: State,
//       action: ReturnType<T[K]>
//   ) => State
// }

export type Action = {
  type: string;
}

export type ActionHandlers<T> = {
  [P: string]: (state: T, action: any) => T;
}

// reducer utils;
export const updateObject         = reducerUtils.updateObject;
export const createReducer        = reducerUtils.createReducer;
export const createAction         = reducerUtils.createAction;
export const createClearStatePart = reducerUtils.createClearStatePart;


export const ALL_RESET = "common/ALL_RESET" as const; 

// asyncUtils
export const createPromiseSaga = acyncUtils.createPromiseSaga;
export const allResetSaga      = acyncUtils.allResetSaga;