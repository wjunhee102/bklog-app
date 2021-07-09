import { initialBlockState } from ".";
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
  CHANGE_EDITOR_STATE,
  EDIT_BLOCK,
  CHANGE_TARGET_POSITION,
  addToStage,
  editBlock,
  changeTargetPosition,
  changeEditingId,
  CHANGE_EDITING_ID,
  changeEditorState,
  setTempClip,
  SET_TEMPCLIP,
  CLEAR_CLIPBOARD,
  EDITOR_STATE_RESET,
  resetEditorState,
  clearTempClip,
  commitBlock,
  changeFetchState,
  CHANGE_FETCH_STATE,
  changeStyleType,
  changeBlockStyleType,
  CHANGE_STYLE_TYPE,
  clearModifyData,
  CLEAR_MODIFYDATA,
  initBlockState,
  initBlock,
  resetBlock,
  RESET_BLOCK,
  INIT_BLOCK_STATE,
  updateBlock,
  updateBlockData,
  UPDATE_BLOCK,
  replaceModifyData,
  changeBlockContents,
  CHANGE_BLOCK_CONTENTS,
  createModifyData,
  createTempData,
  
} from "./utils";

function initBlockStateHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initBlockState>
): BlockState {
  const { blockList, modifyData } = initBlock(payload);

  return updateObject<BlockState, BlockStateProps>(state, 
    updateObject<BlockState, BlockStateProps>(initialBlockState, {
      blockList: blockList,
      modifyData,
      isFetch: modifyData[0]? true : false
    })
  );
}

function resetBlockHandler(
  state: BlockState,
  action: ReturnType<typeof resetBlock>
): BlockState {
  return initialBlockState;
}

function changeEditingIdHandler(
  state: BlockState, 
  { payload }: ReturnType<typeof changeEditingId>
): BlockState {
  if(typeof payload === "string") {
    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId: payload
    });
  } else if(payload === undefined) {
    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId: null
    });
  } else {
    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId: state.blockList[payload]? state.blockList[payload].id : null
    });
  }
}

function editBlockHandler(
  state: BlockState, 
  { payload: { blockId, blockIndex, contents } }: ReturnType<typeof editBlock>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    stage: addToStage(state.stage, blockId, blockIndex, contents)
  });
}

function commitBlockHandler(
  state: BlockState,
  action: ReturnType<typeof commitBlock>
): BlockState {
  if(!state.stage[0]) return state;

  const { blockList, modifyData, tempData } = updateBlockContents(state.blockList, state.stage);

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stage: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempBack: tempDataPush(state.tempBack, tempData),
    isFetch: true
  });
}

function changeBlockContentsHandler(
  state: BlockState,
  { payload: { index, contents } }: ReturnType<typeof changeBlockContents>
) {
  const blockList = state.blockList.concat();
  const tempBack = {
    update: [
      createTempData(blockList[index].id, {
        contents: blockList[index].contents.concat()
      })
    ]
  };
  const modifyData = [createModifyData("update", "block", blockList[index].id, {
    contents: contents
  })];

  blockList[index].contents = contents;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    tempBack: tempDataPush(state.tempBack, tempBack),
    modifyData: updateModifyData(state.modifyData, modifyData)
  })
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
    tempFront: [],
    isFetch: true
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
    modifyData: updateModifyData(state.modifyData, modifyData),
    isFetch: true
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
    tempBack: tempDataPush(state.tempBack, result.tempData),
    isFetch: true
  });
}

function switchBlockHandler(
  state: BlockState, 
  { payload: { 
    changedBlockIdList, container 
  } }: ReturnType<typeof switchBlock>
): BlockState {
  if(!state.targetPosition) return state;

  const result = switchBlockList(state.blockList, changedBlockIdList, state.targetPosition, container);
  
  if(!result) return updateObject<BlockState, BlockStateProps>(state, {
    tempClipData: [],
    isGrab: false,
    isHoldingDown: false,
  });

  const { blockList, tempData, modifyData } = result;

  return updateObject<BlockState, BlockStateProps>(state, {
    isGrab: false,
    isHoldingDown: false,
    editingBlockId: state.blockList[state.tempClipData[0]].id,
    blockList,
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempFront: [],
    tempBack: tempDataPush(state.tempBack, tempData),
    tempClipData: [],
    isFetch: true
  });
}

function revertBlockHandler(
  state: BlockState,
  { back }: ReturnType<typeof revertBlock>
): BlockState {
  if(back && state.tempBack[0]) {
    const length = state.tempBack.length - 1;
    const { blockList, tempData, modifyData } = restoreBlock(state.blockList, state.tempBack[length]);
    const tempBack = state.tempBack.concat();
    tempBack.pop();

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      tempBack,
      tempFront: tempDataPush(state.tempFront, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: true
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
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: true
    });

  } else {
    return state;
  }

}

