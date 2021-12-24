import { createReducer } from "../../../store/utils";
import blockHandlers from "./handler";
import { BlockActions, BlockState, createPageTitleBlockData } from "./utils";

const defaultTitleBlock = createPageTitleBlockData("무제");

export const initialBlockState: BlockState = {
  isFetch: false,
  isGrab: false,
  isPress: false,
  isHoldingDown: false,
  isCliping: false,
  targetPosition: null,
  titleBlock: null,
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