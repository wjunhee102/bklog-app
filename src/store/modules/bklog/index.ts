import { v4 as uuidv4 } from 'uuid';

import {
  TextProps,
  BlockData,
  UUID,
  ContentType
} from '../../../types/bklog';

import { updateContents, orderingBlock, insertChild } from './utils';

import { page } from '../../../data/db.json';

/**
 * BlockLog store
 */

const ADD_BLOCK    = 'bklog/ADD_BLOCK' as const;
const EDITABLE     = 'bklog/EDITABLE' as const; 
const EDIT_BLOCK   = 'bklog/EDIT_BLOCK' as const; // 임시 데이터로 이동
const COMMIT_BLOCK = 'bklog/COMMIT_BLOCK' as const;
const DELETE_BLOCK = 'bklog/DELETE_BLOCK' as const;
const UPDATE_BLOCK = 'bklog/UPDATE_BLOCK' as const; // DB에 업데이트할 때
const SWITCH_BLOCK = 'bklog/SWITCH_BLOCK' as const;

interface EditedBlock {
  blockId: UUID;
  blockIndex: number;
  text: string;
}

export function addBlock(blockIndex?: number, type?: string) {
  return {
    type: ADD_BLOCK,
    payload: {
      preBlockIndex: blockIndex,
      newBlockType: type
    }
  }
}

export function editAble (id: UUID) {
  return {
    type: EDITABLE,
    payload: {
      id
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

export function deleteBlock(id: UUID) {
  return {
    type: DELETE_BLOCK,
    payload: {
      id
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

export type BklogActions = ReturnType<typeof addBlock>
  | ReturnType<typeof editAble>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof updateBlock>
;

interface StagedBlock{
  id: UUID;
  contents: any;
  blockIndex: number;
}

export interface BklogState {
  pageId: UUID;
  userId: string;
  editingId: string | null;
  blocks: BlockData<any>[];
  stage: StagedBlock[];
}
console.log("newOrder",orderingBlock(page.blocks))

const initialState:BklogState = ((): BklogState => {
  return {
    pageId: page.id,
    userId: page.userId,
    blocks: orderingBlock(page.blocks),
    editingId: null,
    stage: []
  };
})()

function bklog( state: BklogState = initialState, action: BklogActions):BklogState {

  switch(action.type) {

    case ADD_BLOCK:
      const { preBlockIndex, newBlockType } = action.payload;

      let blocks = [...state.blocks];
      const preBlock: BlockData<any> | null = preBlockIndex? 
        blocks[preBlockIndex - 1] : null;

      let nextBlockPosition:number = 0;
      const nextBlock: BlockData<any> | null = preBlock && preBlock.nextBlockId?
        blocks.filter((block, idx)=> {
          nextBlockPosition = idx
          return block.id === preBlock.nextBlockId })[0] : null;

      // block factory 함수를 만들어야 함.
      const newBlock: BlockData<any> = {
        index: 0,
        id: uuidv4(),
        type: "block",
        parentId: null,
        preBlockId: preBlock? preBlock.id : blocks[blocks.length - 1].id,
        nextBlockId: nextBlock? nextBlock.id : null,
        property: {
          type:  newBlockType?  newBlockType  : "BKlog-p",
          styles: {
            color: null,
            backgroundColor: null
          },
          contents: []
        },
        children: []
      }

      if(preBlockIndex) {
        blocks[preBlockIndex - 1].nextBlockId = newBlock.id;
        if(preBlock && preBlock.parentId) {
          blocks = blocks.map((block) => {
            if(block.id === preBlock.parentId) {

              const newChildren = insertChild(block.children,(preBlockIndex - block.index), newBlock.id);
              console.log("newChildren", newChildren, newBlock.id)
              return Object.assign({}, block, {
                children: newChildren
              });

            } 
            return block
          });
          newBlock.parentId = preBlock.parentId;
        }
      } else {
        blocks[blocks.length - 1].nextBlockId = newBlock.id; 
      }

      if(nextBlockPosition) {
        blocks[nextBlockPosition - 1].preBlockId = newBlock.id;
      }

      blocks.push(newBlock);
      console.log(blocks);

      return Object.assign({}, state, {
        blocks: orderingBlock(blocks),
        editingId: newBlock.id
      }) 

    case EDITABLE: 
      return Object.assign({}, state, {
        editingId: action.payload.id
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
      
    case COMMIT_BLOCK: 

    const stagedBlocks = [...state.stage];
    const newBlocks = [...state.blocks];
    stagedBlocks.forEach((block)=>{
      if(newBlocks[block.blockIndex - 1].id === block.id) {
        newBlocks[block.blockIndex - 1].property.contents = updateContents(block.contents);
      } else {
        console.log("block이 제대로 정렬되지 않았습니다.");
      }
    });
    
    const newState = Object.assign({}, state, {
      blocks: newBlocks,
      stage: [],
      editingId: null
    });

    localStorage.setItem("bklog", JSON.stringify(newState));

    return newState;


    // case DELETE_BLOCK: 
    //   const deletedId = action.payload.id;  

    //   const deletedBlock = state.blocks.filter((block)=>
    //     block.id !== deletedId
    //   );
      
    //   let preBlock1, nextBlock;

    //   if(deletedBlock.length === 0) {
      
    //     deletedBlock.push({
    //       index: 1,
    //       id: uuidv4(),
    //       type: "block",
    //       parentId: null,
    //       preBlockId: null,
    //       nextBlockId: null,
    //       property: {
    //         type: "BKlog-p",
    //         styles: {
    //         },
    //         contents: [
    //         ]
    //       },
    //       children: []
    //     })

    //   } else {

    //     for(let i = 0; i < deletedBlock.length; i++) {

    //       if(i === 0) {
    //         if(state.blocks[i].id === deletedId) {
    //           deletedBlock[i].preBlockId = null
    //           break;
    //         }
    //       } else if(i === deletedBlock.length - 1 ) {
    //         if(state.blocks[i+1].id === deletedId) {
    //           deletedBlock[i].nextBlockId = null
    //         }
    //       }

    //       if(deletedBlock[i].nextBlockId === deletedId) {
    //         preBlock1 = {
    //           idx: i,
    //           id: deletedBlock[i].id
    //         }
    //       }
  
    //       if(deletedBlock[i].preBlockId === deletedId) {
    //         nextBlock = {
    //           idx: i,
    //           id: deletedBlock[i].id
    //         }
    //       }

    //     }
  
    //     if(preBlock1 && nextBlock) {
    //       deletedBlock[preBlock1.idx].nextBlockId = nextBlock.id
    //       deletedBlock[nextBlock.idx].preBlockId = preBlock1.id
    //     } 

    //   }

      // return Object.assign({}, state, {
      //   blocks: deletedBlock
      // })


    default: 
      // let preState = localStorage.getItem("bklog")
      console.log("state:", state)
      return state;
  }

}

export default bklog;