import { RESET_BLOCK, ADD_BLOCK, EDITABLE, EditedBlock, EDIT_BLOCK, COMMIT_BLOCK, DELETE_BLOCK, UPDATE_BLOCK, OrderType, CHANGE_TEXT_STYLE, REVERT_BLOCK, SWITCH_BLOCK } from ".";
import { UUID, BlockData, ContentType } from "../../../../types/bklog";

export function resetBlock() {
  return {
    type: RESET_BLOCK
  }
}

export function addBlock(blockId?: UUID, type?: string, block?: BlockData<any>) {
  return {
    type: ADD_BLOCK,
    payload: {
      preBlockId: blockId,
      newBlockType: type,
      blockData: block
    }
  }
}

export function editAble (id: UUID | null, index?: number) {
  return {
    type: EDITABLE,
    payload: {
      editingId: id,
      editingIndex: index
    }
  }
}

export function editBlock({ 
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

export function commitBlock() {
  return {
    type: COMMIT_BLOCK
  }
}

export function deleteBlock(deletedId: UUID) {
  return {
    type: DELETE_BLOCK,
    payload: {
      deletedId
    }
  }
}

export function updateBlock(id: UUID) {
  return {
    type: UPDATE_BLOCK,
    payload: {
      id
    }
  }
}

export function changeTextStyle(
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

export function revertBlock() {
  return {
    type: REVERT_BLOCK
  }
}

export function switchBlock(blockId: UUID, targetBlockId: UUID, targetType: boolean) {
  return {
    type: SWITCH_BLOCK,
    payload: {
      switchedId: blockId,
      targetBlockId,
      targetType
    }
  }
}

const actionBklog = {
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

export default actionBklog;