import { BklogState, RESET_BLOCK } from "./utils";

const initialState: BklogState = (() => {
  return {
    pageId: null,
    userId: null,
    blocks: [],
    editingId: null,
    stage: [],
    rightToEdit: false,
    tempBack: [],
    tempFront: []
  };
})();

function bklog(state: BklogState = initialState, action: any):BklogState {

  switch(action.type) {
    case RESET_BLOCK: 
      return initialState;
      
    default: 

      return state;
  }

}

export default bklog;