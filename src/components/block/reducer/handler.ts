import { initialBlockState } from ".";
import { Block } from "../entities/block/abstract/Block";
import { BaseTextBlock } from "../entities/block/text/BaseTextBlock";
import { TextBlock } from "../entities/block/text/TextBlock";
import { sliceText, sliceTextContents } from "../entities/block/text/utils";
import { StagedBlockData, TextGenericType, UnionBlock, UnionTextBlock } from "../entities/block/type";
import { HistoryBlockToken } from "../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../entities/modify/block/ModifyBlockToken";
import { ModifyPageDataToken } from "../entities/modify/page/ ModifyPageDataToken";
import { BlockService } from "../service/block/BlockService";
import { HistoryBlockService } from "../service/modify/block/HistoryBlockService";
import { ModifyBlockService } from "../service/modify/block/ModifyBlockService";
import { ModifyPageService } from "../service/modify/page/ModifyPageService";
import { HistoryBlockData } from "../service/modify/type";
import { arrayPush, updateObject } from "../utils";
import { 
  BlockState, 
  ActionHandlers, 
  createClearStatePart, 
  addBlock, 
  deleteBlock,
  changeTextStyle,
  switchBlock,
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
  CHANGE_STYLE_TYPE,
  initBlockState,
  resetBlock,
  RESET_BLOCK,
  INIT_BLOCK_STATE,
  updateBlock,
  UPDATE_BLOCK,
  changeBlockContents,
  CHANGE_BLOCK_CONTENTS,
  deleteTextBlock,
  DELETE_TEXT_BLOCK,
  addTextBlock,
  ADD_TEXT_BLOCK,
  initPageTitle,
  editPageTitle,
  INIT_PAGE_TITLE,
  EDIT_PAGE_TITLE,
  clearStateItem,
  CLEAR_STATE_ITEM,
  editPageInfo,
  EDIT_PAGE_INFO,
  commitPage,
  COMMIT_PAGE,
  SET_PREBLOCKINFO,
  setPreBlockInfo,
  changeBlockType,
  CHANGE_BLOCK_TYPE,
  addTitleBlock,
  deleteTitleBlock,
  DELETE_TITLE_BLOCK,
  editBlock,
  EDIT_BLOCK,
  revertBlockState
} from "./utils";

function initBlockStateHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initBlockState>
): BlockState {
  const [ blockDataList, initModifyDataTokenList ] = BlockService.createBlockDataList(payload);

  if(!blockDataList) return updateObject<BlockState, BlockStateProps>(state, {
    modifyBlockTokenList: [...initModifyDataTokenList],
    isFetch: true
  });

  const initialBlockList = BlockService.createBlockList(blockDataList);

  if(!initialBlockList[0]) return updateObject<BlockState, BlockStateProps>(state, {
    modifyBlockTokenList: [...initModifyDataTokenList],
    isFetch: true
  });

  const {
    blockList,
    modifyBlockTokenList
  } = new BlockService(initialBlockList).sort().ordering().getData();

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    modifyBlockTokenList: [...initModifyDataTokenList, ...modifyBlockTokenList],
    isFetch: (modifyBlockTokenList[0] || initModifyDataTokenList[0])? true : false
  });
}

function initPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof initPageTitle>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    pageTitle: payload
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
    stagedTextBlockData: {
      id: blockId,
      index: blockIndex,
      contents
    } 
  });
}

function editPageTitleHandler(
  state: BlockState,
  { payload }: ReturnType<typeof editPageTitle>
): BlockState { 
  return updateObject<BlockState, BlockStateProps>(state, {
    stagedPageTitle: payload
  });
}

function editBlockHandler(
  state: BlockState,
  { payload: {
    blockInfo, blockDataProps
  } }: ReturnType<typeof editBlock>
): BlockState {
  // const result = updateBlockDataProps(state.blockList, blockInfo, blockDataProps);

  // if(!result) return state;

  // const { blockList, modifyData, tempData } = result;

  // tempData.editingBlockId = state.editingBlockId;

  // return updateObject<BlockState, BlockStateProps>(state, {
  //   blockList,
  //   isFetch: true,
  //   tempBack: tempDataPush(state.tempBack, tempData),
  //   modifyData: updateModifyData(state.modifyData, modifyData)
  // });
  return state;
}

