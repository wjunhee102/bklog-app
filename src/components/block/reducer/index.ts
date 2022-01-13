import blockHandlers from "./handler";
import { BlockActions, BlockState, createReducer } from "./utils";

export const initialBlockState: BlockState = {
  isFetch: false,
  isGrab: false,
  isPress: false,
  isHoldingDown: false,
  isCliping: false,
  targetPosition: null,
  pageInfo: {
    title: null
  },
  blockList: [],
  editingBlockId: null,
  preBlockInfo: null,
  stageBlock: [],
  stagePage: null,
  modifyData: [],
  modifyPageInfo: null,
  updatedBlockIdList: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}

const blockReducer = createReducer<BlockState, BlockActions>(initialBlockState, blockHandlers);

export default blockReducer;