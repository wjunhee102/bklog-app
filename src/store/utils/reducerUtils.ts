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

type ActionDefaultType = { type: string };

function updateObject<T = any>(oldObject: T, newValues: any): T {
  return Object.assign({}, oldObject, newValues);
};

function createReducerAction<T = any>(updateState: Function) {
  return function(state: T, action: any): T {
    return updateState(state, action) as T;
  }
}

function createHandler(type: string, handler: ReturnType<typeof createReducerAction>) {
  return {
    [type]: handler
  }
}

function createHandlers(handlers: ReturnType<typeof createHandler>[]) {
  return Object.assign({}, ...handlers);
}


class Handers<T = any> {
  handlers: ReturnType<typeof createHandler>[] = [];
  state: T

  constructor(state: T) {
    this.state = state;
  }

  createAction(updateState: Function) {
    return function(state: T, action: any): T {
      return updateState(state, action) as T;
    }
  }

  createHandler(type: string, handler: ReturnType<typeof createReducerAction>) {
    return {
      [type]: handler
    } as const;
  }

  createHandlers(handlers: ReturnType<typeof createHandler>[]) {
    return Object.assign({}, ...handlers);
  }

  setAction(type: string, updateState: Function) {

  }
}

function createReducer<T = any, P = any>(initialState: T, handlers: ReturnType<typeof createHandlers>) {
  return function reducer(state: T = initialState, action: ActionDefaultType & P ) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action) as T;
    } else {
      return state;
    }
  }
}

const reducerUtils = {
  updateObject,
  createReducerAction,
  createHandler,
  createHandlers,
  createReducer
}

export default reducerUtils;