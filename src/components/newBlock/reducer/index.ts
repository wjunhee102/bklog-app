import { createReducer } from "../../../store/utils";
import blockHandlers from "./handler";
import { BlockActions, BlockState } from "./utils";

export const initialBlockState: BlockState = {
  isFetch: false,
  isGrab: false,
  isHoldingDown: false,
  isCliping: false,
  targetPosition: null,
  blockList: [],
  editingBlockId: null,
  nextBlockInfo: null,
  stage: [],
  modifyData: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}

const blockReducer = createReducer<BlockState, BlockActions>(initialBlockState, blockHandlers);

export default blockReducer;