import { updateObject } from "../../utils";
import { BaseState, BaseActions, CHANGE_DARK_MODE, SERVER_DISCONNECTED, INIT, UNKNOWN, isBrowserCheck } from "./utils";

const initState: BaseState = {
  dark: false,
  error: null,
  browser: UNKNOWN
}

function base(state: BaseState = initState, action: BaseActions) {
  switch(action.type) {
    case CHANGE_DARK_MODE:
      localStorage.setItem("dark", JSON.stringify(!state.dark));

      return updateObject(state, {
        dark: !state.dark
      });

    case SERVER_DISCONNECTED:
      return updateObject(state, {
        error: action.payload.error
      });

    case INIT: 
      const browser = isBrowserCheck(); 
      const darkMode = localStorage.getItem("dark");

      return updateObject(state, {
        dark: darkMode? JSON.parse(darkMode) : false,
        browser
      });

    default: 
      return state;
  }
}

export default base;
