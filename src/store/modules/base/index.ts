import { BaseState, BaseActions, CHANGE_DARK_MODE, SERVER_DISCONNECTED } from "./utils";

const initState: BaseState = {
  dark: false,
  error: null
}

function base(state: BaseState = initState, action: BaseActions) {
  switch(action.type) {
    case CHANGE_DARK_MODE:
      return Object.assign({}, state, {
        dark: !state.dark
      });

    case SERVER_DISCONNECTED:
      return Object.assign({}, state, {
        error: action.payload.error
      });

    default: 
      return state;
  }
}

export default base;
