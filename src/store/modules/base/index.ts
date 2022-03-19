import { updateObject } from "../../utils";
import { BaseState, BaseActions, CHANGE_DARK_MODE, SERVER_DISCONNECTED, INIT } from "./utils";

const initState: BaseState = {
  dark: false,
  error: null
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
      const darkMode = localStorage.getItem("dark");
  
      if(darkMode) {
        return updateObject(state, {
          dark: JSON.parse(darkMode)
        });
      } else {
        return state;
      }

    default: 
      return state;
  }
}

export default base;
