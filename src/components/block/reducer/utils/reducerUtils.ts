import { ActionHandlers } from ".";

function createClearStatePart<P extends object, T extends P = any>(initialState: T, key: string[]): P {
  return key.reduce((acc, cur) => {
    if(initialState.hasOwnProperty(cur)) {
      Object.assign(acc, {
        [cur]: initialState[cur as keyof typeof initialState]
      })
    }
    return acc;
  }, {} as P) as P;
}

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
  createReducer
}