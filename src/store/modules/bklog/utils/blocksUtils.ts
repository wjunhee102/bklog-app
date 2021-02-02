import { v4 as uuidv4 } from 'uuid';
import { BlockData, UUID, RawBlockData } from '../../../../types/bklog';
import { orderingBlock, StagedBlock, parseHtmlContents } from './index';

interface ChangedData {
  id: UUID;
  data: any;
}

type Block = BlockData<any> | RawBlockData<any>

/**
 * blockData 생성 함수
 * return blockData<any>
 * @param type 
 * @param blockType 
 */
function createBlockData(
  type: string = "block", 
  blockType: string = "bk-p", 
  preBlockId: UUID | null, 
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

function copyBlock(
  preBlock: BlockData<any> | RawBlockData<any>, 
  preBlockId: UUID | null, 
  parentBlockId?: UUID
): BlockData<any> {
  return Object.assign({}, preBlock, {
    index: 0,
    id: uuidv4(),
    preBlockId,
    parentBlockId: parentBlockId? parentBlockId : null
  });
}

/**
 * blockList를 복사하는 함수.
 * @param blockDataList 
 */
function copyBlockDataList(
  blockDataList: Block[]
): Block[] {
  let newBlockDataList: Block[] = []; 
  let newPreBlockData: [UUID, number][] = [];
  let newParentBlockData: [UUID, number][] = [];

  for(let i = 0; i < blockDataList.length; i++) {
    const newBlock: Block = Object.assign({}, blockDataList[i], {
      id: uuidv4(),
      preBlockId: null,
      nextBlockId: null,
      parentId: null,
      children: []
    });

    if(blockDataList[i].parentId) {
      const parentData = newParentBlockData[newParentBlockData.length - 1];
      newBlock.parentId = parentData[0];
      const children = newBlockDataList[parentData[1]].children;
      newBlockDataList[parentData[1]].children = insertChild(children,
        children.length, 
        [newBlock.id]);
    }
    
    if(blockDataList[i].children[0]) {
      newParentBlockData.push([newBlock.id, i]);
    }

    if(blockDataList[i].preBlockId && newPreBlockData[0]) {
      const preBlockData = newPreBlockData.pop();
      if(preBlockData) {
        newBlock.preBlockId = preBlockData[0];
        newBlockDataList[preBlockData[1]].nextBlockId = newBlock.id;
      }
    }

    const preNextBlockId = blockDataList[i].nextBlockId;
    if(preNextBlockId) {
      if(blockDataList.findIndex(isBlockId(preNextBlockId)) === -1) {
        newBlock.nextBlockId = null;
      } else {
        newPreBlockData.push([newBlock.id, i]);
      }
    } else {
      newParentBlockData.pop();
    };
    console.log(i, newPreBlockData, newParentBlockData);

    newBlockDataList.push(newBlock);
  }

  return newBlockDataList;
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
  let newChildren = [...children];

  if(insertChildren) {
    
    if(children.length < 1 || children.length === insertPoint) {
      if(deleteCount && children.length >= 1) {
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
  preBlocks:Block[],
  blockDataList: Block[],
  preBlockId: UUID | null,
  parentBlockId?: UUID
): Block[] {
  let newBlocks: Block[] = [...preBlocks];
  const newBlockDataList = [...blockDataList];
  const firstPosition: number = 0;

  let currentBlockId: UUID | null = newBlockDataList[firstPosition].id;
  let newChildrenList: UUID[] = [];

  const preBlockPosition: number = preBlockId? 
    newBlocks.findIndex(isBlockId(preBlockId)) : -1;
  const preBlock: Block | null = preBlockId? 
    newBlocks[preBlockPosition] : null;
  
  const nextBlockPosition: number = preBlock && preBlock.nextBlockId?
    newBlocks.findIndex(isBlockId(preBlock.nextBlockId)) : -1;
  const nextBlock: Block | null = nextBlockPosition !== -1? 
    newBlocks[nextBlockPosition] : null;
  
  let parentId: UUID | null = parentBlockId
    ? parentBlockId 
    : (preBlock && preBlock.parentId? preBlock.parentId : null)

  while(currentBlockId) {
    const currentBlockPosition: number = newBlockDataList.findIndex(isBlockId(currentBlockId));
    const currentBlock: Block = newBlockDataList[currentBlockPosition];

    if(currentBlockPosition === firstPosition) {
      
      if(preBlock) {
        newBlockDataList[firstPosition].preBlockId = preBlock.id;
        newBlocks[preBlockPosition].nextBlockId = currentBlockId;
      } else {
        newBlockDataList[firstPosition].preBlockId = null;
      }
    }
  
    if(parentId) {
      newBlockDataList[currentBlockPosition].parentId = parentId;
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

  if(parentId) {
    const parentBlockPosition: number = newBlocks.findIndex(isBlockId(parentId));
    const parentBlock: Block = newBlocks[parentBlockPosition];
    const insertPosion: number  = preBlockId? 
      parentBlock.children.indexOf(preBlockId) + 1 : 0;
    const nextBlockPosition: number = !preBlockId? 
      newBlocks.findIndex(isBlockId(parentBlock.children[0])) : -1;

    if(nextBlockPosition !== -1) {
      const newBlockLastChild: UUID = newChildrenList[newChildrenList.length - 1];
      const newBlocklastChildPosition: number = newBlockDataList.findIndex(isBlockId(newBlockLastChild));
      newBlocks[nextBlockPosition].preBlockId = newBlockLastChild;
      newBlockDataList[newBlocklastChildPosition].nextBlockId = newBlocks[nextBlockPosition].id;
    }

    newBlocks[parentBlockPosition].children = insertChild(
      parentBlock.children, 
      insertPosion,
      newChildrenList  
    );
  }

  newBlocks = newBlocks.concat(newBlockDataList);

  return newBlocks;
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
// blockList를 넣었을 때 삭제하는 것이 필요할것 같음.
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

// 되돌아가기를 했을때 그 전 preBlockId를 기억하고 있으면 될 것 같음.
/**
 * block의 위치를 바꾸는 함수
 * @param preBlocks 
 * @param blockId 
 * @param preBlockId 
 */
function switchingBlock(
  preBlocks:BlockData<any>[],
  blockId: UUID,
  preBlockId: UUID | null,
  parentBlockId?: UUID
): Block[] {
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

  const preBlockPosition = preBlockId? newBlocks.findIndex(isBlockId(preBlockId)) : -1;
  const preBlock = parentBlockId? newBlocks[preBlockPosition] : null;

  const parentId = parentBlockId? parentBlockId : (preBlock? preBlock.parentId : null);
  
  let nextBlockPosition = preBlock && preBlock.nextBlockId?
    newBlocks.findIndex(isBlockId(preBlock.nextBlockId)) : -1;
  let nextBlock = nextBlockPosition !== -1? 
    newBlocks[nextBlockPosition] : null;

  currentBlock.preBlockId = preBlock? preBlock.id : null;

  if(preBlock) {
    newBlocks[preBlockPosition].nextBlockId = currentBlock.id;
  }

  if(parentId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(parentId));
    const parentBlock = newBlocks[parentBlockPosition];
    const insertPosion = preBlock && preBlock.parentId? 
      (parentBlock.children.indexOf(preBlock.id) + 1) : 0;

    if(parentBlock.children[0]) {
      const lastChild = parentBlock.children[parentBlock.children.length - 1];
      nextBlockPosition = newBlocks.findIndex(isBlockId(lastChild));
      nextBlock = newBlocks[nextBlockPosition];
    }

    currentBlock.parentId = parentBlock.id;  

    newBlocks[parentBlockPosition].children = insertChild(
      parentBlock.children, 
      insertPosion,
      [currentBlock.id]  
    );
  }

  if(nextBlock) {
    currentBlock.nextBlockId = nextBlock.id;
    newBlocks[nextBlockPosition].preBlockId = currentBlock.id;
  } else {
    currentBlock.nextBlockId = null;
  }

  newBlocks.push(currentBlock)

  return newBlocks;
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
    blocks: newBlocks,
    changedData
  };
}

const blocksUtils = {
  createBlockData,
  copyBlockData,
  copyBlockDataList,
  insertBlock,
  insertChild,
  updateContents,
  excludeBlock,
  switchingBlock,
  restoreBlock
}

export default blocksUtils;