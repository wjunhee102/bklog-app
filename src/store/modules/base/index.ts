import { BaseState, BaseActions, CHANGE_DARK_MODE, SERVER_DISCONNECTED } from "./utils";

const initState: BaseState = {
  dark: false,
  error: null
}

function base(state: BaseState = initState, action: BaseActions) {
  switch(action.type) {
    case CHANGE_DARK_MODE:
      localStorage.setItem("dark", JSON.stringify(!state.dark));

      return Object.assign({}, state, {
        dark: !state.dark
      });

    case SERVER_DISCONNECTED:
      return Object.assign({}, state, {
        error: action.payload.error
      });

    default: 
      const darkMode = localStorage.getItem("dark");

      if(darkMode) {
        return Object.assign({}, state, {
          dark: true
        });
      } else {
        return state;
      }
  }
}

export default base;
