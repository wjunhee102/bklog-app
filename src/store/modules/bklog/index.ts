import { v4 as uuidv4 } from 'uuid';

import { page } from '../../../data/db.json';

export type UUID = ReturnType<typeof uuidv4>

export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any;
}

export interface BlockData {
  id: UUID | string;
  type: string;
  parentId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  property: BlockProp | {};
  children?: any[] | [];
}

const ADD_BLOCK    = 'bklog/ADD_BLOCK' as const;
const EDITABLE     = 'bklog/EDITABLE' as const; 
const EDIT_BLOCK   = 'bklog/EDIT_BLOCK' as const; // 임시 데이터로 이동
const COMMIT_BLOCK = 'bklog/COMMIT_BLOCK' as const;
const DELETE_BLOCK = 'bklog/DELETE_BLOCK' as const;
const UPDATE_BLOCK = 'bklog/UPDATE_BLOCK' as const; // DB에 업데이트할 때
const SWITCH_BLOCK = 'bklog/SWITCH_BLOCK' as const;

const NEWEDIT_BLOCK = 'bklog/NEWEDIT_BLOCK' as const;



interface EditedBlock {
  blockId: UUID,
  focusOffset: number,
  text: string,
  textType: "b" | "i" | ["fc", string] | ["bc", string]
}

export function newEditBlock({ 
  blockId,
  focusOffset,
  text,
  textType
}: EditedBlock) {
  return {
    type: NEWEDIT_BLOCK,
    payload: {
      blockId,
      focusOffset,
      text,
      textType
    }
  }
}

export function addBlock(preBlockId?: string, type?: string) {
  return {
    type: ADD_BLOCK,
    payload: {
      preBlockId,
      type
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
  focusOffset,
  text,
  textType
}: EditedBlock) {
  return {
    type: EDIT_BLOCK,
    payload: {
      blockId,
      focusOffset,
      text,
      textType
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
  | ReturnType<typeof newEditBlock>
;

interface StagedBlock{
  id: UUID;
  content: string;
  startOffset: number;
  lastOffset: number;
}

export interface BklogState {
  pageId: UUID;
  userId: string;
  editingId: string | null;
  blocks: BlockData[];
  stage: StagedBlock[] | [];
}


// 먼저 기존 기능 대체
function newContents (
    preContents:any, 
    focusOffset:number, 
    textLength: number,
    newContent: any
  ):any  {
    let contents = [...preContents];
    let newContents = []
    let temp = []
    
    newContents = [contents.slice(0, focusOffset)];

    for (let i = focusOffset; i < textLength; i++ ) {
      
    }


  return {
    contents: ["aa", [["aa"]]]
  }
}

const initialState:BklogState = ((): BklogState => {
  return {
    pageId: page.id,
    userId: page.userId,
    blocks: page.blocks,
    editingId: null,
    stage: []
  };
})()

function bklog( state: BklogState = initialState, action: BklogActions):BklogState {

  switch(action.type) {

    case ADD_BLOCK:
      
      const { preBlockId, type } = action.payload;

      const blocks = [...state.blocks];

      const newBlock: BlockData = {
        id: uuidv4(),
        type: "block",
        parentId: null,
        preBlockId: preBlockId?  preBlockId : state.blocks[state.blocks.length - 1].id,
        nextBlockId: null,
        property: {
          type: type? type : "BKlog-p",
          styles: {
          },
          contents: [
          ]
        }
      }

      if(preBlockId) {

        newBlock.preBlockId = preBlockId;

        for(let i = 0; i < state.blocks.length; i++) {
          if(state.blocks[i].id === preBlockId) {

            if(i !== state.blocks.length - 1 ) {
          
              blocks[i].nextBlockId = newBlock.id;
              blocks[i+1].preBlockId = newBlock.id;
              newBlock.nextBlockId = blocks[i+1].id;
  
              blocks.splice(i + 1, 0, newBlock);

            } else {

              blocks[i].nextBlockId = newBlock.id;

              blocks.push(newBlock);

            }
            
          }
        }

        return Object.assign({}, state, {
          blocks,
          editingId: newBlock.id
        })
      }

      blocks[blocks.length -1].nextBlockId = newBlock.id;
      
      blocks.push(newBlock);
      
      return Object.assign({}, state, {
        blocks,
        editingId: newBlock.id
      });

    case EDITABLE: 
      return Object.assign({}, state, {
        editingId: action.payload.id
      })
    
    case EDIT_BLOCK: 
      const editedId = action.payload.blockId;
      const { focusOffset, textType, text } = action.payload;

      return state
    // case COMMIT_BLOCK: 


    case DELETE_BLOCK: 
      const deletedId = action.payload.id;  

      const deletedBlock = state.blocks.filter((block)=>
        block.id !== deletedId
      );
      
      let preBlock, nextBlock;

      if(deletedBlock.length === 0) {
      
        deletedBlock.push({
          id: uuidv4(),
          type: "block",
          parentId: null,
          preBlockId: null,
          nextBlockId: null,
          property: {
            type: "BKlog-p",
            styles: {
            },
            contents: [
            ]
          },
          children: []
        })

      } else {

        for(let i = 0; i < deletedBlock.length; i++) {

          if(i === 0) {
            if(state.blocks[i].id === deletedId) {
              deletedBlock[i].preBlockId = null
              break;
            }
          } else if(i === deletedBlock.length - 1 ) {
            if(state.blocks[i+1].id === deletedId) {
              deletedBlock[i].nextBlockId = null
            }
          }

          if(deletedBlock[i].nextBlockId === deletedId) {
            preBlock = {
              idx: i,
              id: deletedBlock[i].id
            }
          }
  
          if(deletedBlock[i].preBlockId === deletedId) {
            nextBlock = {
              idx: i,
              id: deletedBlock[i].id
            }
          }

        }
  
        if(preBlock && nextBlock) {
          deletedBlock[preBlock.idx].nextBlockId = nextBlock.id
          deletedBlock[nextBlock.idx].preBlockId = preBlock.id
        } 

      }

      return Object.assign({}, state, {
        blocks: deletedBlock
      })


    default: 
      let preState = localStorage.getItem("newBklog")

      return preState? JSON.parse(preState) : state;
  }

}

export default bklog;