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
  SWITCH_BLOCK 
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

const actionBlock = {
  resetBlock,
  addBlock,
  editAble,
  editBlock,
  commitBlock,
  deleteBlock,
  updateBlock,
  changeTextStyle,
  revertBlock,
  switchBlock
}

export default actionBlock;