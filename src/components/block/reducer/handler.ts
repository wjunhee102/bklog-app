import { initialBlockState } from ".";
import { BlockData, ModifyPageInfoType } from "../types";
import { modifyAnObject, updateObject } from "../utils";
import { 
  BlockState, 
  ActionHandlers, 
  createClearStatePart, 
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
  revertBlock,
  COMMIT_TEXT_BLOCK, 
  ADD_BLOCK, 
  ADD_TITLE_BLOCK,
  DELETE_BLOCK,
  SWITCH_BLOCK,
  CHANGE_TEXT_STYLE,
  REVERT_BLOCK,
  CHANGE_EDITOR_STATE,
  EDIT_TEXT_BLOCK,
  CHANGE_TARGET_POSITION,
  addToStage,
  editTextBlock,
  changeTargetPosition,
  changeEditingId,
  CHANGE_EDITING_ID,
  changeEditorState,
  setTempClip,
  SET_TEMPCLIP,
  EDITOR_STATE_RESET,
  resetEditorState,
  commitTextBlock,
  changeFetchState,
  CHANGE_FETCH_STATE,
  changeStyleType,
  changeBlockStyleType,
  CHANGE_STYLE_TYPE,
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
  addTextBlock,
  sliceTextContents,
  parseHtmlContents,
  ADD_TEXT_BLOCK,
  TempDataType,
  initPageTitle,
  editPageTitle,
  INIT_PAGE_TITLE,
  EDIT_PAGE_TITLE,
  revertBlockState,
  clearStateItem,
  CLEAR_STATE_ITEM,
  editPageInfo,
  EDIT_PAGE_INFO,
  commitPage,
  StagedPage,
  COMMIT_PAGE,
  PageInfo,
  SET_PREBLOCKINFO,
  setPreBlockInfo,
  changeBlockType,
  changeBlockDataType,
  CHANGE_BLOCK_TYPE,
  addTitleBlock,
  sliceText,
  deleteTitleBlock,
  TextContentsTypeList,
  DELETE_TITLE_BLOCK,
  editBlock,
  updateBlockDataProps,
  EDIT_BLOCK,
  editBlockSideInfo,
  BlockSideInfoGroup,
  EDIT_BLOCK_SIDE_INFO
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

function initPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initPageTitle>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    pageInfo: {
      title: payload
    }
  });
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
  let editingBlockId: string | null;

  if(typeof payload === "string") {
      editingBlockId = payload;
  } else if(typeof payload === "number") {
    if(payload >= 0) {
      editingBlockId = state.blockList[payload]? state.blockList[payload].id : null;
    } else {
      editingBlockId = "title";
    }
  } else {
    editingBlockId = null;
  }

  return updateObject<BlockState, BlockStateProps>(state, {
    editingBlockId
  })
}

function editTextBlockHandler(
  state: BlockState, 
  { payload: { blockId, blockIndex, contents } }: ReturnType<typeof editTextBlock>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    stageBlock: addToStage(state.stageBlock, blockId, blockIndex, contents)
  });
}

function editPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof editPageTitle>
): BlockState { 
  const stagePage: StagedPage | null = state.stagePage? 
    updateObject<StagedPage, StagedPage>(state.stagePage, { title: payload })
    : { title: payload };

  return updateObject<BlockState, BlockStateProps>(state, {
    stagePage
  });
}

function editBlockHandler(
  state: BlockState,
  { payload: {
    blockInfo, blockDataProps
  } }: ReturnType<typeof editBlock>
): BlockState {
  const result = updateBlockDataProps(state.blockList, blockInfo, blockDataProps);

  if(!result) return state;

  const { blockList, modifyData, tempData } = result;

  tempData.editingBlockId = state.editingBlockId;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    isFetch: true,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData)
  });
}

function editPageInfoHandler(
  state: BlockState,
  { payload }: ReturnType<typeof editPageInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    stagePage: payload
  });
}

// 원래 isFetch true
function commitTextBlockHandler(
  state: BlockState,
  action: ReturnType<typeof commitTextBlock>
): BlockState {
  if(!state.stageBlock[0]) return state;

  const { blockList, modifyData, tempData } = updateBlockContents(state.blockList, state.stageBlock);
  
  tempData.editingBlockId = state.editingBlockId;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stageBlock: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    tempBack: tempDataPush(state.tempBack, tempData),
    isFetch: false
  });
}

