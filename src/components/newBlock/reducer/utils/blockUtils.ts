import { BlockData, ContentType } from '../../types';
import { StagedBlock, ModifyBlockData, ModifyBlockType, ModifyCommand, ModifyData, ModifySet, sortBlock, createModifyData, setCreateModifyDataOfBlock, setUpdateModifyDataOfBlock, TempDataType, TempSet, TempData, setDeleteModifyDataOfBlock, orderingBlock, createTempData, OrderType, parseHtmlContents, changeStyleTextContents, ResBlockUtils } from '.';
import { Token } from '../../utils/token';

function copyToNewObjectArray<T = any>(array: T[]): T[] {
  return array.map((object: T) => Object.assign({}, object));
}

/**
 * 
 * @param blockDataList 
 */
function reissueBlockId(blockDataList: BlockData[]) {
  return blockDataList.map(block => Object.assign({}, block, {
    id: Token.getUUID()
  }));
}

/**
 * @param blockDataList 
 * @param targetPosition 
 */
function resetToTargetPosition(blockDataList: BlockData[], targetPosition: string) {
  const preBlockDataList = blockDataList.concat();
  const newBlockDataList = [];
  const targetPositionArg = targetPosition.split(/-/);

  let preBlockListLength = preBlockDataList.length - 1;
  let stack: [number, string][] = [];
  let stackLength = 0;
  let currentPosition = targetPositionArg.concat();

  let block = preBlockDataList.shift();

  if(!block) {
    console.error("not block");
    return [];
  }

  newBlockDataList.push(Object.assign({}, block, {
    position: currentPosition.join("-")
  }));

  stack.push([block.position.split(/-/).length, block.id]);


  while(preBlockListLength) {
    block = preBlockDataList.shift();

    if(!block) {
      console.error("not block");
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

function addToStage(
  stage: StagedBlock[], 
  id: string, 
  blockIndex: number, 
  contents: string
): StagedBlock[] {
  const preStagedBlockList = stage.filter(stagedBlock => stagedBlock.id !== id);

  const newStagedBlock = {
    id,
    blockIndex,
    contents
  }

  return [...preStagedBlockList, newStagedBlock];
}

function updateBlockContents(blockDataList: BlockData[], stage: StagedBlock[]) {
  const blocks = blockDataList.concat();
  const tempData: TempDataType = { update: [] };
  const modifyData: ModifyData[] = [];

  for(const { blockIndex, id, contents } of stage) {
    if(blocks[blockIndex] && id === blocks[blockIndex].id) {

      if(blocks[blockIndex].type === "text" || blocks[blockIndex].type === "title") {
        tempData.update?.push(createTempData(blocks[blockIndex].id, {
          contents: blocks[blockIndex].contents
        }));

        blocks[blockIndex].contents = typeof contents === "string"?
          parseHtmlContents(contents) : contents;

        modifyData.push(setUpdateModifyDataOfBlock(blocks[blockIndex].id, {
          contents: blocks[blockIndex].contents
        }));
      }

    } else {
      console.log("block이 제대로 정렬되지 않았습니다.");
    }
  } 

  return {
    blockList: blocks,
    modifyData,
    tempData
  }
}

function changeBlockTextStyle(
  blocks: BlockData[], 
  index: number, 
  styleType: ContentType,
  startPoint: number,
  endPoint: number,
  order: OrderType
): ResBlockUtils | null {
  const tempData: TempDataType = { update: [] };
  const modifyData: ModifyData[] = [];
  const blockList = blocks.concat();

  if(blockList[index].type !== "text" && blockList[index].type !== "title") {
    console.log("text block이 아닙니다.");
    return null;
  }

  tempData.update?.push(createTempData<ModifyBlockData>(blockList[index].id, {
    contents: blockList[index].contents.concat()
  }));

  const changedBlock = changeStyleTextContents(
    blockList[index], 
    styleType, 
    startPoint, 
    endPoint, 
    order
  );

  modifyData.push(setUpdateModifyDataOfBlock(changedBlock.id, {
    contents: changedBlock.contents
  }));

  blockList[index] = changedBlock;

  return {
    blockList,
    modifyData,
    tempData
  }
}

function addBlockInList(
  blockList: BlockData[], 
  addBlockList: BlockData[],
  targetPosition: string,
  index: number
): ResBlockUtils {
  const modifyData: ModifyData[] = [];
  const tempData: TempDataType = {
    delete: [],
    create: []
  };

  const result = orderingBlock(
    blockList.splice(
      index, 
      1, 
      blockList[index], 
      ...resetToTargetPosition(addBlockList, targetPosition)
    )
  );

  modifyData.push(...addBlockList.map(block => 
    setCreateModifyDataOfBlock(block)
  ), ...result.modifyData);

  const idList: string[] = addBlockList.map(block => block.id);

  tempData.delete?.push(...idList.map( id => 
    createTempData(id)
  ));

  if(result.tempData.update) {
    tempData.update?.push(...result.tempData.update?.filter(data => 
      idList.includes(data.blockId) === false
    ));
  }

  return {
    blockList: result.blockList,
    tempData,
    modifyData
  }
}

function removeBlockInList(
  blockList: BlockData[], 
  removedBlockList: BlockData[]
): ResBlockUtils {
  const modifyData: ModifyData[] = [];
  const tempData: TempDataType = {
    create: [],
    update: []
  };
  const blocks = blockList.concat();
  const blockLength = blocks.length - 1;

  for(const block of removedBlockList) {
    const position = block.position;

    for(let i = block.index; i < blockLength; i++) {

      if(blocks[i].position.indexOf(position) === 0) {

        const newPosition = blocks[i].position.split(/-/);
        newPosition.pop();

        if(i === block.index) {

          tempData.create?.push(createTempData<BlockData>(blocks[i].id, blocks[i]));
          modifyData.push(setDeleteModifyDataOfBlock(blocks[i].id));
          blocks[i].position = "null";

        } else {
          const findIndex = tempData.update?.findIndex(data => data.blockId === blocks[i].id);
          const tempDataBlock = createTempData<ModifyBlockData>(blocks[i].id, {
            position: blocks[i].position
          });

          if(findIndex && findIndex !== -1 && tempData.update) {
            tempData.update[findIndex] = tempDataBlock;
          } else {
            tempData.update?.push(tempDataBlock);
          }

          blocks[i].position = newPosition.join("-");

        }
        
      } else {
        break;
      }

    }

  }

  const result = orderingBlock(blocks.filter(block => block.position === "null"));
  
  modifyData.concat(result.modifyData);

  return {
    blockList: result.blockList,
    modifyData,
    tempData
  }
}

function divideBlock(blocks: BlockData[], idList: string[]) {
  const removedBlockList: BlockData[] = [];
  const targetBlockList: BlockData[] = [];

  //단순 반복말고 id list에 해당하는 block 다 찾았을 시 종료 되게 다시 짤 것.
  for(const block of blocks) {
    if(idList.includes(block.id)) {
      targetBlockList.push(block);
    } else {
      removedBlockList.push(block);
    }
  }

  return [ removedBlockList, targetBlockList ];
}

function changeBlockPosition(blocks: BlockData[], idList: string[], targetPosition: string): ResBlockUtils {
  const [ removedBlockList, targetBlockList ] = divideBlock(blocks, idList);
  const index = removedBlockList.findIndex(block => block.position === targetPosition);
  const containerBlockList = removedBlockList.filter((block => block.type === "container"));
  const tempData: TempDataType = {
    create: [],
    update: []
  };
  const modifyData: ModifyData[] = [];

  if(containerBlockList[0]) {
    for(const block of containerBlockList) {
      const idx = removedBlockList.findIndex(({ id }) => id === block.id ) + 1;

      if(!removedBlockList[idx] && removedBlockList[idx].position.indexOf(block.position) !== 0) {
        removedBlockList.splice(idx, 1);

        //temp
        tempData.create?.push(createTempData(block.id, block));
        //modify
        modifyData.push(setDeleteModifyDataOfBlock(block.id));
      }

    }
  }

  const result = orderingBlock(
    removedBlockList.splice(
      index, 
      1, 
      removedBlockList[index], 
      ...resetToTargetPosition(targetBlockList, targetPosition)
    )
  );

  if(result.tempData.update) {
    tempData.update?.push(...result.tempData.update);
  }
  modifyData.push(...result.modifyData);

  return {
    blockList: result.blockList,
    modifyData,
    tempData
  }

}

function restoreBlock(blocks: BlockData[], restoreData: TempDataType): ResBlockUtils {
  const tempData: TempDataType = {}
  const modifyData: ModifyData[] = [];

  let preBlockList = blocks.concat();

  if(restoreData.create) {
    const toBeCreatedBlock = restoreData.create.map(data => data.payload);

    tempData.delete = restoreData.create.map(data => createTempData(data.blockId));
    modifyData.push(...toBeCreatedBlock.map(block => setCreateModifyDataOfBlock(block)));

    preBlockList.push(...toBeCreatedBlock);
  }

  if(restoreData.update) {
    tempData.update = [];

    for(const data of restoreData.update) {
      const index = preBlockList.findIndex(block => block.id === data.blockId);
      
      const payload: any = {};

      for(const [key, value] of Object.entries(preBlockList[index])) {
        if(data.payload[key]) {
          payload[key] = value;
        }
      }

      tempData.update.push(createTempData(preBlockList[index].id, payload));
      modifyData.push(setUpdateModifyDataOfBlock(preBlockList[index].id, data.payload));
      preBlockList[index] = Object.assign({}, preBlockList[index], data.payload);
    }
  }

  if(restoreData.delete) {
    const idList = restoreData.delete.map(data => data.blockId);
    const [ removedBlockList, targetBlockList ] = divideBlock(preBlockList, idList);

    preBlockList = removedBlockList;

    tempData.create?.push(...targetBlockList.map(block => createTempData(block.id, block)));
    modifyData.push(...idList.map(id => setDeleteModifyDataOfBlock(id)));
  }

  const result = orderingBlock(sortBlock(preBlockList));

  if(result.modifyData[0] || result.tempData) {
    console.log("확인 필요");
  }

  return {
    blockList: result.blockList,
    modifyData,
    tempData
  }
}

const blockUtils = {
  resetToTargetPosition,
  addToStage,
  updateBlockContents,
  changeBlockTextStyle,
  addBlockInList,
  removeBlockInList,
  changeBlockPosition,
  restoreBlock
}

export default blockUtils;