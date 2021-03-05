
const CHANGE_DARK_MODE = "base/CHANGE_DARK_MODE";

export const changeDarkMode = () => {
  return {
    type: CHANGE_DARK_MODE
  }
}

type BaseActions = ReturnType<typeof changeDarkMode>;

export interface BaseState {
  dark: boolean;
}

const initState: BaseState = {
  dark: false
}

function base(state: BaseState = initState, action: BaseActions) {
  switch(action.type) {
    case CHANGE_DARK_MODE:
      return Object.assign({}, state, {
        dark: !state.dark
      });

    default: 
      return state;
  }
}

export default base;
