import { 
  RESET_BLOCK, 
  ADD_BLOCK, 
  EDITABLE, 
  EditedBlock, 
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
  ADD_BLOCKLIST
} from ".";
import { UUID, BlockData, ContentType } from "../../types";

function resetBlock() {
  return {
    type: RESET_BLOCK
  }
}

function addBlock(blockId?: UUID, type?: string, block?: BlockData<any>) {
  return {
    type: ADD_BLOCK,
    payload: {
      preBlockId: blockId,
      newBlockType: type,
      blockData: block
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
}: EditedBlock) {
  return {
    type: EDIT_BLOCK,
    payload: {
      blockId,
      blockIndex,
      text
    }
  }
}

function commitBlock() {
  return {
    type: COMMIT_BLOCK
  }
}

function deleteBlock(deletedId: UUID) {
  return {
    type: DELETE_BLOCK,
    payload: {
      deletedId
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
  style: ContentType, 
  startPoint: number,
  endPoint: number,
  order: OrderType
  ) {
  return {
    type: CHANGE_TEXT_STYLE,
    payload: {
      changedTextStyleBlockIndex: index,
      styleType: style,
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
  clearTempClip
}

export default actionBlock;