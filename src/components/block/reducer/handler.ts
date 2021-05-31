import { ContentType, BlockData, UUID } from '../types';
import { createReducer, createAction } from 'typesafe-actions';
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
  resetBlock,
  addBlock,
  EditedBlock,
  BlockState,
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
  getContentsToBeChanged,
  RESET_BLOCK,
  BlockActions,
  editBlock,
  editAble,
  changeTextStyle
} from './utils';

function updateObject<T = any>(oldObject: T, newValues: any): T {
  return Object.assign({}, oldObject, newValues);
};

const initialState:BlockState = (() => {
  return {
    pageId: null,
    userId: null,
    blocks: [],
    editingId: null,
    stage: [],
    rightToEdit: false,
    tempBack: [],
    tempFront: []
  };
})();

function resetBlockHandler (state: BlockState, action: ReturnType<typeof resetBlock>) {
  return initialState;
}

function addBlockHandler (state: BlockState, action: ReturnType<typeof addBlock>) {
  const { preBlockId, newBlockType, blockData } = action.payload;

  const preBlock = preBlockId? 
    state.blocks.filter(block => block.id === preBlockId)[0] 
    : state.blocks[state.blocks.length - 1];

  const newBlock: BlockData<any> = blockData? 
    copyBlockData(blockData) 
    : createBlockData("text", newBlockType, preBlock.id);

  const addedBlocks = insertBlock(state.blocks, [newBlock], preBlock.id);

  return updateObject(state, {
    blocks: orderingBlock(addedBlocks),
    editingId: newBlock.id,
    tempBack: tempDataPush(state.tempBack,{
      type: ADD_BLOCK,
      data: {
        id: newBlock.id
      }
    })
  });
}

function editAbleBlockHandler (state: BlockState, action: ReturnType<typeof editAble>) {
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

  return updateObject(state, {
    editingId: editingBlockId
  });
}

function editBlockHandler (state: BlockState, action: ReturnType<typeof editBlock>) {
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

  return updateObject(state, {
    stage: preStagedBlock? [...preStagedBlock, newStagedBlock] : [newStagedBlock]
  });
}

function changeTextStyleHandler (state: BlockState, action: ReturnType<typeof changeTextStyle>) {
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
  });
}

const test =  createAction("test", addBlock);

const bklogHandler = {
  RESET_BLOCK : resetBlockHandler,
  ADD_BLOCK   : addBlockHandler,
  EDITABLE    : editAbleBlockHandler,
  EDIT_BLOCK  : editBlockHandler
}

export default bklogHandler;