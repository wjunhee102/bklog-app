import { UnionBlock } from "../../../entities/block/type";
import { HistoryBlockService } from "../../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";
import { BlockDataProps, UnionBlockGenericType } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { BlockPosition } from ".";

interface BlockMapValue {
  type: "child" | "next";
  block: UnionBlock;
}

/**
 * @param blockList 
 * @param currentIdx 
 * @returns 
 */
function setBlockMap(blockList: UnionBlock[], currentIdx: number): [ Map<string, BlockMapValue[]>, UnionBlock | null ] {
  const blockMap = new Map<string, BlockMapValue[]>();
  let firstBlock: UnionBlock | null = null;
  
  for(let index = currentIdx; index < blockList.length; index++) {
    const block = blockList[index];

    if(!block.previousId) {

      if(!block.parentId) {

        if(!firstBlock) {
          firstBlock = block;
        }
     
      } else {

        const childBlockValue: BlockMapValue = {
          type: "child",
          block
        }

        const blockMapValue = blockMap.get(block.parentId);

        if(!blockMapValue) {
          blockMap.set(block.parentId, [childBlockValue]);
        } else {
          blockMapValue.push(childBlockValue);
        }

      }

    } else {

      const nextBlockValue: BlockMapValue = {
        type: "next",
        block
      }

      const blockMapValue = blockMap.get(block.previousId);

      if(!blockMapValue) {
        blockMap.set(block.previousId, [nextBlockValue]);
      } else {
        blockMapValue.push(nextBlockValue);
      }

    }
  }

  return [ blockMap, firstBlock ];
}


function sortBlockMapValue(a: BlockMapValue, b: BlockMapValue) {  
  return b.type === "child"? 1 : -1;
}

/**
 * 새 배열 반환
 * @param blockList 
 * @returns 
 */
export function sortBlockList(blockList: UnionBlock[]): UnionBlock[] {
  const length = blockList.length;
  const newBlockList = [];
  
  let index = 0;
  let previousBlock: UnionBlock | undefined = blockList[0];
 
  if(!previousBlock.previousId && !previousBlock.parentId) {
    newBlockList.push(previousBlock);
    
    index++;

    for(; index < length; index++) {
      if(!blockList[index].previousId) {
        if(previousBlock.id !== blockList[index].parentId) break;
      } else {
        if(previousBlock.id !== blockList[index].previousId) break;
      }

      previousBlock = blockList[index];

      newBlockList.push(previousBlock);
    }
  }

  if(index === length) return newBlockList;

  const [ blockMap, firstBlock ] = setBlockMap(blockList, index);

  previousBlock = firstBlock? firstBlock : blockList[index];
  index++;
  newBlockList.push(previousBlock);

  const blockStack: UnionBlock[] = [];

  let currentBlock: UnionBlock | undefined = undefined;

  for(; index < length; index++) {
    const blockMapValueList = blockMap.get(previousBlock.id);
    
    if(!blockMapValueList) {
      if(!blockStack[0]) break;
      
      currentBlock = blockStack.pop();

      if(!currentBlock) throw new Error("test.js line 126: pop error");
    } else {
      blockMapValueList.sort(sortBlockMapValue);

      for(let i = blockMapValueList.length - 1; i > 0; i--) {
        blockStack.push(blockMapValueList[i].block);
      }

      currentBlock = blockMapValueList[0].block;
    } 
    
    newBlockList.push(currentBlock);

    previousBlock = currentBlock;
  }

  if(newBlockList.length === length) return newBlockList;

  blockStack.forEach(block => {
    newBlockList.push(block);
  });

  if(newBlockList.length === length) return newBlockList;

  const newBlockMap: Map<string, UnionBlock> = new Map();

  newBlockList.forEach(block => {
    newBlockMap.set(block.id, block);
  });

  blockList.forEach(block => {
    if(!newBlockMap.has(block.id)) newBlockList.push(block);
  });

  if(newBlockList.length !== length) throw new Error("The same block id may exist.");
  
  return newBlockList;
}

