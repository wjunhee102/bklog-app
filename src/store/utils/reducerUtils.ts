import { Action, ActionHandlers} from '.';

const settingsReducer = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: (payload: any) => ({
    loading: false,
    data: payload,
    error: null
  }),
  error: (error: any) => ({
    loading: false,
    data: null,
    error: error
  })
}

function handleAsyncActions (type: any, key: any, keepData: boolean = false) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state: any, action: any) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: settingsReducer.loading(keepData ? state[key].data : null)
        };
      case SUCCESS:
        return {
          ...state,
          [key]: settingsReducer.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: settingsReducer.error(action.payload)
        };
      default:
        return state;
    }
  };
}

function updateObject<T = any, P = any>(oldObject: T, newValues: P): T {
  return Object.assign({}, oldObject, newValues);
};

// function createReducer<P extends string, State, T extends ActionsCreators<P>>(
//   handlers: ActionHandlers<P, T, State>,
//   initialState: State
// ) {
//   return (state: State = initialState, action: ActionsUnion<P, T>): State => {

//       if (handlers.hasOwnProperty(action.type)) {
//         return handlers[action.type](state, action);
//       }

//       return state;
//   }
// }


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

const reducerUtils = {
  updateObject,
  createReducer
}

export default reducerUtils;