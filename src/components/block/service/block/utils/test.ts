import { BlockDataProps, UnionBlockGenericType } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";


interface RawBlockData {
  id: string;
  parentId: string | null;
  previousId: string | null;
}

interface BlockMapValue {
  type: "child" | "next";
  block: RawBlockData;
}

function setBlockMap(blockList: RawBlockData[], currentIdx: number): [ Map<string, BlockMapValue[]>, RawBlockData | null ] {
  const blockMap = new Map<string, BlockMapValue[]>();
  let firstBlock: RawBlockData | null = null;
  
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

export function sort(blockList: RawBlockData[]): RawBlockData[] {
  const length = blockList.length;
  const newBlockList = [];
  
  let index = 0;
  let previousBlock: RawBlockData | undefined = blockList[0];
 
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

  const blockStack: RawBlockData[] = [];

  let currentBlock: RawBlockData | undefined = undefined;

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

  const newBlockMap: Map<string, RawBlockData> = new Map();

  newBlockList.forEach(block => {
    newBlockMap.set(block.id, block);
  });

  blockList.forEach(block => {
    if(!newBlockMap.has(block.id)) newBlockList.push(block);
  });

  if(newBlockList.length !== length) throw new Error("The same block id may exist.");
  
  return newBlockList;
}

type TempM = any;
type TempG = any;

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

function compareBlockId(previousBlock: RawBlockData, currentBlock: RawBlockData): number {
  let result = 0;

  if(previousBlock.id === currentBlock.previousId)     result |= SAME_PREVIOUS;
  if(previousBlock.parentId === currentBlock.parentId) result |= SAME_PRE_PARENT;
  if(previousBlock.id === currentBlock.parentId)       result |= SAME_PARENT;

  return result;
}

interface ResReconcilBlock {
  block: RawBlockData;
  toBeStackedBlock?: RawBlockData;
  blockTokens?: {
    modifyBlockToken: TempG;
    historyBlockToken: TempG;
  }
}

function reconcileBlock(previousBlock: RawBlockData, currentBlock: RawBlockData): ResReconcilBlock | null {
  const result = compareBlockId(previousBlock, currentBlock);

  if(result & SAME_PREVIOUS) {
    if(result & SAME_PRE_PARENT) {      
      return {
        block: currentBlock
      }
    } 
    const modifyBlockToken = { parentId: previousBlock.parentId };
    const historyBlockToken = { parentId: currentBlock.parentId };

    currentBlock.parentId = previousBlock.parentId;
    
    return {
      block: currentBlock,
      blockTokens: {
        modifyBlockToken,
        historyBlockToken
      }
    }
  } 

  if(result & SAME_PRE_PARENT) {
    const modifyBlockToken = { previousId: previousBlock.id };
    const historyBlockToken = { previousId: currentBlock.previousId };

    currentBlock.previousId = previousBlock.id;

    return {
      block: currentBlock,
      blockTokens: {
        modifyBlockToken,
        historyBlockToken
      }
    }
  }

  if(result & SAME_PARENT) {
    
    if(currentBlock.previousId) {
      const modifyBlockToken = { previousId: null };
      const historyBlockToken = { previousId: currentBlock.previousId };

      currentBlock.previousId = null;

      return {
        block: currentBlock,
        blockTokens: {
          modifyBlockToken,
          historyBlockToken
        },
        toBeStackedBlock: previousBlock
      }
    } 
    
    return {
      block: currentBlock,
      toBeStackedBlock: previousBlock
    }

  }

  return null;
}

const EDIT = "#edit";
const END = "#end";
export function ordering(blockList: RawBlockData[], targetIdList?: string[]) {

  const length = blockList.length;
  const modifyBlockTokenList: TempG[] = [];
  const historyBlockTokenList: TempG[] = [];
  const blockStack: RawBlockData[] = [];

  let targetIdListIndex = 0;
  let targetId: string | null = !targetIdList? EDIT : targetIdList[targetIdListIndex];
  let endPointId: string = END;
 
  let previousBlock: RawBlockData | null = blockList[0];

  if(previousBlock.parentId || previousBlock.previousId) {
    const modifyBlockDataProps: TempG = {};
    const historyBlockDataProps: TempG = {};

    if(previousBlock.parentId) {
      historyBlockDataProps.parentId = previousBlock.parentId;
      modifyBlockDataProps.parentId = null;
      previousBlock.parentId = null;
    }
    
    if(previousBlock.previousId) {
      historyBlockDataProps.previousId = previousBlock.previousId;
      modifyBlockDataProps.previousId = null;
      previousBlock.previousId = null;
    }

    modifyBlockTokenList.push(modifyBlockDataProps);
    historyBlockTokenList.push(historyBlockDataProps);
  }

  for(let index = 1; index < length; index++) {

    if(targetId !== EDIT) {
      if(targetId !== blockList[index].id) continue; 

      targetId = EDIT;
      endPointId = targetId;

    } else {
    
      if(endPointId === blockList[index].previousId) {
        endPointId = END;
        targetIdListIndex++;

        if(targetIdList && targetIdList[targetIdListIndex]) {
          targetId = targetIdList[targetIdListIndex];
        } else {
          targetId = END;
        }

      }

    }
   
    let currentBlock: RawBlockData | undefined  = blockList[index] as RawBlockData;

    const result = reconcileBlock(previousBlock, currentBlock);

    if(result) {
      const { block, blockTokens, toBeStackedBlock } = result;

      if(blockTokens) {
        modifyBlockTokenList.push(blockTokens.modifyBlockToken);
        historyBlockTokenList.push(blockTokens.historyBlockToken);
      }

      if(toBeStackedBlock) {
        blockStack.push(toBeStackedBlock);
      }

      previousBlock = block;

      continue;
    }

    while(blockStack[0]) {
      const block = blockStack.pop();
    
      if(!block) break;

      previousBlock = block;
      console.log("while", previousBlock, currentBlock);
      const result = reconcileBlock(previousBlock, currentBlock);

      if(result) {
        const { block, blockTokens, toBeStackedBlock } = result;

        if(blockTokens) {
          modifyBlockTokenList.push(blockTokens.modifyBlockToken);
          historyBlockTokenList.push(blockTokens.historyBlockToken);
        }
  
        if(toBeStackedBlock) {
          blockStack.push(toBeStackedBlock);
        }
  
        previousBlock = block;
  
        break;
      }

    }

    if(previousBlock.id === currentBlock.id) continue;

    modifyBlockTokenList.push({ 
      previousId: previousBlock.id,
      parentId: previousBlock.parentId
    });
    historyBlockTokenList.push({
      previousId: currentBlock.previousId,
      parentId: currentBlock.parentId
    });
    
    currentBlock.previousId = previousBlock.id;
    currentBlock.parentId = previousBlock.parentId;

    previousBlock = currentBlock;
  }

  return {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }
}