/**
  * 부모의 첫번째 자식요소는 previousId가 null임.
  * 
  * flag
  * previousBlock.id === previousId     SAME_PREVIOUS
  * previousBlock.parentId === parentId SAME_PRE_PARENT
  * previousBLock.id === parentId       SAME_PARENT
  * 
  * 이전 block.id와 previousId가 같고 이전 block의 parentId와 parentId가 같은 경우
  *  -> pass 
  * 이전 block.id와 previousId가 같고 이전 block의 parentId와 parentId가 같지 않은 경우 
  *  -> 이전 block의 parentId를 할당
  * 이전 block.id와 previousId가 같지 않고 이전 block의 parentId와 parentId가 같은 경우
  *  -> 이전 block의 id를 previousId의 할당
  * 이전 block.id와 previousId가 같지 않고 이전 block.id와 parendId가 같은 경우
  *  -> blockStack에 이전 block을 push, previousId는 null, 이전 block id를 parentId에 할당.
  * 이전 block.id와 previousId가 같지 않고 이전 block의 parentId와 parentId가 같지 않은 경우
  *  -> blockStack의 마지막 요소를 previousBlock에 할당.
*/ 
const SAME_PREVIOUS = 1;
const SAME_PRE_PARENT = 2;
const SAME_PARENT = 4;

function compareBlockId(previousBlock: UnionBlock, currentBlock: UnionBlock): number {
  let result = 0;

  if(previousBlock.id === currentBlock.previousId)     result |= SAME_PREVIOUS;
  if(previousBlock.parentId === currentBlock.parentId) result |= SAME_PRE_PARENT;
  if(previousBlock.id === currentBlock.parentId)       result |= SAME_PARENT;

  return result;
}

interface ResReconcilBlock {
  block: UnionBlock;
  toBeStackedBlock?: UnionBlock;
  blockTokens?: {
    modifyBlockToken: ModifyBlockToken;
    historyBlockToken: HistoryBlockToken;
  }
}

function commitBlock(
  currentBlock: UnionBlock,
  blockDataProps: BlockDataProps<UnionBlockGenericType>,
  previousBlock?: UnionBlock
): ResReconcilBlock {

  const preProps = currentBlock.updateBlock(blockDataProps);
  
  return {
    block: currentBlock,
    blockTokens: {
      historyBlockToken: new HistoryBlockToken(
        HistoryBlockService
        .setUpdateModifyData(currentBlock.id, currentBlock.type, preProps)
      ),
      modifyBlockToken: new ModifyBlockToken(
        ModifyBlockService
        .setUpdateModifyData(currentBlock.id, currentBlock.type, blockDataProps)
      )
    },
    toBeStackedBlock: previousBlock
  }
}

function reconcileBlock(
  previousBlock: UnionBlock, 
  currentBlock: UnionBlock
): ResReconcilBlock | null {
  const result = compareBlockId(previousBlock, currentBlock);

  if(result & SAME_PREVIOUS) {
    if(result & SAME_PRE_PARENT) {     
      return {
        block: currentBlock
      }
    } 
    
    return commitBlock(currentBlock, {
      parentId: previousBlock.parentId
    });
  } 

  if(result & SAME_PRE_PARENT) {

    return commitBlock(currentBlock, { 
      previousId: previousBlock.id
    });
  }

  if(result & SAME_PARENT) {
    
    if(currentBlock.previousId) {
      return commitBlock(currentBlock, {
        previousId: null
      }, previousBlock);
    } 

    return {
      block: currentBlock,
      toBeStackedBlock: previousBlock
    }
  }

  return null;
}

/**
 * 원본 배열에 반영
 * @param blockList 
 * @param targetIdList 
 * @returns 
 */
