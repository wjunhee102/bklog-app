import { ActionHandlers } from ".";

function createClearStatePart<P extends object, T extends P = any>(initialState: T, key: string[]): P {
  return key.reduce((acc, cur) => {
    if(initialState.hasOwnProperty(cur)) {
      acc[cur] = initialState[cur];
    }
    return acc;
  }, {} as P);
}

function updateObject<T = any, P = any>(oldObject: T, ...newValues: P[]): T {
  return Object.assign({}, oldObject, ...newValues);
};

type Action = {
  type: string;
}

function createReducer<State, T extends Action>(
  initialState: State,
  handlers: ActionHandlers<State>,
) {
  return (state: State = initialState, action: T): State => {

      if (handlers.hasOwnProperty(action.type as string)) {
        return handlers[action.type as string](state, action);
      }

      return state;
  }
}

export default {
  createClearStatePart,
  updateObject,
  createReducer
}