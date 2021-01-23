import { v4 as uuidv4 } from 'uuid';

import {
  ContentType,
  TextContents,
  TextProps,
  BlockData,
  UUID
} from '../../../types/bklog';

import { 
  updateContents, 
  addContentsStyle,
  deleteContentsStyle,
  orderingBlock, 
  insertChild 
} from './utils';

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

const CHANGE_TEXT_STYLE = 'bklog/CHANGE_TEXT_STYLE' as const;
const DEL_CONTENTS_STYLE = 'bklog/DEL_CONTENTS_STYLE' as const;

interface EditedBlock {
  blockId: UUID;
  blockIndex: number;
  text: string;
}

export function addBlock(blockIndex?: number, type?: string, block?: BlockData<any>) {
  return {
    type: ADD_BLOCK,
    payload: {
      preBlockIndex: blockIndex,
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

export type orderType = "add" | "del" | "color" | "link"  

export function changeTextStyle(
  index: number, 
  style: ContentType, 
  startPoint: number,
  endPoint: number,
  order: orderType
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

export type BklogActions = ReturnType<typeof addBlock>
  | ReturnType<typeof editAble>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof updateBlock>
  | ReturnType<typeof changeTextStyle>
;

interface StagedBlock{
  id: UUID;
  contents: any;
  blockIndex: number;
}

interface Revert {
  
}

export interface BklogState {
  pageId: UUID;
  userId: string;
  editingId: string | null;
  blocks: BlockData<any>[];
  stage: StagedBlock[];
  rightToEdit: boolean;
}
console.log("newOrder",orderingBlock(page.blocks))

const initialState:BklogState = ((): BklogState => {
  return {
    pageId: page.id,
    userId: page.userId,
    blocks: orderingBlock(page.blocks),
    editingId: null,
    stage: [],
    rightToEdit: true
  };
})()

function bklog( state: BklogState = initialState, action: BklogActions):BklogState {

  switch(action.type) {

    case ADD_BLOCK:
      const { preBlockIndex, newBlockType, blockData } = action.payload;

      let blocks = [...state.blocks];
      const preBlock: BlockData<any> | null = preBlockIndex? 
        blocks[preBlockIndex - 1] : null;

      let nextBlockPosition:number = preBlock? blocks.findIndex(block => 
          block.id === preBlock.nextBlockId
        ) : 0;
      const nextBlock: BlockData<any> | null = preBlock && preBlock.nextBlockId?
        blocks[nextBlockPosition] : null;

      // block factory 함수를 만들어야 함.
      const newBlock: BlockData<any> = blockData? Object.assign({}, 
        blockData, {
          id: uuidv4(),
          parentId: null,
          preBlockId: preBlock? preBlock.id : blocks[blocks.length - 1].id,
          nextBlockId: nextBlock? nextBlock.id : null,
          children: []
        }) : {
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
          const parentBlockPosition = blocks.findIndex(block => block.id === preBlock.parentId);
          const parentBlock = blocks[parentBlockPosition];
          const insertPosion = parentBlock.children.indexOf(preBlock.id) + 1;

          blocks[parentBlockPosition] = Object.assign({}, parentBlock, {
            children: insertChild(parentBlock.children, insertPosion, [newBlock.id])
          });

          newBlock.parentId = preBlock.parentId;
        }
      } else {
        blocks[blocks.length - 1].nextBlockId = newBlock.id; 
      }

      if(nextBlock) {
        blocks[nextBlockPosition].preBlockId = newBlock.id;
      }

      blocks.push(newBlock);

      return Object.assign({}, state, {
        blocks: orderingBlock(blocks),
        editingId: newBlock.id
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
      let changedTextContents: TextContents[];

      switch(order) {
        case "add":
          changedTextContents = addContentsStyle(
            changedTextStyleBlock.property.contents,
            startPoint,
            endPoint,
            styleType
          );
          break;

        case "del":
          changedTextContents = deleteContentsStyle(
            changedTextStyleBlock.property.contents,
            startPoint,
            endPoint,
            styleType
          );
          break;

        case "color":
          changedTextContents = addContentsStyle(
            deleteContentsStyle(
              changedTextStyleBlock.property.contents,
              startPoint,
              endPoint,
              styleType
            ),
            startPoint,
            endPoint,
            styleType
          );
          break;

        case "link":
          changedTextContents = addContentsStyle(
            deleteContentsStyle(
              changedTextStyleBlock.property.contents,
              startPoint,
              endPoint,
              styleType
            ),
            startPoint,
            endPoint,
            styleType
          );
          break;

        default: 
          changedTextContents = changedTextStyleBlock.property.contents;
      }

      const newBLock = Object.assign({}, 
        changedTextStyleBlock, {
          property: Object.assign({}, 
            changedTextStyleBlock.property, {
              contents: changedTextContents
          })
        });
      
      console.log(changedTextContents);
      
      return Object.assign({}, state, {
        blocks: state.blocks.map((block)=> 
          block.index === changedTextStyleBlockIndex? 
          newBLock : block  
        )
      })
      
      
    case COMMIT_BLOCK: 

      const stagedBlocks = [...state.stage];
      let newBlocks      = [...state.blocks];
      stagedBlocks.forEach((block)=>{

        if(newBlocks[block.blockIndex - 1] && block.id === newBlocks[block.blockIndex - 1].id) {
          
          newBlocks[block.blockIndex - 1].property = Object.assign({}, 
            newBlocks[block.blockIndex - 1].property, {
              contents: updateContents(block.contents)
          });

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


    case DELETE_BLOCK: 
      const { deletedId } = action.payload;
      
      if(deletedId === state.blocks[0].id) return state;

      let deletedBlocks = state.blocks.filter((block) => 
          block.id !== deletedId
        );

      const deletedBlock = state.blocks.filter((block)=>
        block.id === deletedId
      )[0];

      const preBlockId = deletedBlock.preBlockId;
      const nextBlockId = deletedBlock.nextBlockId;
      const parentId = deletedBlock.parentId;

      let newPreBlockId = preBlockId;
      let newNextBlockId = nextBlockId;


      if(deletedBlock.children[0]) {
        let childPositionList:number[] = [];
        deletedBlock.children.forEach(child => {
          childPositionList.push(deletedBlocks.findIndex((block)=> block.id === child));
        })
        const firstChild = childPositionList[0];
        const lastChild = childPositionList[childPositionList.length -1];
        if(preBlockId) {
          deletedBlocks[firstChild].preBlockId = preBlockId;
          newNextBlockId = deletedBlocks[firstChild].id;
        }
          
        if(nextBlockId) {
          deletedBlocks[lastChild].nextBlockId = nextBlockId;
          newPreBlockId = deletedBlocks[lastChild].id;
        }
        
        childPositionList.forEach((child)=>{
          deletedBlocks[child].parentId = parentId;
        });
      } 

      if(parentId) {
        const parentBlockPosition = deletedBlocks.findIndex((block)=> block.id === parentId);
        const parentBlock = deletedBlocks[parentBlockPosition]
        const deletePosition = parentBlock.children.indexOf(deletedId);

        deletedBlocks[parentBlockPosition] = Object.assign({}, parentBlock, {
          children: deletedBlock.children[0] ?
          insertChild(parentBlock.children, deletePosition, deletedBlock.children, 1)
          : parentBlock.children.filter((child) => child !== deletedId)
        })
      }

      if(preBlockId) {
        deletedBlocks = deletedBlocks.map((block) => 
          block.id === preBlockId? Object.assign({}, block, {
            nextBlockId: newNextBlockId
          }) : block
        );
      }

      if(nextBlockId) {
        deletedBlocks = deletedBlocks.map((block) => 
          block.id === nextBlockId? Object.assign({}, block, {
            preBlockId: newPreBlockId
          }) : block
        );
      }

      return Object.assign({}, state, {
        blocks: orderingBlock(deletedBlocks)
      });
      
    default: 
      // let preState = localStorage.getItem("bklog")
      console.log("state:", state)
      return state;
  }

}

export default bklog;