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

function updateObject<T extends object>(oldObject: T, ...newValues: { [Prop in keyof T]?: T[Prop] }[]): T {
  return Object.assign({}, oldObject, ...newValues);
};

type TypeConstant = string;

type AAction<TType extends TypeConstant = TypeConstant> = {
  type: TType;
};

function createAction<T = any, TType extends TypeConstant = TypeConstant>(type: TType) {
  return function(payload: T) {
    return {
      type,
      payload
    };
  }
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

function createClearStatePart<P extends object, T extends P = any>(initialState: T, key: string[]): P {
  return key.reduce((acc, cur) => {
    if(initialState.hasOwnProperty(cur)) {
      acc[cur as keyof P] = initialState[cur as keyof T] as never;
    }
    return acc;
  }, {} as P);
}

const reducerUtils = {
  updateObject,
  createReducer,
  createAction,
  createClearStatePart
}

export default reducerUtils;