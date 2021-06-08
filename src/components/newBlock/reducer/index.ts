import { BlockState } from "./utils";

const initialBlockState: BlockState = {
  blockList: []
}

function blockReducer(state: BlockState = initialBlockState, action: any) {
  switch(action.type) {
    default: 
      return state;
  } 
}

export default blockReducer;