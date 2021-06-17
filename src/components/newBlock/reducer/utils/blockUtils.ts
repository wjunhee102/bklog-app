import { BlockData, ContentType } from '../../types';
import { StagedBlock, ModifyBlockData, ModifyBlockType, ModifyCommand, ModifyData, ModifySet, sortBlock, createModifyData, setCreateModifyDataOfBlock, setUpdateModifyDataOfBlock, TempDataType, TempSet, TempData, setDeleteModifyDataOfBlock, orderingBlock, createTempData, OrderType, parseHtmlContents, changeStyleTextContents, ResBlockUtils } from '.';
import { Token } from '../../utils/token';

function copyToNewObjectArray<T = any>(array: T[]): T[] {
  return array.map((object: T) => Object.assign({}, object));
}

function createBlockData(
  position: string,
  type: string = "text",
  styleType: string = "bk-p",
  parentId?: string,
): BlockData {
  return  {
    index: 0,
    position,
    id: Token.getUUID(),
    type,
    styleType,
    parentId: parentId? parentId : "null",
    contents: [],
    styles: {}
  }
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

/**
 * 
 * @param stage 
 * @param id 
 * @param blockIndex 
 * @param contents 
 */
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
  return preStagedBlockList[0]? [...preStagedBlockList, newStagedBlock] : [newStagedBlock];
}

/**
 * 
 * @param blockDataList 
 * @param stage 
 */
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

/**
 * 
 * @param blocks 
 * @param index 
 * @param styleType 
 * @param startPoint 
 * @param endPoint 
 * @param order 
 */
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

/**
 * 
 * @param blockList
 * @param addBlockList
 * @param targetPosition
 * @param index 
 */
function addBlockInList(
  blockList: BlockData[], 
  addBlockList: BlockData[],
  targetPosition: string
): ResBlockUtils {
  const modifyData: ModifyData[] = [];
  const tempData: TempDataType = {
    delete: [],
    update: []
  };

  const newBlockList = blockList.concat();
  
  const index = newBlockList.findIndex(block => block.position === targetPosition);

  newBlockList.splice(
    index, 
    1, 
    blockList[index], 
    ...resetToTargetPosition(addBlockList, targetPosition)
  );

  const result = orderingBlock(newBlockList);

  modifyData.push(...addBlockList.map(block => 
    setCreateModifyDataOfBlock(block)
  ), ...result.modifyData);

  const idList: string[] = addBlockList.map(block => block.id);

  tempData.delete?.push(...idList.map( id => 
    createTempData(id)
  ));

  if(result.tempData.update) {
    const updateTempData = result.tempData.update.filter(data => 
      !idList.includes(data.blockId)
    );
    tempData.update?.push(...updateTempData);
  }

  return {
    blockList: result.blockList,
    tempData,
    modifyData
  }
}

/**
 * 
 * @param blockList 
 * @param removedBlockList 
 */