function commitPageHandler(
  state: BlockState,
  action: ReturnType<typeof commitPage>
): BlockState {
  if(!state.stagePage) return state;

  const pageInfo: PageInfo = state.pageInfo;

  const modifyPageInfo: ModifyPageInfoType | null = state.modifyPageInfo? 
    updateObject<ModifyPageInfoType, StagedPage>(state.modifyPageInfo, state.stagePage)
    : state.stagePage;

  return updateObject<BlockState, BlockStateProps>(state, {
    stagePage: null,
    pageInfo: updateObject<PageInfo, StagedPage>(pageInfo, state.stagePage),
    modifyPageInfo,
    tempBack: tempDataPush(state.tempBack, { pageInfo }),
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

  const stageBlock = state.stageBlock[0]? 
    state.stageBlock.filter(data => data.id !== block.id) 
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
    stageBlock,
    editingBlockId: newBlock.id,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData),
    isFetch: false
  });
}

function addTitleBlockHandler(
  state: BlockState,
  { 
    payload: {
      text, cursorStart, cursorEnd
  }}: ReturnType<typeof addTitleBlock>
): BlockState {
  const [ front, end ] = sliceText(text, cursorStart, cursorEnd);

  const title: string = front;

  const newBlock = createBlockData({
    position: "1",
    type: "text",
    styleType: "bk-p",
    contents: [[end]]
  })

  const { blockList, tempData, modifyData } = addBlockInList(state.blockList, [newBlock], "1", false);

  tempData.editingBlockId = "title";
  tempData.pageInfo = state.pageInfo;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    pageInfo: updateObject<PageInfo, PageInfo>(state.pageInfo, {
      title
    }),
    stagePage: null,
    editingBlockId: newBlock.id,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData),
    modifyPageInfo: {
      title
    },
    isFetch: false
  })
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

  let editingBlockId: string | null;

  if(typeof nextEditInfo === "string") {
    editingBlockId = nextEditInfo;
  } else if(typeof nextEditInfo === "number") {
    editingBlockId = blockList[nextEditInfo]? blockList[nextEditInfo].id : "title"
  } else {
    editingBlockId = null;
  }

  const removeBlockIdList = removedBlockList.map(block => block.id);


  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId,
    stageBlock: state.stageBlock? state.stageBlock.filter(data => !removeBlockIdList.includes(data.id)) : [],
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

  const toBeDeletedBlock: BlockData = updateObject<BlockData>(state.blockList[index]);
  const editingBlockId: string = index? state.blockList[index - 1].id : state.blockList[0].id;

  const stageBlock = state.stageBlock[0]?  
      state.stageBlock.filter(data => data.id !== toBeDeletedBlock.id) 
      : [];

  if(innerHTML) {
    if(index === 0) return state;

    const result = removeTextBlockInList(state.blockList.concat(), index, index - 1, innerHTML);
    
    if(!result) return state;

    const { blockList, tempData, modifyData } = result;

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      editingBlockId,
      preBlockInfo: {
        type: toBeDeletedBlock.type,
        payload: ["delete", textLength]
      },
      tempBack: tempDataPush(state.tempBack, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData),
      tempFront: [],
      stageBlock,
      isFetch: false
    });

  } else {

    const { 
      blockList,  
      tempData,
      modifyData
    } = removeBlockInList(state.blockList.concat(), [state.blockList[index]]);

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      editingBlockId,
      stageBlock,
      tempBack: tempDataPush(state.tempBack, tempData),
      tempFront: [],
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: false
    });

  }
}

