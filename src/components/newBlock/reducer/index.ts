import blockHandlers from "./handler";
import { BlockActions, BlockState, BLOCK_ACTION_TYPES } from "./utils";

const initialBlockState: BlockState = {
  blockList: [],
  editingBlockId: null,
  stage: [],
  modifyData: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}

type Action = {
  type: string;
}

type ActionHandlers<T, P extends Action> = {
  [type: string]: (state: T, action: P) => T;
}

function createReducer<T, P extends Action>(initialState: T, handlers: any) {
  return function(state: T = initialState, action: P) {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}

const blockReducer = createReducer<BlockState, BlockActions>(initialBlockState, blockHandlers);

export default blockReducer;