function editPageInfoHandler(
  state: BlockState,
  { payload }: ReturnType<typeof editPageInfo>
): BlockState {
  return updateObject<BlockState, BlockStateProps>(state, {
    stagedPageTitle: payload
  });
}

// 원래 isFetch true
function commitTextBlockHandler(
  state: BlockState,
  action: ReturnType<typeof commitTextBlock>
): BlockState {
  if(!state.stagedBlockDataList[0] && !state.stagedTextBlockData) return state;
  const stagedBlockDataList = state.stagedBlockDataList.concat();

  if(state.stagedTextBlockData) {
    const { id, index, contents } = state.stagedTextBlockData;

    stagedBlockDataList.push({
      id,
      index,
      contents: BaseTextBlock.parseHtmlContents(contents)
    } as StagedBlockData<TextGenericType>);
  }

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).updateBlockListStagedProperty(stagedBlockDataList).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();
  
  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stagedTextBlockData: null,
    stagedBlockDataList: [],
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    isFetch: false
  });
}

function commitPageHandler(
  state: BlockState,
  action: ReturnType<typeof commitPage>
): BlockState {
  if(!state.stagedPageTitle) return state;

  const pageTitle: string | null = state.pageTitle;


  return updateObject<BlockState, BlockStateProps>(state, {
    stagedPageTitle: null,
    pageTitle: state.stagedPageTitle,
    modifyPageTokenList: [...state.modifyPageTokenList, new ModifyPageDataToken(ModifyPageService.setUpdateModifyData({
      title: state.stagedPageTitle
    }))],
    historyBack: arrayPush(state.historyBack, {
      pageTitle
    }),
    isFetch: false
  });
}

function changeBlockContentsHandler(
  state: BlockState,
  { payload: { index, contents } }: ReturnType<typeof changeBlockContents>
): BlockState {

  const stagedBlockData: StagedBlockData = {
    id: state.blockList[index].id,
    index,
    contents
  }

  const stagedBlockDataList = [...state.stagedBlockDataList, stagedBlockData];

  if(state.stagedTextBlockData) {
    const { id, index, contents } = state.stagedTextBlockData;

    stagedBlockDataList.push({
      id,
      index,
      contents: BaseTextBlock.parseHtmlContents(contents)
    } as StagedBlockData<TextGenericType>);
  }

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).updateBlockListStagedProperty(stagedBlockDataList).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    stagedBlockDataList: [],
    stagedTextBlockData: null
  });
}

function addBlockHandler(
  state: BlockState, 
  { 
    payload: { addBlockList, targetPosition, nextEditInfo, keepCurrentBlockPosition } 
  }: ReturnType<typeof addBlock>
): BlockState {
  
  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList,
  } = new BlockService(state.blockList)
        .addBlockInList(addBlockList, targetPosition, keepCurrentBlockPosition)
        .getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;

  const editingBlockId: string | null = nextEditInfo !== undefined? 
    typeof nextEditInfo === "string"? 
    nextEditInfo 
    : blockList[nextEditInfo].id
    : null;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId,
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    isFetch: false
  });
}