function changeEditorStateHandler(
  state: BlockState, { 
    payload: { isGrab, isHoldingDown, isCliping } 
  }: ReturnType<typeof changeEditorState>
): BlockState {

  return updateObject<BlockState, BlockStateProps>(state, {
    isGrab: isGrab !== undefined? isGrab : state.isGrab,
    isCliping: isCliping !== undefined? isCliping : state.isCliping,
    isHoldingDown: isHoldingDown !== undefined? isHoldingDown : state.isHoldingDown
  });
}

function changeTargetPositionHandler(
  state: BlockState,
  { payload: { targetPosition } }: ReturnType<typeof changeTargetPosition>
): BlockState {

  return updateObject<BlockState, BlockStateProps>(state, {
    targetPosition: targetPosition? targetPosition : null
  });
}

function setTempClipHandler(
  state: BlockState,
  { payload }: ReturnType<typeof setTempClip>
): BlockState {

  // if(state.tempClipData[0]) {
  //   const length = state.tempClipData.length;
  //   let tempClipData = state.tempClipData.concat();

  //   if(length > 1 && tempClipData[length - 2] === payload) {
  //     tempClipData.pop();
  //   } else {
  //     if(tempClipData[length - 1] !== payload) tempClipData.push(payload);
  //   }

  //   return updateObject<BlockState, BlockStateProps>(state, {
  //     tempClipData
  //   });
  // } else {
  //   return updateObject<BlockState, BlockStateProps>(state, {
  //     tempClipData: [payload]
  //   });

  // }

  return updateObject<BlockState, BlockStateProps>(state, {
    tempClipData: state.tempClipData.concat(payload)
  })
}

function clearTempClipDataHandler(
  state: BlockState, 
  action: ReturnType<typeof clearTempClip>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    tempClipData: []
  });
}

function editorStateResetHandler(
  state: BlockState, 
  { payload }: ReturnType<typeof resetEditorState>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    isCliping: payload? false : state.isCliping,
    isHoldingDown: false,
    isGrab: false,
    tempClipData: [],
    targetPosition: null
  });
}

function changeFetchStateHandler(
  state: BlockState,
  { payload }: ReturnType<typeof changeFetchState>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    isFetch: payload? true : false
  });
}

function changeStyleTypeHandler(
  state: BlockState, 
  { payload: {
    blockInfo, styleType
  }}: ReturnType<typeof changeStyleType>
): BlockState {
  const result = changeBlockStyleType(state.blockList, blockInfo, styleType);

  if(!result) {
    return state;
  } else {
    const { blockList, modifyData, tempData } = result;

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      tempBack: tempDataPush(state.tempBack, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData)
    })
  }
}

function clearModifyDataHandler(
  state: BlockState,
  action: ReturnType<typeof clearModifyData>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    modifyData: []
  });
}

function updateBlockHandler(
  state: BlockState,
  { payload }: ReturnType<typeof updateBlock>
) {
  const { blockList, tempData, modifyData } = updateBlockData(state.blockList, payload);
  
  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: modifyData[0]? 
      updateModifyData(replaceModifyData(state.modifyData, payload), modifyData) 
      : replaceModifyData(state.modifyData, payload)
  });
}

const blockHandlers: ActionHandlers<BlockState> = {
  [INIT_BLOCK_STATE]       : initBlockStateHandler,
  [RESET_BLOCK]            : resetBlockHandler,
  [CHANGE_EDITING_ID]      : changeEditingIdHandler,
  [EDIT_BLOCK]             : editBlockHandler,
  [COMMIT_BLOCK]           : commitBlockHandler,
  [CHANGE_BLOCK_CONTENTS]  : changeBlockContentsHandler,
  [ADD_BLOCK]              : addBlockHandler,
  [DELETE_BLOCK]           : deleteBlockHandler,
  [CHANGE_TEXT_STYLE]      : changeTextStyleHandler,
  [SWITCH_BLOCK]           : switchBlockHandler,
  [REVERT_BLOCK]           : revertBlockHandler,
  [CHANGE_EDITOR_STATE]    : changeEditorStateHandler,
  [CHANGE_TARGET_POSITION] : changeTargetPositionHandler,
  [SET_TEMPCLIP]           : setTempClipHandler,
  [CLEAR_CLIPBOARD]        : clearTempClipDataHandler,
  [EDITOR_STATE_RESET]     : editorStateResetHandler,
  [CHANGE_FETCH_STATE]     : changeFetchStateHandler,
  [CHANGE_STYLE_TYPE]      : changeStyleTypeHandler,
  [CLEAR_MODIFYDATA]       : clearModifyDataHandler,
  [UPDATE_BLOCK]           : updateBlockHandler
};

export default blockHandlers;