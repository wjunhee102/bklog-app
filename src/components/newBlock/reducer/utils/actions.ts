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
  INIT_BLOCK_STATE
} from ".";
import { UUID, BlockData, ContentType, RawBlockData, ModifyBlockData, ModifyDataType } from "../../types";

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

function addBlock(addBlockList: BlockData[], targetPosition: string, nextEditInfo?: string | number) {
  return {
    type: ADD_BLOCK,
    payload: {
      addBlockList,
      targetPosition,
      nextEditInfo
    }
  }
}

function changeEditingId(nextEditInfo: string | number) {
  return {
    type: CHANGE_EDITING_ID,
    payload: {
      nextEditInfo
    }
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

function deleteBlock(removedBlockList: BlockData[], nextEditInfo?: string | number) {
  return {
    type: DELETE_BLOCK,
    payload: {
      removedBlockList,
      nextEditInfo
    }
  }
}

function updateBlock(modifyData: ModifyDataType) {
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

function revertBlock(back: boolean) {
  return {
    type: REVERT_BLOCK,
    back
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

function chageEditorState(payload: ChangeEditorStateProps) {
  return {
    type: CHANGE_EDITOR_STATE,
    payload
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

const actionBlock = {
  initBlockState,
  resetBlock,
  addBlock,
  changeEditingId,
  editBlock,
  commitBlock,
  deleteBlock,
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
  clearModifyData
}

export default actionBlock;