function addTextBlockHandler(
  state: BlockState, 
  { payload: {
    index, innerHTML, cursorStart, cursorEnd, type, styleType
  } }: ReturnType<typeof addTextBlock>
): BlockState {  
  if(state.blockList[index] instanceof BaseTextBlock === false) return state;

  const targetBlock: UnionTextBlock  = state.blockList[index] as UnionTextBlock;

  const [ front, back ] = sliceTextContents(BaseTextBlock.parseHtmlContents(innerHTML), cursorStart, cursorEnd);

  const [ newTargetBlock , preProps ] = targetBlock.regeneration({ contents: front });

  const historyBlockToken = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(targetBlock.id, targetBlock.type, preProps));
  const modifyBlockToken = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newTargetBlock.id, newTargetBlock.type, {
    contents: front
  }));

  const newBlockData = Block.createBlockData(type? type : targetBlock.type, {
    type: type? type : targetBlock.type,
    position: targetBlock.position,
    styleType: styleType? styleType : targetBlock.styleType,
    contents: back
  });

  if(!newBlockData) return state;

  const newBlock = BlockService.createBlock(newBlockData);

  if(!newBlock) return state;

  state.blockList[index] = newTargetBlock;

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).addBlockInList([ newBlock ], newBlock.position).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).push(historyBlockToken).getData();

  if(!historyBlockData) return state;

  const stagedBlockDataList = state.stagedBlockDataList[0]? 
    state.stagedBlockDataList.filter(data => data.id !== targetBlock.id) : [];
  
  const stagedTextBlockData = (state.stagedTextBlockData && state.stagedTextBlockData.id === targetBlock.id)?
    null 
    : state.stagedTextBlockData;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    stagedBlockDataList,
    stagedTextBlockData,
    editingBlockId: newBlock.id,
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    modifyBlockTokenList: [...state.modifyBlockTokenList, modifyBlockToken, ...modifyBlockTokenList],
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

  const pageTitle: string = front;

  const newBlockData = TextBlock.createBlockData({
    position: "1",
    styleType: "bk-p",
    contents: [[end]]
  });

  if(!newBlockData) return state;

  const newBlock = new TextBlock(newBlockData);

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).addBlockInList([ newBlock ], "1", true).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    pageTitle,
    stagedPageTitle: null,
    editingBlockId: newBlock.id,
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      pageTitle: state.pageTitle
    }),
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    modifyPageTokenList: [...state.modifyPageTokenList, new ModifyPageDataToken(ModifyPageService.setUpdateModifyData({
      title: pageTitle
    }))],
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
  
  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).removeBlockInList(removedBlockList).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;
  
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
    stagedTextBlockData: state.stagedTextBlockData && removeBlockIdList.includes(state.stagedTextBlockData.id)? null : state.stagedTextBlockData,
    stagedBlockDataList: state.stagedBlockDataList[0]? state.stagedBlockDataList.filter(data => !removeBlockIdList.includes(data.id)) : [],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
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

  const editingBlockId = state.blockList[index - 1].id;
  const toBeDeletedBlockId = state.blockList[index].id;
  const toBeDeletedBlockType = state.blockList[index].type;
  let newBlockList: UnionBlock[];
  let newModifyBlockTokenList: ModifyBlockToken[];
  let historyBlockData: HistoryBlockData | null;

  if(state.blockList[index - 1] instanceof BaseTextBlock === true && innerHTML) {
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = new BlockService(state.blockList).removeTextBlockInLIst(index, index - 1, innerHTML).getData();

    newBlockList = blockList;
    newModifyBlockTokenList = modifyBlockTokenList;
    historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();
  } else {
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = new BlockService(state.blockList).removeBlockInList([state.blockList[index]]).getData();

    newBlockList = blockList;
    newModifyBlockTokenList = modifyBlockTokenList;
    historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();
  }

  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList: newBlockList,
    editingBlockId,
    preBlockInfo: {
      type: toBeDeletedBlockType,
      payload: ["delete", textLength]
    },
    stagedTextBlockData: state.stagedTextBlockData && toBeDeletedBlockId === state.stagedTextBlockData.id? null : state.stagedTextBlockData,
    stagedBlockDataList: state.stagedBlockDataList[0]? state.stagedBlockDataList.filter(data => toBeDeletedBlockId !== data.id) : [],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...newModifyBlockTokenList],
    isFetch: false
  });
}

function deleteTitleBlockHandler(
  state: BlockState,
  { payload }: ReturnType<typeof deleteTitleBlock>
): BlockState {
  if(!state.blockList[1]) {
    return state;
  }

  const toBeDeletedBlockId = state.blockList[0].id;
  const toBeDeletedBlockType = state.blockList[0].type;
  
  let modifyPageTokenList: ModifyPageDataToken[] = [];
  let preBlockInfo = state.preBlockInfo;
  let pageTitle: string | null = state.pageTitle;

  if(payload && state.blockList[0] instanceof BaseTextBlock === true) {
    const title = `${state.pageTitle? state.pageTitle : ""}${payload}`;

    pageTitle = title;

    modifyPageTokenList = [new ModifyPageDataToken(ModifyPageService.setUpdateModifyData({
      title
    }))];

    preBlockInfo = {
      type: toBeDeletedBlockType,
      payload: ["delete", payload.length]
    }
  }

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).removeBlockInList([state.blockList[0]]).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;


  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    editingBlockId: "title",
    pageTitle,
    stagedTextBlockData: state.stagedTextBlockData && toBeDeletedBlockId === state.stagedTextBlockData.id? null : state.stagedTextBlockData,
    stagedBlockDataList: state.stagedBlockDataList[0]? state.stagedBlockDataList.filter(data => toBeDeletedBlockId !== data.id) : [],
    preBlockInfo,
    stagedPageTitle: null,
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      pageTitle: state.pageTitle,
      ...historyBlockData
    }),
    historyFront: [],
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    modifyPageTokenList: [...state.modifyPageTokenList, ...modifyPageTokenList],
    isFetch: false
  });
}

