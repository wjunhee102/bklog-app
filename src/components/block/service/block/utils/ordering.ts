import { ResBlockService } from ".";
import { UnionBlock } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";

function sortBlock(blockList: UnionBlock[]) {
  return blockList.sort((a, b) => {
    if(a.position === b.position) {
      return 0
    }

    const aPosition = a.position.split(/-/);
    const bPosition = b.position.split(/-/);

    let length = 0;
    while(aPosition[length] && bPosition[length]) {
      const aNum = Number(aPosition[length]);
      const bNum = Number(bPosition[length]);

      if(aNum > bNum) {
        return 1;
      } else if(aNum < bNum) {
        return -1;
      }

      length++;
    }

    if(!aPosition[length] && !bPosition[length]) {
      return 0;
    } else {
      return aPosition[length]? 1 : -1;
    }
  });
}

/**
 * 원본 배열에 반영
 * @param blockList 
 * @returns 
 */
function orderingBlock(blockList: UnionBlock[]): ResBlockService {
  if(!blockList[0]) return { blockList }
  
  const modifyBlockTokenList: ModifyBlockToken[] = [];
  const historyBlockTokenList: HistoryBlockToken[] = [];
  const stackId: string[] = [];

  let blockListLength = blockList.length;
  let stackIdLength = 0;
  let currentPosition = [1];
  let currentPositionLength = 0;
  
  const firstBlock = blockList[0];

  stackId.push(firstBlock.id);

  const preProps = firstBlock.updateBlock({
    index: 0,
    parentId: "root",
    position: "1"
  });

  if(preProps.position !== "1") {
    modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(firstBlock.id, firstBlock.type, {
      position: "1"
    })));
    historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(firstBlock.id, firstBlock.type, preProps)));
  }

  for(let index = 1; index < blockListLength; index++) {
    const block = blockList[index];

    let length = block.position.split(/-/).length - 1;

    if(currentPositionLength === length) {
      
      stackId[stackIdLength] = block.id;
      currentPosition[currentPositionLength]++;

    } else if(currentPositionLength < length){

      stackId.push(block.id);
      stackIdLength++;
      currentPosition.push(1);
      currentPositionLength++;

    } else {

      for(let i = 0; i <= currentPositionLength - length; i++) {
        currentPosition.pop();
        currentPositionLength--;
        stackId.pop();
        stackIdLength--;
      } 

      currentPosition[currentPositionLength]++;
      stackId[stackIdLength] = block.id;
    }

    let position = currentPosition.join("-");

    if(position !== block.position) {

      historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(block.id, block.type,{
        position: block.position
      })));

      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, block.type, {
        position
      })));
      
    }

    block.updateBlock({
      index,
      parentId: !stackIdLength? "root": stackId[stackIdLength - 1],
      position
    });

  }


  return {
    blockList,
    modifyBlockTokenList: modifyBlockTokenList[0]? modifyBlockTokenList : undefined,
    historyBlockTokenList: historyBlockTokenList[0]? historyBlockTokenList : undefined
  };
}

/**
 * 원본 배열에 반영
 * @param blockList 
 * @param targetPosition 
 * @returns 
 */
function resetToTargetPosition(
  blockList: UnionBlock[],
  targetPosition: string
): [ UnionBlock[], HistoryBlockToken[] ] {
  if(!blockList[0]) return [ [] as UnionBlock[], [] as HistoryBlockToken[] ];

  const historyBlockTokenList: HistoryBlockToken[] = [];

  const targetPositionAry = targetPosition.split(/-/);
  
  let blockListLength = blockList.length;
  let stack: [number, string][] = [];
  let stackLength = 0;
  let currentPosition = targetPositionAry.concat();

  const firstPreProps = blockList[0].updateBlock({
    position: currentPosition.join('-')
  });

  historyBlockTokenList.push(
    new HistoryBlockToken(
      HistoryBlockService.setUpdateModifyData(blockList[0].id, blockList[0].type, firstPreProps)
  ));

  stack.push([blockList[0].position.split(/-/).length, blockList[0].id]);

  for(let index = 1; index < blockListLength; index++) {
    const positionLength = blockList[index].position.split(/-/).length;
    const blockStack: [number, string] = [positionLength, blockList[index].id];

    if(stack[stackLength][0] < positionLength && stack[stackLength][1] === blockList[index].parentId) {
      currentPosition.push("1");
      stack.push(blockStack);
      stackLength++;

    } else if(stack[stackLength][0] === positionLength && stack[stackLength - 1] && stack[stackLength - 1][1] === blockList[index].parentId) {
      stack[stackLength] = blockStack;

    } else {

      if(stack[stackLength - 2] && stack[stackLength - 2][1] === blockList[index].parentId) {
        currentPosition.pop();
        stack.pop();
        stackLength--;

      } else {
        currentPosition = targetPositionAry.concat();
        stack = [blockStack];
        stackLength = 0;
      }

    }

    const preProps = blockList[index].updateBlock({
      position: currentPosition.join('-')
    });

    historyBlockTokenList.push(
      new HistoryBlockToken(
        HistoryBlockService.setUpdateModifyData(blockList[index].id, blockList[index].type, preProps)
    ));

  }
  
  return [ blockList, historyBlockTokenList ];
}

function setPosition(prePosition: string, targetPosition: string = "0"): string {
  const positionLength = prePosition.split(/-/).length - 1;
  if(!positionLength) {
    return targetPosition;
  } else {
    let newPosition = targetPosition;
    for(let i = 0; i < positionLength - 1; i++) {
      newPosition = `${targetPosition}-${newPosition}`;
    }
    return newPosition;
  }
}


export default {
  sortBlock,
  orderingBlock,
  resetToTargetPosition,
  setPosition
}