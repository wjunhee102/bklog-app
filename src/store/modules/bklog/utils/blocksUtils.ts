import { v4 as uuidv4 } from 'uuid';
import { BlockData, UUID, RawBlockData } from '../../../../types/bklog';
import { StagedBlock, parseHtmlContents } from './index';

interface ChangedData {
  id: UUID;
  data: any;
}

type Block = BlockData | RawBlockData;

/**
 * 
 * @param array 
 */
function copyToNewObjectArray<T = any>(array: T[]): T[] {
  return array.map((object: T) => Object.assign({}, object));
}
  

/**
 * blockData 생성 함수
 * return blockData<any>
 * @param type 
 * @param blockType 
 */
function createBlockData(
  type: string = "text", 
  blockType: string = "bk-p", 
  preBlockId: UUID | null, 
  nextBlockId?: UUID | null | undefined
): BlockData {
  return {
    index: 0,
    id: uuidv4(),
    type: type,
    parentBlockId: null,
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
    parentBlockId: null,
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
      parentBlockId: null,
      children: []
    });

    if(blockDataList[i].parentBlockId) {
      const parentData = newParentBlockData[newParentBlockData.length - 1];
      newBlock.parentBlockId = parentData[0];
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

  if(insertChildren[0]) {
    
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

  return newChildren;
} 

/**
 * block id filter 함수
 * @param id 
 */
const isBlockId = (id: UUID | null) => 
  (block: BlockData | RawBlockData) => 
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
  parentId?: UUID
): Block[] {
  let newBlocks: Block[] = copyToNewObjectArray<Block>(preBlocks);
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
  
  let parentBlockId: UUID | null = parentId
    ? parentId 
    : (preBlock && preBlock.parentBlockId? preBlock.parentBlockId : null)

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
  
    if(parentBlockId) {
      newBlockDataList[currentBlockPosition].parentBlockId = parentBlockId;
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

  if(parentBlockId) {
    const parentBlockPosition: number = newBlocks.findIndex(isBlockId(parentBlockId));
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

  let newBlocks = copyToNewObjectArray<BlockData>(blockData);

  stageData.forEach((block)=>{

    if(newBlocks[block.blockIndex - 1] && block.id === newBlocks[block.blockIndex - 1].id) {
      
      if(newBlocks[block.blockIndex - 1].type === "text" || newBlocks[block.blockIndex - 1].type === "title") {
        newBlocks[block.blockIndex - 1].property = Object.assign({}, 
          newBlocks[block.blockIndex - 1].property, {
            contents: typeof block.contents === "string"? 
                      parseHtmlContents(block.contents) : block.contents
        });
      }
      
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
function excludeBlock(blocks: BlockData<any>[], id: UUID): BlockData<any>[] {
  const deletedId = id;
  const deletedBlock = blocks.filter(isBlockId(deletedId))[0];
  const preBlockId = deletedBlock.preBlockId;
  const nextBlockId = deletedBlock.nextBlockId;
  const parentBlockId = deletedBlock.parentBlockId;

  if(deletedBlock.type === "title") {
    console.log("title은 삭제할 수 없습니다.")
    return blocks
  } 

  let deletedBlocks = blocks.filter(isNotBlockId(deletedId));

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
      deletedBlocks[child].parentBlockId = parentBlockId;
    });
  } 

  if(parentBlockId) {
    const parentBlockPosition = deletedBlocks.findIndex(isBlockId(parentBlockId));
    const parentBlock = deletedBlocks[parentBlockPosition];
    const deletePosition = parentBlock.children.indexOf(deletedId);

    deletedBlocks[parentBlockPosition] = Object.assign({}, parentBlock, {
      children: deletedBlock.children[0] ?
      insertChild(parentBlock.children, deletePosition, deletedBlock.children, 1)
      : parentBlock.children.filter((child) => child !== deletedId)
    })
  }

  if(preBlockId) {
    const preBlockPosition = deletedBlocks.findIndex(isBlockId(preBlockId));
    deletedBlocks[preBlockPosition].nextBlockId = newNextBlockId;
  }

  if(nextBlockId) {
    const nextBlockPosition = deletedBlocks.findIndex(isBlockId(nextBlockId));
    deletedBlocks[nextBlockPosition].preBlockId = newPreBlockId;
  }

  console.log("deletedBlocks",deletedBlocks, deletedId, deletedBlock, blocks);
  return deletedBlocks;
}

/**
 * 
 * @param blocks 
 * @param blockIdList 지워질 blockList들은 서로 연결이 되어 있어야 함.
 */
function excludeBlockList(blocks: BlockData[], blockIdList: UUID[]) {

  let deletedBlocks: BlockData[] = copyToNewObjectArray<BlockData>(blocks);
  let currentBlockId: UUID | null = blockIdList[0];

  let preBlockData: [UUID, number] | null = null;
  let nextBlockData: [UUID, number] | null = null;

  while(currentBlockId) {
    const currentBlock: BlockData<any> = blocks.filter(isBlockId(currentBlockId))[0];

    let preBlockId = currentBlock.preBlockId;
    let nextBlockId = currentBlock.nextBlockId;
    let parentBlockId = currentBlock.parentBlockId;

    if((!preBlockId && !parentBlockId) || currentBlock.type === "title") {
      console.log("title은 삭제할 수 없습니다.")
      return blocks
    } 

    if(parentBlockId) {
      const parentPosition = deletedBlocks.findIndex(isBlockId(parentBlockId));

      deletedBlocks[parentPosition].children = deletedBlocks[parentPosition].children.filter((child)=>
        child !== currentBlock.id
      );
    }
    
    if(preBlockId) {
      const findCheck = blockIdList.find((id)=> id === preBlockId);
      if(!findCheck) {
        const preBlockPosition = deletedBlocks.findIndex(isBlockId(preBlockId));
        preBlockData = [preBlockId, preBlockPosition];
      }
    }

    if(nextBlockId) {
      const findCheck = blockIdList.find((id)=> id === nextBlockId);
      if(!findCheck) {
        const nextBlockPosition = deletedBlocks.findIndex(isBlockId(nextBlockId));
        nextBlockData = [nextBlockId, nextBlockPosition];

        currentBlockId = null;
      } else {
        currentBlockId = nextBlockId;
      }
    } else {
      currentBlockId = null;
    }

  }

  if(preBlockData && nextBlockData) {
    deletedBlocks[preBlockData[1]].nextBlockId = nextBlockData[0];
    deletedBlocks[nextBlockData[1]].preBlockId = preBlockData[0];
  } else if(preBlockData) {
    deletedBlocks[preBlockData[1]].nextBlockId = null;
  } else if(nextBlockData) {
    deletedBlocks[nextBlockData[1]].preBlockId = null;
  } 

  for(let i = 0; i < blockIdList.length; i++) {
    deletedBlocks = deletedBlocks.filter(isNotBlockId(blockIdList[i]));
  }

  return deletedBlocks;
}

// 되돌아가기를 했을때 그 전 preBlockId를 기억하고 있으면 될 것 같음.
// 인자를 좀 더 명확하게 해야겠음.

/**
 * block의 위치를 바꾸는 함수.
 * @param preBlocks 
 * @param blockId 
 * @param targetBlockId 
 * @param type 
 */
function switchingBlock(
  preBlocks:BlockData[],
  blockId: UUID,
  targetBlockId: UUID,
  parentType: boolean = false
): BlockData[] {

  const currentBlock = preBlocks.filter(isBlockId(blockId))[0];
  if(!currentBlock) {
    console.log("currentBlock을 찾을 수 없습니다.");
    return preBlocks;
  } 
  if(currentBlock.children[0]) {
    if(currentBlock.children.indexOf(targetBlockId) !== -1) {
      console.log("targetId가 currentId의 자식 요소입니다.")
      return preBlocks;
    }
  }
  const newBlocks = preBlocks.filter(isNotBlockId(blockId));

  let currentPreBlockPosition: number = newBlocks.findIndex(isBlockId(currentBlock.preBlockId));
  let currentNextBlockPosition: number = newBlocks.findIndex(isBlockId(currentBlock.nextBlockId));
  let currentParentBlockPosition: number = newBlocks.findIndex(isBlockId(currentBlock.parentBlockId));
  
  if(currentPreBlockPosition !== -1) {
    newBlocks[currentPreBlockPosition].nextBlockId = currentBlock.nextBlockId;
  }
  if(currentNextBlockPosition !== -1) {
    newBlocks[currentNextBlockPosition].preBlockId = currentBlock.preBlockId;
  }
  if(currentParentBlockPosition !== -1) {
    let currentParentBlock = newBlocks[currentParentBlockPosition];
    currentParentBlock.children = currentParentBlock.children.filter((child) => child !== currentBlock.id);
  }

  currentBlock.preBlockId = null;
  currentBlock.nextBlockId = null;
  currentBlock.parentBlockId = null;
  
  let targetBlockPosition: number = newBlocks.findIndex(isBlockId(targetBlockId));
  let preBlock: BlockData | null = !parentType? 
    newBlocks[targetBlockPosition] : null;

  let preBlockParentId: string | null = preBlock? preBlock.parentBlockId : null;
  let parentBlockPosition: number | null = parentType?
    newBlocks.findIndex(isBlockId(targetBlockId)) 
    : preBlockParentId? 
    newBlocks.findIndex(isBlockId(preBlockParentId))
    : null;  
  let parentBlock: BlockData | null = parentBlockPosition? 
    newBlocks[parentBlockPosition] 
    : null;

  if(preBlock) {
    let nextBlockId = preBlock.nextBlockId;
    let nextBlockPosition: number = newBlocks.findIndex(isBlockId(nextBlockId));
    preBlock.nextBlockId = currentBlock.id;
    currentBlock.preBlockId = preBlock.id;

    if(nextBlockPosition !== -1) {
      newBlocks[nextBlockPosition].preBlockId = currentBlock.id;
      currentBlock.nextBlockId = newBlocks[nextBlockPosition].id;
    } else {
      currentBlock.nextBlockId = null;
    }

  }

  if(parentBlock) {
    const insertPosition = preBlock && preBlock.parentBlockId? 
      (parentBlock.children.indexOf(preBlock.id) + 1) : 0;

    // 문제가 될 수 있는 요소
    let nextBlockId = preBlock && preBlock.nextBlockId? null : parentBlock.children[0];
    parentBlock.children = insertChild(
                              parentBlock.children, 
                              insertPosition,
                              [currentBlock.id]
                            );            
                            
    if(nextBlockId) {
      let nextBlockPosition: number = newBlocks.findIndex(isBlockId(nextBlockId));
      newBlocks[nextBlockPosition].preBlockId = currentBlock.id;
      currentBlock.nextBlockId = nextBlockId;
    }       
    if(!insertPosition) {
      currentBlock.preBlockId = null;
    }
  }

  currentBlock.parentBlockId = parentBlock? parentBlock.id : null;

  newBlocks.push(currentBlock);
  
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

  const newBlocks = copyToNewObjectArray<BlockData>(preBlocks);

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
  
  if(currentBlock.parentBlockId) {
    const parentBlockPosition = newBlocks.findIndex(isBlockId(currentBlock.parentBlockId));
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

      const preParentBlockId = newBlocks[childPosition].parentBlockId;
      if(preParentBlockId) {
        const preParentPosition = newBlocks.findIndex(isBlockId(preParentBlockId));
        newBlocks[preParentPosition].children = newBlocks[preParentPosition].children.filter(child => 
          child !== childId
        );

        if(childPosition === currentBlock.children.length -1) {
          changedData.push({
            id: preParentBlockId,
            data: [
              {
                children: newBlocks[preParentPosition].children
              }
            ]
          }); 
        }

      }

      newBlocks[childPosition].parentBlockId = currentBlock.id;
      childChangedData.push({
        parentBlockId: currentBlock.id
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
  excludeBlockList,
  switchingBlock,
  restoreBlock
}

export default blocksUtils;