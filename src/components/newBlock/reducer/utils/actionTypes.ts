import { 
  RESET_BLOCK, 
  ADD_BLOCK, 
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

function revertBlock(back: boolean) {
  return {
    type: REVERT_BLOCK,
    back
  }
}

function switchBlock(changedBlockIdList: string[], targetPosition: string, container?: boolean) {
  return {
    type: SWITCH_BLOCK,
    payload: {
      changedBlockIdList,
      targetPosition,
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