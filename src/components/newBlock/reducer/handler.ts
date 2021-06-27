import { ActionHandlers, updateObject } from "../../../store/utils";
import { 
  BlockState, 
  updateBlockContents, 
  updateModifyData, 
  tempDataPush, 
  addBlock, 
  addBlockInList, 
  deleteBlock, 
  removeBlockInList, 
  changeBlockTextStyle,
  changeTextStyle,
  switchBlock,
  switchBlockList,
  BlockStateProps,
  restoreBlock,
  revertBlock,
  COMMIT_BLOCK, 
  ADD_BLOCK, 
  DELETE_BLOCK,
  SWITCH_BLOCK,
  CHANGE_TEXT_STYLE,
  REVERT_BLOCK,
  addToStage,
  editBlock,
  EDIT_BLOCK,
  changeEditingId,
  CHANGE_EDITING_ID,
  changeEditorState,
  CHANGE_EDITOR_STATE
} from "./utils";

function changeEditingIdHandler(state: BlockState, { payload: { nextEditInfo }}: ReturnType<typeof changeEditingId>) {
  if(typeof nextEditInfo === "string") {
    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId: nextEditInfo
    });
  } else {
    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId: state.blockList[nextEditInfo]? state.blockList[nextEditInfo].id : null
    });
  }
}

function editBlockHandler(state: BlockState, { payload: { blockId, blockIndex, contents } }: ReturnType<typeof editBlock>) {
  return updateObject<BlockState, BlockStateProps>(state, {
    stage: addToStage(state.stage, blockId, blockIndex, contents)
  });
}

function commitBlockHandler(
  state: BlockState
): BlockState {
  if(!state.stage[0]) return state;

  const { blockList, modifyData, tempData } = updateBlockContents(state.blockList, state.stage);

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stage: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempBack: tempDataPush(state.tempBack, tempData)
  });
}

function addBlockHandler(
  state: BlockState, 
  { 
    payload: { addBlockList, targetPosition, nextEditInfo } 
  }: ReturnType<typeof addBlock>
): BlockState {
  const { blockList, modifyData, tempData } = addBlockInList(state.blockList, addBlockList, targetPosition);

  const editingBlockId: string | null = nextEditInfo !== undefined? 
    typeof nextEditInfo === "string"? 
    nextEditInfo 
    : blockList[nextEditInfo].id
    : null;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId,
    modifyData: updateModifyData(
      state.modifyData, 
      modifyData
    ),
    tempBack: tempDataPush(state.tempBack, tempData),
    tempFront: []
  });
}

function deleteBlockHandler(
  state: BlockState,
  { payload: { removedBlockList, nextEditInfo } }: ReturnType<typeof deleteBlock>
): BlockState {
  const { blockList, modifyData, tempData } = removeBlockInList(state.blockList, removedBlockList);

  const editingBlockId: string | null = nextEditInfo !== undefined? 
    typeof nextEditInfo === "string"? 
    nextEditInfo 
    : blockList[nextEditInfo].id
    : null;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId,
    tempBack: tempDataPush(state.tempBack, tempData),
    tempFront: [],
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

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList: result.blockList,
    modifyData: updateModifyData(state.modifyData, result.modifyData),
    tempFront: [],
    tempBack: tempDataPush(state.tempBack, result.tempData)
  });
}

function switchBlockHandler(
  state: BlockState, 
  { payload: { 
    changedBlockIdList, targetPosition, container 
  } }: ReturnType<typeof switchBlock>
) {
  const { blockList, tempData, modifyData } = switchBlockList(state.blockList, changedBlockIdList, targetPosition, container);

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempFront: [],
    tempBack: tempDataPush(state.tempBack, tempData)
  });
}

function revertBlockHandler(
  state: BlockState,
  { back }: ReturnType<typeof revertBlock>
) {
  if(back && state.tempBack[0]) {
    const length = state.tempBack.length - 1;
    const { blockList, tempData, modifyData } = restoreBlock(state.blockList, state.tempBack[length]);
    const tempBack = state.tempBack.concat();
    tempBack.pop();

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      tempBack,
      tempFront: tempDataPush(state.tempFront, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData)
    });

  } else if(state.tempFront[0]) {
    const length = state.tempFront.length - 1;
    const { blockList, tempData, modifyData } = restoreBlock(state.blockList, state.tempFront[length]);
    const tempFront = state.tempFront.concat();
    tempFront.pop();

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      tempFront,
      tempBack: tempDataPush(state.tempBack, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData)
    });

  } else {
    return state;
  }

}

function changeEditorStateHandler(
  state: BlockState, { 
    payload: { graping, pressing, cliping } 
  }: ReturnType<typeof changeEditorState>
) {

  return updateObject<BlockState, BlockStateProps>(state, {
    graping: graping? graping : state.graping,
    pressing: pressing? pressing : state.pressing,
    cliping: cliping? cliping : state.cliping
  });
}

const blockHandlers: ActionHandlers<BlockState> = {
  [CHANGE_EDITING_ID]   : changeEditingIdHandler,
  [EDIT_BLOCK]          : editBlockHandler,
  [COMMIT_BLOCK]        : commitBlockHandler,
  [ADD_BLOCK]           : addBlockHandler,
  [DELETE_BLOCK]        : deleteBlockHandler,
  [CHANGE_TEXT_STYLE]   : changeTextStyleHandler,
  [SWITCH_BLOCK]        : switchBlockHandler,
  [REVERT_BLOCK]        : revertBlockHandler,
  [CHANGE_EDITOR_STATE] : changeEditorStateHandler
};

export default blockHandlers;