function changeTextStyleHandler(
  state: BlockState, 
  { payload: { 
    index, styleType, startPoint, endPoint, order 
  } }: ReturnType<typeof changeTextStyle>
): BlockState {

  const stagedBlockDataList = state.stagedBlockDataList.concat();

  if(state.stagedTextBlockData) {
    const { id, index, contents } = state.stagedTextBlockData;

    stagedBlockDataList.push({
      id,
      index,
      contents: BaseTextBlock.parseHtmlContents(contents)
    } as StagedBlockData<TextGenericType>);
  }

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList)
          .updateBlockListStagedProperty(stagedBlockDataList)
          .changeTextBlockStyle(index, styleType, startPoint, endPoint, order)
          .getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();
  
  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    isFetch: true
  });
}

function switchBlockHandler(
  state: BlockState, 
  { payload: { 
    changedBlockIdMap, container 
  } }: ReturnType<typeof switchBlock>
): BlockState {
  if(!state.targetPosition) return state;

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList)
            .switchBlockList(changedBlockIdMap, state.targetPosition, container)
            .getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;

  return updateObject<BlockState, BlockStateProps>(state, {
    isGrab: false,
    isHoldingDown: false,
    editingBlockId: state.blockList[state.tempClipData[0]].id,
    blockList,
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    historyFront: [],
    tempClipData: [],
    isFetch: true
  });
}

function revertBlockHandler(
  state: BlockState,
  { front = false }: ReturnType<typeof revertBlock>
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
  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).changeBlockStyleType(blockInfo, styleType).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;


  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    isFetch: true,
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ... historyBlockData
    }),
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList]
  });
}


function changeBlockTypeHandler(
  state: BlockState,
  { payload: {
    blockInfo, type
  }}: ReturnType<typeof changeBlockType>
): BlockState {

  const stagedBlockDataList = state.stagedBlockDataList.concat();

  if(state.stagedTextBlockData) {
    const { id, index, contents } = state.stagedTextBlockData;

    stagedBlockDataList.push({
      id,
      index,
      contents: BaseTextBlock.parseHtmlContents(contents)
    } as StagedBlockData<TextGenericType>);
  }
    
  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
   } = new BlockService(state.blockList).updateBlockListStagedProperty(stagedBlockDataList).changeBlockType(blockInfo, type).getData();

   const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

   if(!historyBlockData) return state;

   const index: number = typeof blockInfo === "number"? blockInfo : blockList.findIndex(block => block.id === blockInfo);
   const editingBlockId: string | null = index !== -1? blockList[index].id : null;

   return updateObject<BlockState, BlockStateProps>(state, {
     blockList,
     editingBlockId,
     stagedTextBlockData: null,
     stagedBlockDataList: [],
     isFetch: true,
     historyBack: arrayPush(state.historyBack, {
       editingBlockId: state.editingBlockId,
       ... historyBlockData
     }),
     modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList]
   });
}

function updateBlockHandler(
  state: BlockState,
  { payload }: ReturnType<typeof updateBlock>
): BlockState {

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(state.blockList).updateBlockList(payload).getData();

  const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

  if(!historyBlockData) return state;

  const updatedBlockIdList: string[] = [];

  if(payload.create) payload.create.map(data => updatedBlockIdList.push(data.id));

  if(payload.update) payload.update.map(data => updatedBlockIdList.push(data.id));

  return updateObject<BlockState, BlockStateProps>(state, {
    blockList,
    updatedBlockIdList,
    historyBack: arrayPush(state.historyBack, {
      editingBlockId: state.editingBlockId,
      ...historyBlockData
    }),
    modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList]
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
  console.log(createClearStatePart<BlockStateProps>(initialBlockState, payload));
  return updateObject<BlockState, BlockStateProps>(state, createClearStatePart<BlockStateProps>(initialBlockState, payload));
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
  [EDIT_PAGE_INFO]         : editPageInfoHandler
};

export default blockHandlers;