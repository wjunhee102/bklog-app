import { v4 as uuidv4 } from 'uuid';

import { data } from '../../../data/dummy.json';
import { Store } from 'redux';
import { string } from 'prop-types';

export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any[];
}

export type UUID = ReturnType<typeof uuidv4>

export interface RawBlock {
  id: UUID | string;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  property: BlockProp;
}

const ADD_BLOCK    = 'blocklog/ADD_BLOCK' as const;
const EDITABLE     = 'blocklog/EDITABLE' as const; 
const EDIT_BLOCK   = 'blocklog/EDIT_BLOCK' as const; // 임시 데이터로 이동
const COMMIT_BLOCK = 'blocklog/COMMIT_BLOCK' as const;
const DELETE_BLOCK = 'blocklog/DELETE_BLOCK' as const;
const UPDATE_BLOCK = 'blocklog/UPDATE_BLOCK' as const; // DB에 업데이트할 때
const SWITCH_BLOCK = 'blocklog/SWITCH_BLOCK' as const;

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

export function editBlock(id:UUID, content: string) {
  return {
    type: EDIT_BLOCK,
    payload: {
      id,
      content
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

export type BlocklogActions = ReturnType<typeof addBlock>
  | ReturnType<typeof editAble>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof updateBlock>
  ;

interface tempData {
  id: UUID;
  content: string;
}

export interface BlocklogState {
  editingId: string | null;
  blocks: RawBlock[];
  temps: tempData[] 
}

const initialState:BlocklogState = (():BlocklogState => {
  return {
    editingId: null,
    blocks: [...data],
    temps: []
  };
})()

function blocklog( state: BlocklogState = initialState, action: BlocklogActions):BlocklogState {
  
  switch(action.type) {

    case ADD_BLOCK:
      
      const { preBlockId, type } = action.payload;

      const blocks = [...state.blocks];

      const newBlock: RawBlock = {
        id: uuidv4(),
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

      const { id, content } = action.payload;

      let tempChange = false;

      for(let i = 0; i < state.temps.length; i++) {
        if(state.temps[i].id === id) {
          tempChange = true;
          
          break;
        }
      }

      return Object.assign({}, state, {
        temps: tempChange? state.temps.map(temp => 
            temp.id === id? {
              id,
              content
            } : temp
          ): [...state.temps, {
            id,
            content
          }]
      });

    case COMMIT_BLOCK: 

      const temps = state.temps.concat();
      
      console.log(temps);

      const newBlocks = state.blocks.map((block)=> {

          for(let i = 0; i < temps.length; i++) {

            if(block.id === temps[i].id) {

              return Object.assign({}, block, {
                property: Object.assign({}, block.property, {
                  contents: [
                    temps[i].content
                  ]
                })
              });

            }
          }

          return block;
        });

      return Object.assign({}, state, {
        blocks: newBlocks,
        temps: [],
        editingId: null
      });
    
    case DELETE_BLOCK: 
      const deletedBlock = state.blocks.filter((block)=>
        block.id !== action.payload.id
      );
      
      let preBlock, nextBlock;

      if(deletedBlock.length === 0) {
        deletedBlock.push({
          id: uuidv4(),
          preBlockId: null,
          nextBlockId: null,
          property: {
            type: "BKlog-p",
            styles: {
            },
            contents: [
            ]
          }
        })
      } else {

        for(let i = 0; i < deletedBlock.length; i++) {

          if(i === 0) {
            if(state.blocks[i].id === action.payload.id) {
              deletedBlock[i].preBlockId = null
              break;
            }
          } else if(i === deletedBlock.length - 1 ) {
            if(state.blocks[i+1].id === action.payload.id) {
              deletedBlock[i].nextBlockId = null
            }
          }

          if(deletedBlock[i].nextBlockId === action.payload.id) {
            preBlock = {
              idx: i,
              id: deletedBlock[i].id
            }
          }
  
          if(deletedBlock[i].preBlockId === action.payload.id) {
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
      return state;
  }

}

export default blocklog;