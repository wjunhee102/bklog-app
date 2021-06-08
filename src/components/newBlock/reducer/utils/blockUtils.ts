import { BlockData } from '../../types';
import { sortBlock } from '.';

/**
 * 아직 제대로 검증이 안됐음.
 * @param blockDataList 
 * @param targetPosition 
 */
function resetToTargetPosition(blockDataList: BlockData[], targetPosition: string) {
  const preBlockDataList = sortBlock<BlockData>(blockDataList) ;
  const newBlockDataList = [];

  let preBlockListLength = preBlockDataList.length - 1;
  const targetPositionArg = targetPosition.split(/-/);

  let stack: [number, string][] = [];
  let stackLength = 0;
  let currentPosition = targetPositionArg.concat();

  let block = preBlockDataList.shift();

  if(!block) {
    return [];
  }

  newBlockDataList.push(Object.assign({}, block, {
    position: currentPosition.join("-")
  }));

  stack.push([block.position.split(/-/).length, block.id]);


  while(preBlockListLength) {
    block = preBlockDataList.shift();

    if(!block) {
      return [];
    }

    const positionLength = block.position.split(/-/).length;
    const blockStact: [number, string] = [positionLength, block.id];

    if(stack[stackLength][0] < positionLength && stack[stackLength][1] === block.parentId) {
      currentPosition.push("1");
      stack.push(blockStact);
      stackLength++;
    } else if(stack[stackLength][0] === positionLength && stack[stackLength - 1] && stack[stackLength - 1][1] === block.parentId) {
      stack[stackLength] = blockStact;
    } else {
      if(stack[stackLength - 2] && stack[stackLength - 2][1] === block.parentId) {
        currentPosition.pop();
        stack.pop();
        stackLength--;
      } else {
        currentPosition = targetPositionArg.concat();
        stack = [blockStact];
        stackLength = 0;
      }
    }

    newBlockDataList.push(Object.assign({}, block, {
      position: currentPosition.join("-")
    }));

    preBlockListLength--;
  }

  return newBlockDataList;
}

const blockUtils = {
  resetToTargetPosition
}

export default blockUtils;