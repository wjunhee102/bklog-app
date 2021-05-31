import { ActionDefaultType, InitialHandler, RootAction } from '.';

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

// type InitialHandler<TState, TRootAction> = {
//   [P in ActionDefaultType["type"]]: (state: TState, action: TRootAction & ActionDefaultType) => TState;
// };

// export type InitialHandler<TState, TRootAction> = {
//   [key: string]: (state: TState, action: TRootAction & ActionDefaultType) => TState;
// };

// type InitialHandler<TState, TRootAction = ActionDefaultType> = {
//   [P in keyof TRootAction & ActionDefaultType["type"]]?: (state: TState, action: P) => TState | any;
// };

// type InitialHandler<TState, TRootAction extends ActionDefaultType> = {
//   [type: string]: (state: TState, action: TRootAction) => TState;
// };


function updateObject<T = any>(oldObject: T, newValues: any): T {
  return Object.assign({}, oldObject, newValues);
};

function createReducer<T, P extends ActionDefaultType = RootAction>(initialState: T, handlers: any ) {
  return function reducer(state: T = initialState, action: P) {
    if (action.type) {
      return handlers[action.type](state, action) as T;
    } else {
      return state;
    }
  }
}

const reducerUtils = {
  updateObject,
  createReducer
}

export default reducerUtils;