import { updateObject } from "../../../store/utils";
import { 
  BlockState, 
  commitBlock, 
  updateBlockContents, 
  updateModifyData, 
  tempDataPush, 
  addBlock, 
  addBlockInList, 
  deleteBlock, 
  removeBlockInList, 
  COMMIT_BLOCK, 
  ADD_BLOCK, 
  DELETE_BLOCK, 
  changeBlockTextStyle,
  CHANGE_TEXT_STYLE,
  changeTextStyle
} from "./utils";

function commitBlockHandler(
  state: BlockState, 
  { stage }: ReturnType<typeof commitBlock>
): BlockState {
  if(stage[0]) return state;

  const { blockList, modifyData, tempData } = updateBlockContents(state.blockList, stage);

  return updateObject<BlockState>(state, {
    blockList,
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempBack: tempDataPush(state.tempBack, tempData)
  });
}

function addBlockHandler(
  state: BlockState, 
  { payload: { addBlockList, targetPosition, index } 
}: ReturnType<typeof addBlock>
): BlockState {
  const { blockList, modifyData, tempData } = addBlockInList(state.blockList, addBlockList, targetPosition, index);

  return updateObject<BlockState>(state, {
    blockList,
    modifyData: updateModifyData(
      state.modifyData, 
      modifyData
    ),
    tempBack: tempDataPush(state.tempBack, tempData)
  });
}

function deleteBlockHandler(
  state: BlockState,
  { payload: { removedBlockList } }: ReturnType<typeof deleteBlock>
): BlockState {
  const { blockList, modifyData, tempData } = removeBlockInList(state.blockList, removedBlockList);

  return updateObject<BlockState>(state, {
    blockList,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData)
  });
}

function changeTextStyleHandler(
  state: BlockState, 
  { payload: { 
    index, styleType, startPoint, endPoint, order 
  } }: ReturnType<typeof changeTextStyle>
): BlockState {

  const result = changeBlockTextStyle(
    state.blockList, 
    index, 
    styleType, 
    startPoint, 
    endPoint, 
    order
  );
  
  if(!result) return state;

  return updateObject<BlockState>(state, {
    blockList: result.blockList,
    modifyData: updateModifyData(state.modifyData, result.modifyData),
    tempBack: tempDataPush(state.tempBack, result.tempData)
  });
}

function switchBlockHandler(state: BlockState, { payload: { blocks, targetPosition } }: any) {
  // container 생성할지 말지 인자 받을 것.
}

const blockHandlers = {
  [COMMIT_BLOCK]      : commitBlockHandler,
  [ADD_BLOCK]         : addBlockHandler,
  [DELETE_BLOCK]      : deleteBlockHandler,
  [CHANGE_TEXT_STYLE] : changeTextStyleHandler
};

export default blockHandlers;