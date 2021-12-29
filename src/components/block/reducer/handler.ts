import { initialBlockState } from ".";
import { ActionHandlers, updateObject } from "../../../store/utils";
import { BlockData, BlockDataProps, ModifyBlockData } from "../types";
import { 
  BlockState, 
  createBlockData,
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
  replaceModifyBlockData,
  changeBlockContents,
  CHANGE_BLOCK_CONTENTS,
  createModifyData,
  createTempData,
  deleteTextBlock,
  DELETE_TEXT_BLOCK,
  removeTextBlockInList,
  clearNextBlockInfo,
  setNextBlockInfo,
  CLEAR_NEXTBLOCKINFO,
  SET_NEXTBLOCKINFO,
  addTextBlock,
  sliceTextContents,
  parseHtmlContents,
  ADD_TEXT_BLOCK,
  TempDataType,
  initPageTitle,
  createPageTitleBlockData,
  editPageTitle,
  INIT_PAGE_TITLE,
  EDIT_PAGE_TITLE,
  revertBlockState,
  clearStateItem,
  CLEAR_STATE_ITEM
} from "./utils";

function initBlockStateHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initBlockState>
): BlockState {
  const { blockList, modifyData } = initBlock(payload);

  return updateObject<BlockState, BlockStateProps>(state, 
    updateObject<BlockState, BlockStateProps>(initialBlockState, {
      blockList: blockList,
      modifyData: updateModifyData(state.modifyData, modifyData),
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

    if(payload > 0) {
      return updateObject<BlockState, BlockStateProps>(state, {
        editingBlockId: state.blockList[payload]? state.blockList[payload].id : null
      });
    } else {
      return updateObject<BlockState, BlockStateProps>(state, {
        editingBlockId: "title"
      });
    }
    
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

// 원래 isFetch true
function commitBlockHandler(
  state: BlockState,
  action: ReturnType<typeof commitBlock>
): BlockState {
  if(!state.stage[0]) return state;

  const { blockList, modifyData, tempData } = updateBlockContents(state.blockList, state.stage);
  
  tempData.editingBlockId = state.editingBlockId;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stage: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempBack: tempDataPush(state.tempBack, tempData),
    isFetch: false
  });
}

function changeBlockContentsHandler(
  state: BlockState,
  { payload: { index, contents } }: ReturnType<typeof changeBlockContents>
): BlockState {
  const blockList = state.blockList.concat();
  const tempBack: TempDataType = {
    editingBlockId: state.editingBlockId,
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
    payload: { addBlockList, targetPosition, nextEditInfo, currentBlockPosition } 
  }: ReturnType<typeof addBlock>
): BlockState {
  const { blockList, modifyData, tempData } = addBlockInList(state.blockList, addBlockList, targetPosition, currentBlockPosition);

  tempData.editingBlockId = state.editingBlockId;

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
    isFetch: false
  });
}

function addTextBlockHandler(
  state: BlockState, 
  { payload: {
    index, innerHTML, cursorStart, cursorEnd, type, styleType
  } }: ReturnType<typeof addTextBlock>
): BlockState {  
  const [ front, back ] = sliceTextContents(parseHtmlContents(innerHTML), cursorStart, cursorEnd);
  const block = state.blockList[index];

  const blockContents = block.contents.concat();

  block.contents = front;

  const stage = state.stage[0]? 
    state.stage.filter(data => data.id !== block.id) 
    : [];

  const newBlock = createBlockData({
    position: block.position,
    type: type? type : block.type,
    styleType: styleType? styleType : block.styleType,
    contents: back
  });

  const { blockList, tempData, modifyData } = addBlockInList(state.blockList, [newBlock], newBlock.position);

  tempData.editingBlockId = state.editingBlockId;

  const findIndex = tempData.update.findIndex(data => data.blockId === block.id);
  
  if(findIndex !== -1) {
    tempData.update[findIndex].payload = updateObject(tempData.update[findIndex].payload, {
      contents: blockContents
    });
  } else {
    tempData.update.push(createTempData(block.id, {
      contents: blockContents
    }));
  }

  modifyData.push(createModifyData("update", "block", block.id, {
    contents: front
  }));

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stage: stage,
    editingBlockId: newBlock.id,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData),
    isFetch: false
  });
}

function deleteBlockHandler(
  state: BlockState,
  { payload: { removedBlockList, nextEditInfo } }: ReturnType<typeof deleteBlock>
): BlockState {
  if(!state.blockList[1]) {
    console.log("block이 하나 입니다.");

    return state;
  }

  const { blockList, modifyData, tempData } = removeBlockInList(state.blockList, removedBlockList);

  tempData.editingBlockId = state.editingBlockId;

  const editingBlockId: string | null = nextEditInfo !== undefined? 
    typeof nextEditInfo === "string"? 
    nextEditInfo 
    : blockList[nextEditInfo].id
    : null;

  const removeBlockIdList = removedBlockList.map(block => block.id);


  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId,
    stage: state.stage? state.stage.filter(data => !removeBlockIdList.includes(data.id)) : [],
    tempBack: tempDataPush(state.tempBack, tempData),
    tempFront: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    isFetch: false
  });
}