export function positioningBlock(blockList: UnionBlock[], firstBlockPosition: BlockPosition = {
  previousId: null,
  parentId: null
}) {

  const length = blockList.length;
  const modifyBlockTokenList: ModifyBlockToken[] = [];
  const historyBlockTokenList: HistoryBlockToken[] = [];
  const blockStack: UnionBlock[] = [];
 
  let previousBlock: UnionBlock | null = blockList[0];

  if(previousBlock.parentId || previousBlock.previousId) {
    const modifyBlockDataProps: BlockDataProps<UnionBlockGenericType> = {};
    const historyBlockDataProps: BlockDataProps<UnionBlockGenericType> = {};

    if(previousBlock.parentId !== firstBlockPosition.parentId) {
      historyBlockDataProps.parentId = previousBlock.parentId;
      modifyBlockDataProps.parentId = firstBlockPosition.parentId;
    }
    
    if(previousBlock.previousId !== firstBlockPosition.previousId) {
      historyBlockDataProps.previousId = previousBlock.previousId;
      modifyBlockDataProps.previousId = firstBlockPosition.previousId;
    }

    previousBlock.updateBlock(modifyBlockDataProps);

    modifyBlockTokenList.push(new ModifyBlockToken(
      ModifyBlockService
      .setUpdateModifyData(previousBlock.id, previousBlock.type, modifyBlockDataProps)
    ));
    historyBlockTokenList.push(new HistoryBlockToken(
      HistoryBlockService
      .setUpdateModifyData(previousBlock.id, previousBlock.type, historyBlockDataProps)
    ));
  }

  for(let index = 1; index < length; index++) {
   
    let currentBlock: UnionBlock | undefined  = blockList[index] as UnionBlock;

    const result = reconcileBlock(previousBlock, currentBlock);

    if(result) {
      const { block, blockTokens, toBeStackedBlock } = result;

      if(blockTokens) {
        if(blockTokens.modifyBlockToken) modifyBlockTokenList.push(blockTokens.modifyBlockToken);
        historyBlockTokenList.push(blockTokens.historyBlockToken);
      }

      if(toBeStackedBlock) blockStack.push(toBeStackedBlock);

      previousBlock = block;

      continue;
    }

    while(blockStack[0]) {
      const block = blockStack.pop();
    
      if(!block) break;

      previousBlock = block;

      const result = reconcileBlock(previousBlock, currentBlock);

      if(result) {
        const { block, blockTokens, toBeStackedBlock } = result;

        if(blockTokens) {
          if(blockTokens.modifyBlockToken) modifyBlockTokenList.push(blockTokens.modifyBlockToken);
          historyBlockTokenList.push(blockTokens.historyBlockToken);
        }
  
        if(toBeStackedBlock) blockStack.push(toBeStackedBlock);
  
        previousBlock = block;
  
        break;
      }

    }

    if(previousBlock.id === currentBlock.id) continue;

    const preProps = currentBlock.updateBlock({
      previousId: previousBlock.id,
      parentId: previousBlock.parentId
    });

    modifyBlockTokenList.push(new ModifyBlockToken(
      ModifyBlockService
      .setUpdateModifyData(currentBlock.id, currentBlock.type, { 
        previousId: previousBlock.id,
        parentId: previousBlock.parentId
      })
    ));
    historyBlockTokenList.push(new HistoryBlockToken(
      HistoryBlockService
      .setUpdateModifyData(currentBlock.id, currentBlock.type, preProps)
    ));

    previousBlock = currentBlock;
  }

  return {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

/**
 * 원본 배열에 반영
 * @param targetBlockList 
 * @param targetId 
 * @param previous 
 * @returns 
 */
function resetToTargetPosition(
  targetBlockList: UnionBlock[],
  targetBlockPosition: BlockPosition
) {
  if(!targetBlockList[0]) throw new Error("positioning.ts resetToTargetPosition: blockList does not exist");
  return positioningBlock(targetBlockList, targetBlockPosition);
}

export default {
  sortBlockList,
  positioningBlock,
  resetToTargetPosition
}