function deleteTitleBlockHandler(
  state: BlockState,
  { payload }: ReturnType<typeof deleteTitleBlock>
): BlockState {
  if(!state.blockList[1]) {
    return state;
  }

  const toBeDeletedBlock: BlockData = updateObject(state.blockList[0]);
  const stageBlock = state.stageBlock[0]?  
      state.stageBlock.filter(data => data.id !== toBeDeletedBlock.id) 
      : [];
  
  let pageInfo = state.pageInfo;
  let modifyPageInfo = state.modifyPageInfo;
  let preBlockInfo = state.preBlockInfo;

  const { 
    blockList,  
    tempData,
    modifyData
  } = removeBlockInList(state.blockList.concat(), [state.blockList[0]]);

  tempData.editingBlockId = toBeDeletedBlock.id;

  if(payload) {
    if(!TextContentsTypeList.includes(toBeDeletedBlock.type)) return state;
    tempData.pageInfo = state.pageInfo;

    pageInfo = updateObject<PageInfo, PageInfo>(state.pageInfo, {
      title: `${state.pageInfo.title? state.pageInfo.title : ""}${payload}`
    });

    modifyPageInfo = state.modifyPageInfo? 
      updateObject<ModifyPageInfoType, PageInfo>(state.modifyPageInfo, pageInfo) 
      : pageInfo;

    preBlockInfo = {
      type: toBeDeletedBlock.type,
      payload: ["delete", payload.length]
    }
  }
  console.log(tempData);
  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId: "title",
    pageInfo,
    stageBlock,
    preBlockInfo,
    stagePage: null,
    tempBack: tempDataPush(state.tempBack, tempData),
    tempFront: [],
    modifyData: updateModifyData(state.modifyData, modifyData),
    modifyPageInfo,
    isFetch: false
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

  if(!result) return state;

  const { blockList, modifyData, tempData } = result;
  
  tempData.editingBlockId = state.editingBlockId;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    isFetch: true,
    tempBack: tempDataPush(state.tempBack, tempData),
    modifyData: updateModifyData(state.modifyData, modifyData)
  });
}


function changeBlockTypeHandler(
  state: BlockState,
  { payload: {
    blockInfo, type
  }}: ReturnType<typeof changeBlockType>
): BlockState {
  const result = changeBlockDataType(state.blockList, blockInfo, type);

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


function setPreBlockInfoHandler(
  state: BlockState,
  { payload }: ReturnType<typeof setPreBlockInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    preBlockInfo: payload
  });
}

function clearStateItemHandler(
  state: BlockState,
  { payload }: ReturnType<typeof clearStateItem>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, createClearStatePart<BlockStateProps>(initialBlockState, payload));
}

function editBlockSideInfoHandler(
  state: BlockState,
  { payload: {
    blockId,
    info
  } }: ReturnType<typeof editBlockSideInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    blockSideInfoGroup: modifyAnObject(state.blockSideInfoGroup, { [blockId]: info })
  });
}

const blockHandlers: ActionHandlers<BlockState> = {
  [INIT_BLOCK_STATE]       : initBlockStateHandler,
  [INIT_PAGE_TITLE]        : initPageTitleHandler,
  [RESET_BLOCK]            : resetBlockHandler,
  [CHANGE_EDITING_ID]      : changeEditingIdHandler,
  [EDIT_BLOCK]             : editBlockHandler,
  [EDIT_TEXT_BLOCK]        : editTextBlockHandler,
  [EDIT_PAGE_TITLE]        : editPageTitleHandler,
  [COMMIT_TEXT_BLOCK]      : commitTextBlockHandler,
  [COMMIT_PAGE]            : commitPageHandler,
  [CHANGE_BLOCK_CONTENTS]  : changeBlockContentsHandler,
  [ADD_BLOCK]              : addBlockHandler,
  [ADD_TEXT_BLOCK]         : addTextBlockHandler,
  [ADD_TITLE_BLOCK]        : addTitleBlockHandler,
  [DELETE_BLOCK]           : deleteBlockHandler,
  [DELETE_TEXT_BLOCK]      : deleteTextBlockHandler,
  [DELETE_TITLE_BLOCK]     : deleteTitleBlockHandler,
  [CHANGE_TEXT_STYLE]      : changeTextStyleHandler,
  [SWITCH_BLOCK]           : switchBlockHandler,
  [REVERT_BLOCK]           : revertBlockHandler,
  [CHANGE_EDITOR_STATE]    : changeEditorStateHandler,
  [CHANGE_TARGET_POSITION] : changeTargetPositionHandler,
  [SET_TEMPCLIP]           : setTempClipHandler,
  [EDITOR_STATE_RESET]     : editorStateResetHandler,
  [CHANGE_FETCH_STATE]     : changeFetchStateHandler,
  [CHANGE_STYLE_TYPE]      : changeStyleTypeHandler,
  [CHANGE_BLOCK_TYPE]      : changeBlockTypeHandler,
  [UPDATE_BLOCK]           : updateBlockHandler,
  [SET_PREBLOCKINFO]       : setPreBlockInfoHandler,
  [CLEAR_STATE_ITEM]       : clearStateItemHandler,
  [EDIT_PAGE_INFO]         : editPageInfoHandler,
  [EDIT_BLOCK_SIDE_INFO]   : editBlockSideInfoHandler
};

export default blockHandlers;