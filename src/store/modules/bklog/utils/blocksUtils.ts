import { v4 as uuidv4 } from 'uuid';
import { BlockData, UUID } from '../../../../types/bklog';
import { orderingBlock, StagedBlock, parseHtmlContents } from './index';
/**
 * blockData 생성 함수
 * return blockData<any>
 * @param type 
 * @param blockType 
 */
function createBlockData(
  type: string = "block", 
  blockType: string = "bk-p", 
  preBlockId: UUID, 
  nextBlockId?: UUID | null | undefined
):BlockData<any> {
  return {
    index: 0,
    id: uuidv4(),
    type: type,
    parentId: null,
    preBlockId: preBlockId,
    nextBlockId: nextBlockId? nextBlockId : null,
    property: {
      type: blockType,
      styles: {
        color: null,
        backgroundColor: null
      },
      contents: []
    },
    children: []
  }
}

/**
 * blockData 복사
 * return BlockData<any>
 * @param blockData 
 */
function copyBlockData(blockData: BlockData<any>): BlockData<any> {
  return Object.assign({}, blockData, {
    id: uuidv4(),
    parentId: null,
    preBlockId: null,
    nextBlockId: null,
    children: []
  })
}

/**
 * block child 삽입 함수
 * return UUID[]
 * @param children 
 * @param insertPoint 
 * @param insertChildren 
 * @param deleteCount 
 */
function insertChild(children: UUID[], insertPoint: number, insertChildren: UUID[], deleteCount: number = 0):UUID[] {
  let newChildren = children.concat();
  
  if(children.length <= 1 || children.length === insertPoint) {
    if(deleteCount) {
      newChildren.pop();
    }
    newChildren = newChildren.concat(insertChildren);
  } else {
    newChildren.splice(insertPoint, deleteCount, ...insertChildren);
  }

  return newChildren
} 

/**
 * 새 block 삽입 함수
 * return BlockData<any>
 * @param preBlocks 
 * @param blockData 
 * @param preBlockIndex 
 */
function insertBlock(
  preBlocks:BlockData<any>[],
  blockData: BlockData<any>,
  preBlockIndex?: number
  ): BlockData<any>[] {

  let newBlocks:BlockData<any>[] = [...preBlocks];

  const preBlock: BlockData<any> | null = preBlockIndex? 
  newBlocks[preBlockIndex - 1] : null;
  
  const nextBlockId = blockData.nextBlockId? blockData.nextBlockId 
    : (preBlock? preBlock.nextBlockId : null)

  const nextBlockPosition:number = nextBlockId? newBlocks.findIndex(block => 
      block.id === nextBlockId
    ) : -1;

  const nextBlock: BlockData<any> | null = nextBlockPosition !== -1?
  newBlocks[nextBlockPosition] : null;

  const parentId = blockData.parentId;

  // block factory 함수를 만들어야 함.
  const newBlock: BlockData<any> = Object.assign({}, 
    blockData, {
      preBlockId: preBlock? preBlock.id 
      : ( parentId? null : newBlocks[newBlocks.length - 1].id ),
      nextBlockId: nextBlockId
    });

  if(parentId && !preBlockIndex) {
    const parentBlockPosition = newBlocks.findIndex(block => block.id === parentId);
    const parentBlock = newBlocks[parentBlockPosition];
    const insertPosion = 0;

    newBlocks[parentBlockPosition] = Object.assign({}, parentBlock, {
      children: insertChild(parentBlock.children, insertPosion, [newBlock.id])
    });
  } else if(preBlockIndex) {
    newBlocks[preBlockIndex - 1].nextBlockId = newBlock.id;

    if(preBlock && preBlock.parentId) {
      const parentBlockPosition = newBlocks.findIndex(block => block.id === preBlock.parentId);
      const parentBlock = newBlocks[parentBlockPosition];
      const insertPosion = parentBlock.children.indexOf(preBlock.id) + 1;

      newBlocks[parentBlockPosition] = Object.assign({}, parentBlock, {
        children: insertChild(parentBlock.children, insertPosion, [newBlock.id])
      });

      newBlock.parentId = preBlock.parentId;
    }
  } else {
    newBlocks[newBlocks.length - 1].nextBlockId = newBlock.id; 
  }

  if(nextBlock) {
    newBlocks[nextBlockPosition].preBlockId = newBlock.id;
  }

  if(newBlock.children[0]) {
    const newChildrenIndex = newBlock.children.map((child)=>{
      return newBlocks.findIndex(block => block.id === child);
    });
    console.log(newChildrenIndex, newBlock.children);

    const firstChild = newChildrenIndex[0];
    const lastChild  = newChildrenIndex[newChildrenIndex.length - 1];

    console.log(newBlocks[firstChild])
    // firstChild
    const childParentId = newBlocks[firstChild].parentId;
    newBlocks[firstChild].parentId = newBlock.id;
    newBlocks[firstChild].preBlockId = null;
    
    // lastChild
    newBlocks[lastChild].parentId = newBlock.id;
    const lastChildNextBlockId = newBlocks[lastChild].nextBlockId;
    newBlocks[lastChild].nextBlockId = null;

    if(lastChildNextBlockId) {
      const lastChildNextBlockIndex = newBlocks.findIndex(block => 
        block.id === nextBlockId
      );
      
      newBlocks[lastChildNextBlockIndex].preBlockId = newBlock.id;
    }

    if(childParentId) {
      const newParentIndex = newBlocks.findIndex(block => block.id === childParentId);
      newBlock.children.forEach((child) => {
        let index = newBlocks[newParentIndex].children.findIndex(removeChild => 
          removeChild === child
        );
        newBlocks[newParentIndex].children.splice(index, 1);
      })
    }
    
  }

  newBlocks.push(newBlock);
  console.log(newBlocks)
  
  return orderingBlock(newBlocks);
}

/**
 * 
 * @param blockDatas 
 * @param stagedBlock 
 */
function updateContents(
  blockData:BlockData<any>[], 
  stageData: StagedBlock[]
):BlockData<any>[] {

  let newBlocks      = [...blockData];

  stageData.forEach((block)=>{

    if(newBlocks[block.blockIndex - 1] && block.id === newBlocks[block.blockIndex - 1].id) {
      
      newBlocks[block.blockIndex - 1].property = Object.assign({}, 
        newBlocks[block.blockIndex - 1].property, {
          contents: typeof block.contents === "string"? 
                    parseHtmlContents(block.contents) : block.contents
      });

    } else {
      console.log("block이 제대로 정렬되지 않았습니다.");
    }

  });
  
  return newBlocks;
}

function excludeBlock(blocks: BlockData<any>[], deletedId: UUID) {
  let deletedBlocks = blocks.filter((block) => 
      block.id !== deletedId
    );

  const deletedBlock = blocks.filter((block)=>
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

  return orderingBlock(deletedBlocks);
}

const blocksUtils = {
  createBlockData,
  copyBlockData,
  insertBlock,
  insertChild,
  updateContents,
  excludeBlock
}

export default blocksUtils;