function removeBlockInList(
  blockList: BlockData[], 
  targetBlockList: BlockData[]
): ResBlockUtils {
  const modifyData: ModifyData[] = [];
  const tempData: TempDataType = {
    create: [],
    update: []
  };
  const blocks = blockList.concat();
  const blockLength = blocks.length - 1;
  const removedBlockList = copyToNewObjectArray(targetBlockList);

  tempData.create?.push(...removedBlockList.map(block => createTempData(block.id, Object.assign({}, block))));

  let removedIdList = removedBlockList.map(block => block.id); 

  for(const block of removedBlockList) {
    const position = block.position;

    for(let i = block.index; i < blockLength; i++) {

      if(i === block.index) {

        modifyData.push(setDeleteModifyDataOfBlock(blocks[i].id));
        blocks[i].position = "null";

      } else if(blocks[i].position.indexOf(position) === 0) {
        if(!removedIdList.includes(blocks[i].id)) {

          const newPosition = blocks[i].position.split(/-/);
          newPosition.pop();

          const findIndex = tempData.update?.findIndex(data => data.blockId === blocks[i].id);
          const tempDataBlock = createTempData<ModifyBlockData>(blocks[i].id, {
            position: blocks[i].position
          });

          if(findIndex !== undefined && findIndex !== -1 && tempData.update) {
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

  const result = orderingBlock(blocks.filter(block => block.position !== "null"));

  if(result.tempData.update) {
    if(tempData.update) {
      const idList = tempData.update.map(data => data.blockId);

      for(const data of result.tempData.update) {
        if(!idList.includes(data.blockId)) {
          tempData.update.push(data);
        } 
      }

    }
  }
  
  if(result.modifyData[0]) {
    modifyData.push(...result.modifyData);
  }

  return {
    blockList: result.blockList,
    modifyData,
    tempData
  }
}

/**
 * 
 * @param blocks 
 * @param idList 
 */
function divideBlock(blocks: BlockData[], idList: string[]) {
  const removedBlockList: BlockData[] = [];
  const targetBlockList: BlockData[] = [];

  for(const block of blocks) {
    if(idList.includes(block.id)) {
      targetBlockList.push(Object.assign({}, block));
    } else {
      removedBlockList.push(Object.assign({}, block));
    }
  }

  return [ removedBlockList, targetBlockList ];
}

/**
 * 
 * @param blocks 
 * @param idList 
 * @param targetPosition 
 */
function changeBlockPosition(blocks: BlockData[], idList: string[], targetPosition: string): ResBlockUtils {
  const [ removedBlockList, targetBlockList ] = divideBlock(blocks, idList);
  const index = removedBlockList.findIndex(block => block.position === targetPosition);
  const containerBlockList = removedBlockList.filter((block => block.type === "container"));
  const tempData: TempDataType = {
    create: [],
    update: []
  };
  const modifyData: ModifyData[] = [];

  const newBlockList = copyToNewObjectArray(removedBlockList);
  newBlockList.splice(index, 1, removedBlockList[index], ...resetToTargetPosition(targetBlockList, targetPosition));

  if(containerBlockList[0]) {
    for(const block of containerBlockList) {
      const idx = newBlockList.findIndex(({ id }) => id === block.id ) + 1;

      if(!newBlockList[idx] || newBlockList[idx].position.indexOf(block.position) !== 0) {
        newBlockList.splice(idx, 1);

        //temp
        tempData.create?.push(createTempData(block.id, Object.assign({}, block)));
        //modify
        modifyData.push(setDeleteModifyDataOfBlock(block.id));
      }

    }
  }

  const result = orderingBlock(newBlockList);

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

function switchBlockList(
  blocks: BlockData[], 
  idList: string[], 
  targetPosition: string, 
  container: boolean
): ResBlockUtils {
  const tempData: TempDataType = {};
  const modifyData: ModifyData[] = [];
  const blockList = copyToNewObjectArray(blocks);
  const blockIdList = idList.concat();

  let position = targetPosition;

  if(container) {
    const block = createBlockData(
      targetPosition, 
      "container", 
      "bk-container"
    );

    const targetIndex = blockList.findIndex(block => block.position === targetPosition);

    blockList.splice(targetIndex, 0, block);

    position = targetPosition.split(/-/).concat("1").join("-");
    blockList[targetIndex + 1].position = position;

    tempData.delete = [ createTempData(block.id) ];
    modifyData.push(setCreateModifyDataOfBlock(block));
  }

  const result = changeBlockPosition(blockList, blockIdList, position);

  if(result.tempData.update) {
    tempData.update = result.tempData.update;
  }
  modifyData.push(...result.modifyData);
  
  return {
    blockList: result.blockList,
    tempData,
    modifyData
  }
}

/**
 * 
 * @param blocks 
 * @param restoreData 
 */
function restoreBlock(blocks: BlockData[], restoreData: TempDataType): ResBlockUtils {
  const tempData: TempDataType = {}
  const modifyData: ModifyData[] = [];

  let preBlockList = blocks.concat();

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

  if(restoreData.create) {
    const toBeCreatedBlock = restoreData.create.map(data => data.payload);

    tempData.delete = restoreData.create.map(data => createTempData(data.blockId));
    modifyData.push(...toBeCreatedBlock.map(block => setCreateModifyDataOfBlock(block)));

    preBlockList.push(...toBeCreatedBlock);
  }

  const result = orderingBlock(sortBlock(preBlockList));

  if(result.modifyData[0] || (result.tempData.update && result.tempData.update[0])) {
    console.log("확인 필요");
    console.log(result);
  }

  return {
    blockList: result.blockList,
    modifyData,
    tempData
  }
}

const blockUtils = {
  copyToNewObjectArray,
  createBlockData,
  resetToTargetPosition,
  reissueBlockId,
  addToStage,
  updateBlockContents,
  changeBlockTextStyle,
  addBlockInList,
  removeBlockInList,
  changeBlockPosition,
  switchBlockList,
  restoreBlock
}

export default blockUtils;