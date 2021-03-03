import {
  ContentType,
  BlockData,
  UUID
} from '../../../types/bklog';

import { 
  ADD_BLOCK,
  EDITABLE,
  EDIT_BLOCK,
  COMMIT_BLOCK,
  DELETE_BLOCK,
  UPDATE_BLOCK,
  SWITCH_BLOCK,
  REVERT_BLOCK,
  CHANGE_TEXT_STYLE,
  EditedBlock,
  BklogState,
  OrderType,
  orderingBlock,
  createBlockData,
  copyBlockData,
  insertBlock,
  tempDataPush,
  updateContents,
  changeStyleTextContents,
  excludeBlock,
  excludeBlockList,
  switchingBlock,
  restoreBlock,
  getContentsToBeChanged
} from './utils';

import { page } from '../../../data/db.json';

import { newDataList } from '../../../index.test';

/**
 * BlockLog store
 */
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

type BklogActions = ReturnType<typeof addBlock>
  | ReturnType<typeof editAble>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof updateBlock>
  | ReturnType<typeof changeTextStyle>
  | ReturnType<typeof revertBlock>
  | ReturnType<typeof switchBlock>
;

const initialState:BklogState = (() => {
  return {
    pageId: page.id,
    userId: page.userId,
    blocks: orderingBlock(page.blocks),
    editingId: null,
    stage: [],
    rightToEdit: true,
    tempBack: [],
    tempFront: []
  };
})();

function bklog(state: BklogState = initialState, action: BklogActions):BklogState {

  switch(action.type) {

    case ADD_BLOCK:
      const { preBlockId, newBlockType, blockData } = action.payload;

      const preBlock = preBlockId? 
        state.blocks.filter(block => block.id === preBlockId)[0] 
        : state.blocks[state.blocks.length - 1];

      const newBlock: BlockData<any> = blockData? 
        copyBlockData(blockData) 
        : createBlockData("text", newBlockType, preBlock.id);

      const addedBlocks = insertBlock(state.blocks, [newBlock], preBlock.id);

      return Object.assign({}, state, {
        blocks: orderingBlock(addedBlocks),
        editingId: newBlock.id,
        tempBack: tempDataPush(state.tempBack,{
          type: ADD_BLOCK,
          data: {
            id: newBlock.id
          }
        })
      }) 

    case EDITABLE: 
      const { editingId, editingIndex } = action.payload
      
      let editingBlockId: UUID | null;
      
      if(editingIndex) {
        if(editingIndex >= 1 && editingIndex <= state.blocks.length) {
          editingBlockId = state.blocks[editingIndex - 1].id;
        } else {
          editingBlockId = null
        }
      } else {
        editingBlockId = editingId
      }

      return Object.assign({}, state, {
        editingId: editingBlockId
      })
    
    case EDIT_BLOCK: 
      const editedId = action.payload.blockId;
      const text = action.payload.text;
      const editedBlockIndex = action.payload.blockIndex;

      const preStagedBlock = state.stage.filter(stagedBlock => 
          stagedBlock.id !== editedId
        );

      const newStagedBlock = {
        id: editedId,
        blockIndex: editedBlockIndex,
        contents: text
      }

      return Object.assign({}, state, {
        stage: preStagedBlock? [...preStagedBlock, newStagedBlock] : [newStagedBlock]
      })

    case CHANGE_TEXT_STYLE:
      const { 
        changedTextStyleBlockIndex, 
        styleType, 
        startPoint, 
        endPoint,
        order
       } = action.payload;
       
      const changedTextStyleBlock = state.blocks[changedTextStyleBlockIndex -1];
      if( changedTextStyleBlock.type !== "text" && changedTextStyleBlock.type !== "title") {
        console.log("text block이 아닙니다.")
        return state;
      }

      const newTempData = {
        id: changedTextStyleBlock.id,
        contents: changedTextStyleBlock.property.contents,
        blockIndex: changedTextStyleBlock.index
      }
      
      return Object.assign({}, state, {
        blocks: state.blocks.map((block)=> 
          block.index === changedTextStyleBlockIndex? 
          changeStyleTextContents(
            changedTextStyleBlock, 
            styleType, 
            startPoint, 
            endPoint,
            order
          )
          : block  
        ),
        tempBack: tempDataPush(state.tempBack, {
          type: CHANGE_TEXT_STYLE,
          data: [newTempData]
        })
      })
      
      
    case COMMIT_BLOCK: 
      if(!state.stage[0]) return state;

      const newTempBack = getContentsToBeChanged(state.blocks, state.stage);
      
      const newState = Object.assign({}, state, {
        blocks: updateContents(state.blocks, state.stage),
        stage: [],
        editingId: null,
        tempBack: tempDataPush(state.tempBack, {
          type: COMMIT_BLOCK,
          data: newTempBack
        })
      });

      localStorage.setItem("bklog", JSON.stringify(newState));

      return newState;


    case DELETE_BLOCK: 
      const { deletedId } = action.payload;
      
      if(deletedId === state.blocks[0].id) return state;

      const deletedBlock = state.blocks.filter((block)=>
        block.id === deletedId
      )[0];

      return Object.assign({}, state, {
        blocks: orderingBlock(excludeBlock(state.blocks, deletedId)),
        tempBack: tempDataPush(state.tempBack, {
          type: DELETE_BLOCK,
          data: deletedBlock
        })
      });
    
    case SWITCH_BLOCK:
      const { switchedId, targetBlockId, targetType } = action.payload;
      const switchedBlocks = switchingBlock(state.blocks, switchedId, targetBlockId, targetType);
      console.log(switchedBlocks);

      return Object.assign({}, state, {
        blocks: orderingBlock(switchedBlocks)
      });
    
    case REVERT_BLOCK:  
      const testBlock = state.tempBack.pop();
      let restoreBlocks;

      if(testBlock && testBlock.data.id) {
        restoreBlocks = restoreBlock(state.blocks, testBlock.data);
      } 

      return restoreBlocks? Object.assign({}, state, {
        blocks: orderingBlock(restoreBlocks.blocks)
      }) : state
      
    default: 

      return state;
  }

}

export default bklog;