import { 
  OrderType, 
  ChangeEditorStateProps,
  RESET_BLOCK, 
  ADD_BLOCK, 
  COMMIT_BLOCK, 
  DELETE_BLOCK, 
  UPDATE_BLOCK, 
  CHANGE_TEXT_STYLE, 
  REVERT_BLOCK, 
  SWITCH_BLOCK, 
  SET_CLIPBOARD,
  CLEAR_CLIPBOARD,
  CLEAR_TEMPCLIP,
  SET_TEMPCLIP,
  TEST_CLIPBOARD,
  EDIT_BLOCK,
  CHANGE_EDITING_ID,
  CHANGE_EDITOR_STATE,
  CHANGE_TARGET_POSITION,
  EDITOR_STATE_RESET,
  CHANGE_FETCH_STATE,
  CHANGE_STYLE_TYPE,
  CLEAR_MODIFYDATA,
  INIT_BLOCK_STATE,
  CHANGE_BLOCK_CONTENTS,
  DELETE_TEXT_BLOCK,
  CLEAR_NEXTBLOCKINFO,
  NextBlockInfo,
  SET_NEXTBLOCKINFO,
  ADD_TEXT_BLOCK,
  INIT_PAGE_TITLE,
  EDIT_PAGE_TITLE,
  EditorStateType
} from ".";
import { UUID, BlockData, ContentType, RawBlockData, ModifyBlockData, ModifyBlockDataType } from "../../types";

function initBlockState(rawBlockData: RawBlockData[]) {
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

function addBlock(addBlockList: BlockData[], targetPosition: string, currentBlockPosition: boolean, nextEditInfo?: string | number) {
  return {
    type: ADD_BLOCK,
    payload: {
      addBlockList,
      targetPosition,
      currentBlockPosition,
      nextEditInfo
    }
  }
}

function addTextBlock(
  index: number, 
  innerHTML: string,
  cursorStart: number,
  cursorEnd: number,
  type?: string,
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

function changeEditingId(nextEditInfo?: string | number) {
  return {
    type: CHANGE_EDITING_ID,
    payload: nextEditInfo
  }
}

function editBlock(blockId: string, blockIndex: number, contents: string) {
  return {
    type: EDIT_BLOCK,
    payload: {
      blockId,
      blockIndex,
      contents
    }
  }
}

function commitBlock() {
  return {
    type: COMMIT_BLOCK
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

function deleteBlock(removedBlockList: BlockData[], nextEditInfo?: string | number) {
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

function updateBlock(modifyData: ModifyBlockDataType) {
  return {
    type: UPDATE_BLOCK,
    payload: modifyData
  }
}

function changeTextStyle(
  index: number, 
  styleType: ContentType, 
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

function switchBlock(changedBlockIdList: string[], container?: boolean) {
  return {
    type: SWITCH_BLOCK,
    payload: {
      changedBlockIdList,
      container: container? true : false
    }
  }
}

function setClipboard() {
  return {
    type: SET_CLIPBOARD
  }
}

function clearClipboard() {
  return {
    type: CLEAR_CLIPBOARD
  }
}

function setTempClip(index: number[]) {
  return  {
    type: SET_TEMPCLIP,
    payload: index
  }
}

function clearTempClip() {
  return {
    type: CLEAR_TEMPCLIP
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

function changeTargetPosition(targetPosition?: string) {
  return {
    type: CHANGE_TARGET_POSITION,
    payload: {
      targetPosition
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

function clearModifyData() {
  return {
    type: CLEAR_MODIFYDATA
  };
}

function clearNextBlockInfo() {
  return {
    type: CLEAR_NEXTBLOCKINFO
  };
}

function setNextBlockInfo(nextBlockInfo: NextBlockInfo) {
  return {
    type: SET_NEXTBLOCKINFO,
    payload: nextBlockInfo
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

const actionBlock = {
  initBlockState,
  resetBlock,
  addBlock,
  addTextBlock,
  changeEditingId,
  editBlock,
  commitBlock,
  changeBlockContents,
  deleteBlock,
  deleteTextBlock,
  updateBlock,
  changeTextStyle,
  revertBlock,
  switchBlock,
  setClipboard,
  clearClipboard,
  setTempClip,
  clearTempClip,
  chageEditorState,
  changeTargetPosition,
  testClipAdd,
  resetEditorState,
  changeFetchState,
  changeStyleType,
  clearModifyData,
  clearNextBlockInfo,
  setNextBlockInfo,
  initPageTitle,
  editPageTitle
}

export default actionBlock;