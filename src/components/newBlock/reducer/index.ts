import { BlockData } from "../types";

export interface BlockState {
  blockList: BlockData[]
}

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