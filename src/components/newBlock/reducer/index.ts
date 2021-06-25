import { createReducer } from "../../../store/utils";
import blockHandlers from "./handler";
import { BlockActions, BlockState } from "./utils";

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

const blockReducer = createReducer<BlockState, BlockActions>(initialBlockState, blockHandlers);

export default blockReducer;