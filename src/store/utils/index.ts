import acyncUtils from './acyncUtils';
import reducerUtils from './reducerUtils';

export type ActionDefaultType<TType extends string = string > = { 
  type: TType;
};

interface Types {
}

declare type GetAction<TAction extends ActionDefaultType, TType extends TAction['type']> = TAction extends ActionDefaultType<TType>? TAction : never;
export type RootAction = Types extends {
  RootAction: infer T;
} ? T : any;

export type InitialHandler<TState, TRootAction extends ActionDefaultType> = {
  [P in TRootAction['type']]: (state: TState, action: GetAction<TRootAction, P>) => TState;
};

export const ALL_RESET = "common/ALL_RESET" as const; 

export const createPromiseSaga = acyncUtils.createPromiseSaga;
export const allResetSaga      = acyncUtils.allResetSaga;

// reducer utils;
export const updateObject = reducerUtils.updateObject;
export const createReducer = reducerUtils.createReducer;
