import { 
  RESET_BLOCK, 
  ADD_BLOCK, 
  COMMIT_TEXT_BLOCK, 
  DELETE_BLOCK, 
  UPDATE_BLOCK, 
  CHANGE_TEXT_STYLE, 
  REVERT_BLOCK, 
  SWITCH_BLOCK, 
  SET_CLIPBOARD,
  SET_TEMPCLIP,
  TEST_CLIPBOARD,
  EDIT_TEXT_BLOCK,
  CHANGE_EDITING_ID,
  CHANGE_EDITOR_STATE,
  CHANGE_TARGET_POSITION,
  EDITOR_STATE_RESET,
  CHANGE_FETCH_STATE,
  CHANGE_STYLE_TYPE,
  INIT_BLOCK_STATE,
  CHANGE_BLOCK_CONTENTS,
  DELETE_TEXT_BLOCK,
  ADD_TEXT_BLOCK,
  INIT_PAGE_TITLE,
  EDIT_PAGE_TITLE,
  EditorStateType,
  ClearStateType,
  CLEAR_STATE_ITEM,
  EDIT_PAGE_INFO,
  COMMIT_PAGE,
  PreBlockInfo,
  SET_PREBLOCKINFO,
  CHANGE_BLOCK_TYPE,
  ADD_TITLE_BLOCK,
  DELETE_TITLE_BLOCK,
  EDIT_BLOCK,
  EDIT_BLOCK_SIDE_INFO,
  StagedPageTitle,
  TargetInfo
} from ".";
import { BlockType, UnionBlock, UnionBlockDataProps, UnionRawBlockData } from "../../entities/block/type";
import { BlockTypeText, TextContentStyleType, OrderType } from "../../entities/block/type/types/text";
import { ModifyBklogData, ModifyBlockData } from "../../service/modify/type";

function initBlockState(rawBlockData: UnionRawBlockData[]) {
  return {
    type: INIT_BLOCK_STATE,
    payload: rawBlockData
  };
}

function resetBlock() {
  return {
    type: RESET_BLOCK
  }
}

function addBlock(addBlockList: UnionBlock[], targetId: string, previous: boolean, keepCurrentBlockPosition: boolean, nextEditInfo?: string | number) {
  return {
    type: ADD_BLOCK,
    payload: {
      addBlockList,
      targetId,
      previous,
      keepCurrentBlockPosition,
      nextEditInfo
    }
  }
}

function addTextBlock(
  index: number, 
  innerHTML: string,
  cursorStart: number,
  cursorEnd: number,
  type?: BlockTypeText,
  styleType?: string
) {
  return {
    type: ADD_TEXT_BLOCK,
    payload: {
      index,
      innerHTML,
      cursorStart,
      cursorEnd,
      type,
      styleType
    }
  }
}

function addTitleBlock(
  text: string,
  cursorStart: number,
  cursorEnd: number
) { 
  return {
    type: ADD_TITLE_BLOCK,
    payload: {
      text,
      cursorStart,
      cursorEnd
    }
  }
}

function changeEditingId(nextEditInfo?: string | number) {
  return {
    type: CHANGE_EDITING_ID,
    payload: nextEditInfo
  }
}

function editBlock(blockInfo: string | number, blockDataProps: UnionBlockDataProps) {
  return {
    type: EDIT_BLOCK,
    payload: {
      blockInfo,    
      blockDataProps
    }
  }
}

function editTextBlock(blockId: string, blockIndex: number, contents: string) {
  return {
    type: EDIT_TEXT_BLOCK,
    payload: {
      blockId,
      blockIndex,
      contents
    }
  }
}

function commitTextBlock() {
  return {
    type: COMMIT_TEXT_BLOCK
  }
}

function commitPage() {
  return {
    type: COMMIT_PAGE
  }
}

function changeBlockContents(index: number, contents: any) {
  return {
    type: CHANGE_BLOCK_CONTENTS,
    payload: {
      index,
      contents
    }
  };
}

function deleteBlock(removedBlockList: UnionBlock[], nextEditInfo?: string | number) {
  return {
    type: DELETE_BLOCK,
    payload: {
      removedBlockList,
      nextEditInfo
    }
  }
}

