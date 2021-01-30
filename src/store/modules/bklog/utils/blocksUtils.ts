import { v4 as uuidv4 } from 'uuid';
import { BlockData, UUID, RawBlockData } from '../../../../types/bklog';
import { orderingBlock, StagedBlock, parseHtmlContents } from './index';

interface ChangedData {
  id: UUID;
  data: any;
}

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
function insertChild(
  children: UUID[], 
  insertPoint: number, 
  insertChildren: UUID[], 
  deleteCount: number = 0
):UUID[] {
  let newChildren = children.concat();

  if(insertChildren) {
    if(children.length <= 1 || children.length === insertPoint) {
      if(deleteCount) {
        newChildren.pop();
      }
      newChildren = newChildren.concat(insertChildren);
    } else {
      newChildren.splice(insertPoint, deleteCount, ...insertChildren);
    }
  } else {
    newChildren.splice(insertPoint, deleteCount);
  }
  
  return newChildren
} 

/**
 * block id filter 함수
 * @param id 
 */
const isBlockId = (id: UUID | null) => 
  (block: BlockData<any> | RawBlockData<any>) => 
  block.id === id;

/**
 * blockList를 삽입하는 함수
 * @param preBlocks 
 * @param blockDataList 
 * @param preBlockId 
 */
function insertBlock(
  preBlocks:BlockData<any>[],
  blockDataList: BlockData<any>[],
  preBlockId: UUID
): BlockData<any>[] {
  let newBlocks: BlockData<any>[] = [...preBlocks];
  const newBlockDataList = [...blockDataList];

  const preBlockPosition = newBlocks.findIndex(isBlockId(preBlockId));
  const preBlock = newBlocks[preBlockPosition];
  
  const nextBlockPosition = preBlock.nextBlockId?
    newBlocks.findIndex(isBlockId(preBlock.nextBlockId)) : -1;
  const nextBlock = nextBlockPosition !== -1? 
    newBlocks[nextBlockPosition] : null;
  
  let currentBlockId: UUID | null = newBlockDataList[0].id;
  let newChildrenList: UUID[] = [];

  while(currentBlockId) {
    const currentBlockPosition = newBlockDataList.findIndex(isBlockId(currentBlockId));
    const currentBlock = newBlockDataList[currentBlockPosition];

    if(currentBlockPosition === 0) {
      newBlockDataList[0].preBlockId = preBlock.id;
      newBlocks[preBlockPosition].nextBlockId = currentBlockId;
    }
  
    if(preBlock.parentId) {
      newBlockDataList[currentBlockPosition].parentId = preBlock.parentId;
      newChildrenList.push(currentBlockId);
    }

    if(!currentBlock.nextBlockId) {
      if(nextBlock) {
        newBlockDataList[currentBlockPosition].nextBlockId = nextBlock.id;
        newBlocks[nextBlockPosition].preBlockId = currentBlockId;
      }
      currentBlockId = null;
    } else {
      currentBlockId = currentBlock.nextBlockId;
    }

  }

  if(preBlock.parentId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(preBlock.parentId));
    const parentBlock = newBlocks[parentBlockPosition];
    const insertPosion = parentBlock.children.indexOf(preBlock.id) + 1;

    newBlocks[parentBlockPosition].children = insertChild(
      parentBlock.children, 
      insertPosion,
      newChildrenList  
    );
  }

  newBlocks = newBlocks.concat(newBlockDataList);

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

const isNotBlockId = (id: UUID) => 
  (block:BlockData<any>) => block.id !== id;
/**
 * block 제외 함수
 * @param blocks 
 * @param id 
 */