function deleteTextBlockHandler(
  state: BlockState,
  { payload: {
    index,
    innerHTML,
    textLength
  } }: ReturnType<typeof deleteTextBlock>
): BlockState {
  if(!state.blockList[1]) {
    return state;
  }

  const toBeDeletedBlock: BlockData = updateObject<BlockData, ModifyBlockData>(state.blockList[index], {});
  const editingBlockId: string = index? state.blockList[index - 1].id : state.blockList[0].id;

  if(innerHTML) {
    if(index === 0) return state;

    const result = removeTextBlockInList(state.blockList, index, index - 1, innerHTML);
    
    if(!result) return state;

    const { blockList, tempData, modifyData } = result;

    const stage = state.stage[0]?  
      state.stage.filter(data => data.id !== toBeDeletedBlock.id) 
      : [];

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      editingBlockId,
      nextBlockInfo: {
        type: "text",
        payload: ["delete", textLength]
      },
      tempBack: tempDataPush(state.tempBack, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData),
      tempFront: [],
      stage,
      isFetch: false
    });

  } else if(!innerHTML) {

    const { 
      blockList,  
      tempData,
      modifyData
    } = removeBlockInList(state.blockList.concat(), [state.blockList[index]]);

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      editingBlockId,
      tempBack: tempDataPush(state.tempBack, tempData),
      tempFront: [],
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: false
    });

  } else {
    return state;
  }
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

  result.tempData.editingBlockId = state.editingBlockId;

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

  tempData.editingBlockId = state.editingBlockId;

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
  { front }: ReturnType<typeof revertBlock>
): BlockState {
  return revertBlockState(state, front);
}

function changeEditorStateHandler(
  state: BlockState, { 
    payload: { type, toggle } 
  }: ReturnType<typeof changeEditorState>
): BlockState {

  return updateObject<BlockState, BlockStateProps>(state, {
    [type]: toggle
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
    isPress: false,
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
    
    tempData.editingBlockId = state.editingBlockId;

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      isFetch: true,
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
): BlockState {

  const { blockList, tempData, modifyData } = updateBlockData(state.blockList, payload);

  tempData.editingBlockId = state.editingBlockId;

  const updatedBlockIdList = [];

  if(payload.create) payload.create.map(data => updatedBlockIdList.push(data.blockId));

  if(payload.update) payload.update.map(data => updatedBlockIdList.push(data.blockId));

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    updatedBlockIdList,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: modifyData[0]? 
      updateModifyData(replaceModifyBlockData(state.modifyData, payload), modifyData) 
      : replaceModifyBlockData(state.modifyData, payload)
  });
}

function clearNextBlockInfoHandler(
  state: BlockState,
  action: ReturnType<typeof clearNextBlockInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    nextBlockInfo: null
  });
}

function setNextBlockInfoHandler(
  state: BlockState,
  { payload }: ReturnType<typeof setNextBlockInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    nextBlockInfo: payload
  });
}

function initPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initPageTitle>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    titleBlock: createPageTitleBlockData(payload)
  });
}

function editPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof editPageTitle>
): BlockState {
  if(!state.titleBlock) return state;
  const pageTitle: string = state.titleBlock.contents;

  return updateObject<BlockState, BlockStateProps>(state, {
    titleBlock: updateObject<BlockData, BlockDataProps<string, string>>(state.titleBlock, {
      contents: payload
    }),
    tempBack: tempDataPush(state.tempBack, { pageTitle })
  });
}

function clearStateItemHandler(
  state: BlockState,
  { payload }: ReturnType<typeof clearStateItem>
): BlockState {
  if(initialBlockState.hasOwnProperty(payload)) {
    return updateObject<BlockState, BlockDataProps>(state, { [payload]: initialBlockState[payload] }) 
  } else {
    return state;
  }
}

const blockHandlers: ActionHandlers<BlockState> = {
  [INIT_BLOCK_STATE]       : initBlockStateHandler,
  [RESET_BLOCK]            : resetBlockHandler,
  [CHANGE_EDITING_ID]      : changeEditingIdHandler,
  [EDIT_BLOCK]             : editBlockHandler,
  [COMMIT_BLOCK]           : commitBlockHandler,
  [CHANGE_BLOCK_CONTENTS]  : changeBlockContentsHandler,
  [ADD_BLOCK]              : addBlockHandler,
  [ADD_TEXT_BLOCK]         : addTextBlockHandler,
  [DELETE_BLOCK]           : deleteBlockHandler,
  [DELETE_TEXT_BLOCK]      : deleteTextBlockHandler,
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
  [UPDATE_BLOCK]           : updateBlockHandler,
  [CLEAR_NEXTBLOCKINFO]    : clearNextBlockInfoHandler,
  [SET_NEXTBLOCKINFO]      : setNextBlockInfoHandler,
  [INIT_PAGE_TITLE]        : initPageTitleHandler,
  [EDIT_PAGE_TITLE]        : editPageTitleHandler,
  [CLEAR_STATE_ITEM]       : clearStateItemHandler
};

export default blockHandlers;