function deleteTextBlock(index: number, innerHTML: string, textLength: number) {
  return {
    type: DELETE_TEXT_BLOCK,
    payload: {
      index,
      innerHTML,
      textLength
    }
  };
}

function deleteTitleBlock(innerText: string) {
  return {
    type: DELETE_TITLE_BLOCK,
    payload: innerText
  }
}

function updateBlock(modifyBlockData: ModifyBlockData) {
  return {
    type: UPDATE_BLOCK,
    payload: modifyBlockData
  }
}

function changeTextStyle(
  index: number, 
  styleType: TextContentStyleType, 
  startPoint: number,
  endPoint: number,
  order: OrderType
  ) {
  return {
    type: CHANGE_TEXT_STYLE,
    payload: {
      index,
      styleType,
      startPoint,
      endPoint,
      order
    }
  }
}

function revertBlock(front?: boolean) {
  return {
    type: REVERT_BLOCK,
    front
  }
}

function switchBlock(isCreateContainer?: boolean) {
  return {
    type: SWITCH_BLOCK,
    payload: isCreateContainer? true : false
  }
}

function setClipboard() {
  return {
    type: SET_CLIPBOARD
  }
}

function setTempClip(index: number[]) {
  return  {
    type: SET_TEMPCLIP,
    payload: index
  }
}

function chageEditorState(type: EditorStateType, toggle: boolean) {
  return {
    type: CHANGE_EDITOR_STATE,
    payload: {
      type,
      toggle
    }
  }
}

function changeTargetPosition(targetInfo: TargetInfo | null = null) {
  return {
    type: CHANGE_TARGET_POSITION,
    payload: {
      targetInfo
    }
  }
}

function testClipAdd(payload: any) {
  return {
    type: TEST_CLIPBOARD,
    payload
  }
}

function resetEditorState(cliping: boolean) {
  return {
    type: EDITOR_STATE_RESET,
    payload: cliping
  }
}

function changeFetchState(fetch?: boolean) {
  return {
    type: CHANGE_FETCH_STATE,
    payload: fetch
  }
}

function changeStyleType(blockInfo: string | number, styleType: string) {
  return {
    type: CHANGE_STYLE_TYPE,
    payload: {
      blockInfo,
      styleType
    }
  }
}

function changeBlockType(blockInfo: string | number, type: BlockType) {
  return {
    type: CHANGE_BLOCK_TYPE,
    payload: {
      blockInfo,
      type
    }
  }
}

function setPreBlockInfo(preBlockInfo: PreBlockInfo) {
  return {
    type: SET_PREBLOCKINFO,
    payload: preBlockInfo
  };
}

function initPageTitle(title: string) {
  return {
    type: INIT_PAGE_TITLE,
    payload: title
  }
}

function editPageTitle(title: string) {
  return {
    type: EDIT_PAGE_TITLE,
    payload: title
  }
}

function clearStateItem(...key: ClearStateType[]) {
  return {
    type: CLEAR_STATE_ITEM,
    payload: key
  }
}

function editPageInfo(stagedPageTitle: StagedPageTitle | null) {
  return {
    type: EDIT_PAGE_INFO,
    payload: stagedPageTitle
  }
}

// function createAction<T, P extends (...args: any) => any>(type: T) {
//   return (payload: P): { type: T, payload: P } => ({
//     type,
//     payload
//   });
// }

function editBlockSideInfo(blockId: string, info?: any) {
  return {
    type: EDIT_BLOCK_SIDE_INFO,
    payload: {
      blockId,
      info
    }
  }
}

const actionBlock = {
  initBlockState,
  resetBlock,
  addBlock,
  addTextBlock,
  addTitleBlock,
  changeEditingId,
  editBlock,
  editTextBlock,
  commitTextBlock,
  commitPage,
  changeBlockContents,
  deleteBlock,
  deleteTextBlock,
  deleteTitleBlock,
  updateBlock,
  changeTextStyle,
  revertBlock,
  switchBlock,
  setClipboard,
  setTempClip,
  chageEditorState,
  changeTargetPosition,
  testClipAdd,
  resetEditorState,
  changeFetchState,
  changeStyleType,
  setPreBlockInfo,
  initPageTitle,
  editPageTitle,
  clearStateItem,
  editPageInfo,
  changeBlockType,
  editBlockSideInfo
}

export default actionBlock;