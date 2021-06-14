import { 
  RESET_BLOCK, 
  ADD_BLOCK, 
  EDITABLE,
  EDIT_BLOCK, 
  COMMIT_BLOCK, 
  DELETE_BLOCK, 
  UPDATE_BLOCK, 
  OrderType, 
  CHANGE_TEXT_STYLE, 
  REVERT_BLOCK, 
  SWITCH_BLOCK, 
  SET_CLIPBOARD,
  CLEAR_CLIPBOARD,
  CLEAR_TEMPCLIP,
  SET_TEMPCLIP,
  ADD_BLOCKLIST,
  TEST_CLIPBOARD,
  StagedBlock
} from ".";
import { UUID, BlockData, ContentType } from "../../types";

function resetBlock() {
  return {
    type: RESET_BLOCK
  }
}

function addBlock(addBlockList: BlockData[], targetPosition: string, index: number) {
  return {
    type: ADD_BLOCK,
    payload: {
      addBlockList,
      targetPosition,
      index
    }
  }
}

function addBlockList(preBlockId: string, blockList: BlockData[]) {
  return {
    type: ADD_BLOCKLIST,
    payload: {
      preBlockId,
      blockList
    }
  }
}

function editAble (id: UUID | null, index?: number) {
  return {
    type: EDITABLE,
    payload: {
      editingId: id,
      editingIndex: index
    }
  }
}

function editBlock({ 
  blockId,
  blockIndex,
  text,
}: any) {
  return {
    type: EDIT_BLOCK,
    payload: {
      blockId,
      blockIndex,
      text
    }
  }
}

function commitBlock(stage: StagedBlock[]) {
  return {
    type: COMMIT_BLOCK,
    stage
  }
}

function deleteBlock(removedBlockList: BlockData[]) {
  return {
    type: DELETE_BLOCK,
    payload: {
      removedBlockList
    }
  }
}

function updateBlock(id: UUID) {
  return {
    type: UPDATE_BLOCK,
    payload: {
      id
    }
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

function revertBlock() {
  return {
    type: REVERT_BLOCK
  }
}

function switchBlock(blockId: UUID, targetBlockId: UUID, targetType: boolean) {
  return {
    type: SWITCH_BLOCK,
    payload: {
      switchedId: blockId,
      targetBlockId,
      targetType
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

function setTempClip(index: number) {
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

function testClipAdd(payload: any) {
  return {
    type: TEST_CLIPBOARD,
    payload
  }
}

const actionBlock = {
  resetBlock,
  addBlock,
  addBlockList,
  editAble,
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
  testClipAdd
}

export default actionBlock;