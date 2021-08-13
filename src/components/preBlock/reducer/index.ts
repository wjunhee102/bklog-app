import {
  ContentType,
  BlockData,
  UUID
} from '../types';
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
  initialState,
  SET_CLIPBOARD,
  updateObject,
  CLEAR_CLIPBOARD,
  SET_TEMPCLIP,
  CLEAR_TEMPCLIP,
  ADD_BLOCKLIST,
  copyBlockDataList,
  TEST_CLIPBOARD,
  updateModifyData,
  BlockStateProps
} from './utils'; 

function blockReducer(state: BlockState = initialState, action: BlockActions): BlockState {

  switch(action.type) {
    case RESET_BLOCK: 
      return initialState;

    case ADD_BLOCK:
      const { preBlockId, newBlockType, blockData } = action.payload;

      const preBlock = preBlockId? 
        state.blocks.filter(block => block.id === preBlockId)[0] 
        : state.blocks[state.blocks.length - 1];

      const newBlock: BlockData<any> = blockData? 
        copyBlockData(blockData) 
        : createBlockData("text", newBlockType, preBlock.id);

      const addedBlocks = insertBlock(state.blocks, [ newBlock ], preBlock.id);

      console.log("modify", addedBlocks.modifyData);

      return updateObject<BlockState, BlockStateProps>(state, {
        blocks: orderingBlock(addedBlocks.blocks),
        editingId: newBlock.id,
        tempBack: tempDataPush(state.tempBack, {
          type: ADD_BLOCK,
          data: {
            id: newBlock.id
          }
        }),
        modifyData: updateModifyData(state.modifyData, addedBlocks.modifyData)
      });
    
    case ADD_BLOCKLIST:
      const newBlocks = copyBlockDataList(action.payload.blockList);

      console.log("실행2", newBlocks, action.payload.blockList);
      const addedBlockList = insertBlock(state.blocks, newBlocks, action.payload.preBlockId);

      console.log(addedBlockList.modifyData);

      return updateObject<BlockState, BlockStateProps>(state, {
        blocks: orderingBlock(addedBlockList.blocks),
        tempBack: tempDataPush(state.tempBack, {
          type: ADD_BLOCKLIST,
          data: {
            idList: newBlocks.map((block)=> block.id)
          }
        }),
        modifyData: updateModifyData(state.modifyData, addedBlockList.modifyData)
      });

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

      return updateObject<BlockState, BlockStateProps>(state, {
        editingId: editingBlockId
      });
    
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

      return updateObject<BlockState, BlockStateProps>(state, {
        stage: preStagedBlock? [...preStagedBlock, newStagedBlock] : [newStagedBlock]
      });

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
      
      return updateObject<BlockState, BlockStateProps>(state, {
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
      
      
    case COMMIT_BLOCK: 
      if(!state.stage[0]) return state;

      const newTempBack = getContentsToBeChanged(state.blocks, state.stage);
      
      const resUpdateContents = updateContents(state.blocks, state.stage)

      const newState = updateObject<BlockState, BlockStateProps>(state, {
        blocks: resUpdateContents.blocks,
        stage: [],
        editingId: null,
        tempBack: tempDataPush(state.tempBack, {
          type: COMMIT_BLOCK,
          data: newTempBack
        }),
        modifyData: updateModifyData(state.modifyData, resUpdateContents.modifyData)
      });

      // localStorage.setItem("block", JSON.stringify(newState));

      return newState;


    case DELETE_BLOCK: 
      const { deletedId } = action.payload;
      
      if(deletedId === state.blocks[0].id) return state;

      const deletedBlock = state.blocks.filter((block)=>
        block.id === deletedId
      )[0];

      const resExcludeBlock = excludeBlock(state.blocks, deletedId);

      return updateObject<BlockState, BlockStateProps>(state, {
        blocks: orderingBlock(resExcludeBlock.blocks),
        tempBack: tempDataPush(state.tempBack, {
          type: DELETE_BLOCK,
          data: deletedBlock
        }),
        modifyData: updateModifyData(state.modifyData, resExcludeBlock.modifyData)
      });
    
    case SWITCH_BLOCK:
      const { switchedId, targetBlockId, targetType } = action.payload;
      const switchedBlocks = switchingBlock(state.blocks, switchedId, targetBlockId, targetType);

      return updateObject<BlockState, BlockStateProps>(state, {
        blocks: orderingBlock(switchedBlocks)
      });
    
    case REVERT_BLOCK:  
      const testBlock = state.tempBack.pop();
      let restoreBlocks;

      if(testBlock && testBlock.data.id) {
        restoreBlocks = restoreBlock(state.blocks, testBlock.data);
      } 

      return restoreBlocks? updateObject<BlockState, BlockStateProps>(state, {
        blocks: orderingBlock(restoreBlocks.blocks)
      }) : state;

    case SET_TEMPCLIP: 
      if(state.tempClip[0]) {
        const length = state.tempClip.length;
        let tempClip = state.tempClip.concat();

        if(length > 1 && tempClip[length - 2] === action.payload) {
          tempClip.pop();
        } else {
          if(tempClip[length - 1] !== action.payload) tempClip.push(action.payload);
        }

        return updateObject<BlockState, BlockStateProps>(state, {
          tempClip
        });
      } else {
        return updateObject<BlockState, BlockStateProps>(state, {
          tempClip: [action.payload]
        });

      }
    
    case CLEAR_TEMPCLIP:
      return updateObject<BlockState, BlockStateProps>(state, {
        tempClip: []
      });

    case SET_CLIPBOARD:
      if(state.tempClip[0]) {
        const tempClip = state.tempClip.sort((a, b) => a - b);
        return updateObject<BlockState, BlockStateProps>(state, {
          clipboard: tempClip.map((idx) => state.blocks[idx - 1])
        });

      } else {
        return state;
      }

    case CLEAR_CLIPBOARD: 
      return updateObject<BlockState, BlockStateProps>(state, {
        clipboard: []
      });

    case TEST_CLIPBOARD:
      console.log(action.payload);

      return updateObject<BlockState, BlockStateProps>(state, {
        test: state.test? [...state.test, action.payload] : [action.payload]
      });

    default:

    return state;
  }

}


export default blockReducer;