function excludeBlock(blocks: BlockData<any>[], id: UUID) {
  // 왜 이렇게 안하면 값이 바뀌지?
  const deletedId = id;
  let deletedBlocks = blocks.filter(isNotBlockId(deletedId));

  const deletedBlock = blocks.filter(isBlockId(deletedId))[0];

  const preBlockId = deletedBlock.preBlockId;
  const nextBlockId = deletedBlock.nextBlockId;
  const parentId = deletedBlock.parentId;

  let newPreBlockId = preBlockId;
  let newNextBlockId = nextBlockId;


  if(deletedBlock.children[0]) {
    let childPositionList:number[] = [];
    deletedBlock.children.forEach(child => {
      childPositionList.push(deletedBlocks.findIndex(isBlockId(child)));
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
    const parentBlockPosition = deletedBlocks.findIndex(isBlockId(parentId));
    const parentBlock = deletedBlocks[parentBlockPosition];
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

  console.log("deletedBlocks",deletedBlocks, deletedId, deletedBlock, blocks);
  return orderingBlock(deletedBlocks);
}

/**
 * block의 위치를 바꾸는 함수
 * @param preBlocks 
 * @param blockId 
 * @param preBlockId 
 */
function switchingBlock(
  preBlocks:BlockData<any>[],
  blockId: UUID,
  preBlockId: UUID
): BlockData<any>[] {
  let newBlocks: BlockData<any>[] = preBlocks.filter(isNotBlockId(blockId));
  const currentBlock = preBlocks.filter(isBlockId(blockId))[0];

  if(currentBlock.preBlockId) {
    const preBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.preBlockId));
    const preBlockId = newBlocks[preBlockPosition].id;
    if(currentBlock.nextBlockId) {
      const nextBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.nextBlockId));
      const nextBlockId = newBlocks[nextBlockPosition].id;
      newBlocks[nextBlockPosition].preBlockId = preBlockId;
      newBlocks[preBlockPosition].nextBlockId = nextBlockId;
    } else {
      newBlocks[preBlockPosition].nextBlockId = null;
    }
  }

  if(currentBlock.parentId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.parentId));
    newBlocks[parentBlockPosition].children = newBlocks[parentBlockPosition].children.filter(child => 
      child !== currentBlock.id);

    currentBlock.parentId = null;
  }

  const preBlockPosition = newBlocks.findIndex(isBlockId(preBlockId));
  const preBlock = newBlocks[preBlockPosition];
  
  const nextBlockPosition = preBlock.nextBlockId?
    newBlocks.findIndex(isBlockId(preBlock.nextBlockId)) : -1;
  const nextBlock = nextBlockPosition !== -1? 
    newBlocks[nextBlockPosition] : null;

  currentBlock.preBlockId = preBlock.id;
  newBlocks[preBlockPosition].nextBlockId = currentBlock.id;

  if(nextBlock) {
    currentBlock.nextBlockId = nextBlock.id;
    newBlocks[nextBlockPosition].preBlockId = currentBlock.id;
  } else {
    currentBlock.nextBlockId = null;
  }

  if(preBlock.parentId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(preBlock.parentId));
    const parentBlock = newBlocks[parentBlockPosition];
    const insertPosion = parentBlock.children.indexOf(preBlock.id) + 1;

    newBlocks[parentBlockPosition].children = insertChild(
      parentBlock.children, 
      insertPosion,
      [currentBlock.id]  
    );
  }

  newBlocks.push(currentBlock)

  return orderingBlock(newBlocks);
}


/**
 * block 복구
 * @param preBlocks 
 * @param blockData 
 */
function restoreBlock(
  preBlocks: BlockData<any>[],
  blockData: BlockData<any>
) {
  
  const changedData:ChangedData[] = []; 

  const currentBlock = Object.assign({}, blockData);
  changedData.push({
    id: currentBlock.id,
    data: [blockData]
  });

  const newBlocks = [...preBlocks];

  if(currentBlock.preBlockId) {
    const preBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.preBlockId));

    newBlocks[preBlockPosition].nextBlockId = currentBlock.id;
    changedData.push({
      id: newBlocks[preBlockPosition].id,
      data: [{
        nextBlockId: newBlocks[preBlockPosition].nextBlockId
      }]
    });
  }

  if(currentBlock.nextBlockId) {
    const nextBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.nextBlockId));

    newBlocks[nextBlockPosition].preBlockId = currentBlock.id;
    changedData.push({
      id: newBlocks[nextBlockPosition].id,
      data: [{
        preBlockId: newBlocks[nextBlockPosition].preBlockId
      }]
    });
  }
  
  if(currentBlock.parentId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.parentId));
    let insertPoint: number = 0;
    if(currentBlock.preBlockId) {
      insertPoint = newBlocks[parentBlockPosition].children.findIndex(child => 
        child === currentBlock.preBlockId ) + 1;
    }

    newBlocks[parentBlockPosition].children = insertChild(
      newBlocks[parentBlockPosition].children,
      insertPoint,
      [currentBlock.id]
    );
    changedData.push({
      id: newBlocks[parentBlockPosition].id,
      data: [{
        children: newBlocks[parentBlockPosition].children
      }]
    });
  }

  if(currentBlock.children[0]) {

    for(let i = 0; i < currentBlock.children.length; i++) {

      const childId = currentBlock.children[i];
      const childPosition = newBlocks.findIndex(isBlockId(childId));
      const childChangedData: any = [];

      if(i === 0) {
        newBlocks[childPosition].preBlockId = null;
        childChangedData.push({
          preBlockId: null
        });
      }

      if(i === currentBlock.children.length -1) {
        newBlocks[childPosition].nextBlockId = null;
        childChangedData.push({
          nextBlockId: null
        });
      }

      const preParentId = newBlocks[childPosition].parentId;
      if(preParentId) {
        const preParentPosition = newBlocks.findIndex(isBlockId(preParentId));
        newBlocks[preParentPosition].children = newBlocks[preParentPosition].children.filter(child => 
          child !== childId
        );

        if(childPosition === currentBlock.children.length -1) {
          changedData.push({
            id: preParentId,
            data: [
              {
                children: newBlocks[preParentPosition].children
              }
            ]
          }); 
        }

      }

      newBlocks[childPosition].parentId = currentBlock.id;
      childChangedData.push({
        parentId: currentBlock.id
      })

      changedData.push({
        id: newBlocks[childPosition].id,
        data: [...childChangedData]
      });

    }
    
  }

  newBlocks.push(currentBlock);

  return {
    blocks: orderingBlock(newBlocks),
    changedData
  };
}

const blocksUtils = {
  createBlockData,
  copyBlockData,
  insertBlock,
  insertChild,
  updateContents,
  excludeBlock,
  switchingBlock,
  restoreBlock
}

export default blocksUtils;