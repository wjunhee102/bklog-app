import blockHandlers from "./handler";
import { BlockActions, BlockState, createReducer } from "./utils";

export const initialBlockState: BlockState = {
  editable: false,
  isFetch: false,
  isGrab: false,
  isPress: false,
  isHoldingDown: false,
  isCliping: false,
  isTracking: false,
  targetInfo: null,
  pageTitle: null,
  blockList: [],
  editingBlockId: null,
  preBlockInfo: null,
  stagedTextBlockData: null,
  stagedBlockDataList: [],
  stagedPageTitle: null,
  modifyBlockTokenList: [],
  modifyPageTokenList: [],
  updatedBlockIdList: [],
  historyBack: [],
  historyFront: [],
  tempClipData: [],
  clipBoard: []
}

const blockReducer = createReducer<BlockState, BlockActions>(initialBlockState, blockHandlers);

export default blockReducer;