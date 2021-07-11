import { BlockData, ContentType, ModifyBlockData, ModifyDataType, ModifyCommand, ModifyData, ModifySet, TextContents } from '../../types';
import { StagedBlock, sortBlock, setCreateModifyDataOfBlock, setUpdateModifyDataOfBlock, TempDataType, TempSet, TempData, setDeleteModifyDataOfBlock, orderingBlock, createTempData, OrderType, parseHtmlContents, changeStyleTextContents, ResBlockUtils, mergeTextContents, createModifyData } from '.';
import { Token } from '../../utils/token';
import { updateObject } from '../../../../store/utils';
import { BlockProps } from '../../components/Block';

function copyToNewObjectArray<T = any>(array: T[]): T[] {
  return array.map((object: T) => Object.assign({}, object));
}

interface BlockDataProps {
  position: string;
  type?: string;
  styleType?: string;
  parentId?: string;
  styles?: any;
  contents?: TextContents[]
}

function createBlockData({ 
  position,
  type,
  styleType,
  styles,
  parentId,
  contents
}: BlockDataProps): BlockData {
  return  {
    index: 0,
    position,
    id: Token.getUUID(),
    type: type? type : "text",
    styleType: styleType? styleType : "bk-p",
    parentId: parentId? parentId : "null",
    contents: contents? contents : [],
    styles: styles? styles : {}
  };
}

function blockFindInfex(id: string) {
  return (block: BlockData) => block.id === id; 
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
  const preBlockDataList: BlockData[] = blockDataList.concat();
  const newBlockDataList: BlockData[] = [];
  const targetPositionArg = targetPosition.split(/-/);

  let preBlockListLength = preBlockDataList.length - 1;
  let stack: [number, string][] = [];
  let stackLength = 0;
  let currentPosition = targetPositionArg.concat();

  let block = preBlockDataList.shift();

  if(!block) {
    console.error("resetToTargetPosition: not block");
    return [];
  }

  newBlockDataList.push(Object.assign({}, block, {
    position: currentPosition.join("-")
  }));

  stack.push([block.position.split(/-/).length, block.id]);


  while(preBlockListLength) {
    block = preBlockDataList.shift();

    if(!block) {
      console.error("resetToTargetPosition: not block");
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
        const preContents = typeof blocks[blockIndex].contents === "string"?
        blocks[blockIndex].contents : blocks[blockIndex].contents.concat();

        tempData.update?.push(createTempData(blocks[blockIndex].id, {
          contents: preContents
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

function changeBlockStyleType(
  blockDataList: BlockData[], 
  blockInfo: string | number, 
  styleType: string
): ResBlockUtils | null {
  const blockIndex = typeof blockInfo === "number"? 
    blockInfo 
    : blockDataList.findIndex(blockFindInfex(blockInfo)); 

  if(!blockDataList[blockIndex]) return null;
  
  const blocks = blockDataList.concat();
  const tempData: TempDataType = { update: [] };
  const modifyData: ModifyData[] = [];

  tempData.update?.push({
    blockId: blocks[blockIndex].id,
    payload: {
      styleType: blocks[blockIndex].styleType
    }
  });

  blocks[blockIndex].styleType = styleType;

  modifyData.push(setUpdateModifyDataOfBlock(blocks[blockIndex].id, {
    styleType
  }));

  return {
    blockList: blocks,
    tempData,
    modifyData
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
  const contents = typeof blockList[index].contents === "string"?
    blockList[index].contents
    : blockList[index].contents.concat();

  tempData.update?.push(createTempData<ModifyBlockData>(blockList[index].id, {
    contents
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
  const blockLength = blocks.length;
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
 * @param preBlocks 
 * @param index 
 * @param preIndex 
 * @param innerHTML 
 */
function removeTextBlockInList(preBlocks: BlockData[], index: number, preIndex, innerHTML: string): ResBlockUtils | null {
  if(preBlocks[preIndex].type !== "text") return null;

  const preBlockList = preBlocks.concat();
  const contents: TextContents[] = parseHtmlContents(innerHTML);
  const blockId = preBlockList[preIndex].id;
  const preContents = preBlockList[preIndex].contents.concat();
  const newContents = mergeTextContents(preBlockList[preIndex].contents, contents);

  preBlockList[preIndex].contents = newContents;

  const { blockList, tempData, modifyData } = removeBlockInList(preBlockList, [preBlockList[index]]);

  const tempIndex = tempData.update.findIndex(data => data.blockId === blockId);
  const modifyIndex = modifyData.findIndex(data => data.blockId === blockId);

  if(tempIndex !== -1) {
    tempData.update[tempIndex] = updateObject(tempData.update[tempIndex], {
      contents: preContents
    });
  } else {
    tempData.update.push(createTempData(blockId, {
      contents: preContents
    }));
  }

  if(modifyIndex !== -1) {
    modifyData[modifyIndex] = updateObject(modifyData[modifyIndex], {
      contents: newContents
    });
  } else {
    modifyData.push(createModifyData("update", "block", blockId, {
      contents: newContents
    }));
  }
  
  return {
    blockList,
    tempData,
    modifyData
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
function changeBlockPosition(blocks: BlockData[], idList: string[], targetPosition: string): ResBlockUtils | null {
  const [ removedBlockList, targetBlockList ] = divideBlock(blocks, idList);
  const index = removedBlockList.findIndex(block => block.position === targetPosition) + 1;

  if(index === 0) return null;

  const containerBlockList = removedBlockList.filter((block => block.type === "container"));
  const tempData: TempDataType = {
    create: [],
    update: []
  };
  const modifyData: ModifyData[] = [];

  const setedPosition = setPosition(targetPosition, "0");

  const newBlockList = copyToNewObjectArray(removedBlockList);
  newBlockList.splice(index, 0, ...resetToTargetPosition(targetBlockList, setedPosition));

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
): ResBlockUtils | null {
  const tempData: TempDataType = {};
  let modifyData: ModifyData[] = [];
  const blockList = copyToNewObjectArray(blocks);
  const blockIdList = idList.concat();

  let position = targetPosition;

  if(container) {
    const block = createBlockData({
      position: targetPosition,
      type: "container",
      styleType: "bk-container"
    });

    const targetIndex = blockList.findIndex(block => block.position === targetPosition);

    blockList.splice(targetIndex, 0, block);

    position = targetPosition.split(/-/).concat("1").join("-");
    blockList[targetIndex + 1].position = position;

    tempData.delete = [ createTempData(block.id) ];
    modifyData.push(setCreateModifyDataOfBlock(block));
  }

  const result = changeBlockPosition(blockList, blockIdList, position);
  
  if(!result) return null;

  if(result.tempData.update) {
    tempData.update = result.tempData.update;
  }

  modifyData = modifyData.concat(result.modifyData);
  
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
      const index = preBlockList.findIndex(blockFindInfex(data.blockId));

      const payload: ModifyBlockData = {};

      for(const [key, value] of Object.entries(preBlockList[index])) {
        if(data.payload[key]) {
          payload[key as keyof ModifyBlockData] = value;
        }
      }

      tempData.update.push(createTempData<ModifyBlockData>(preBlockList[index].id, payload));
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

/**
 * block-comments 관련 로직도 넣어야 함.
 * @param blocks 
 * @param updatedData 
 */
function updateBlockData(blocks: BlockData[], updatedData: ModifyDataType) {
  const tempData: TempDataType = {};
  const modifyData: ModifyData[] = [];

  let preBlockList = blocks.concat();

  if(updatedData.update) {
    tempData.update = [];

    for(const data of updatedData.update) {
      if(data.set === "block") {
        const index = preBlockList.findIndex(blockFindInfex(data.blockId));

        const payload: ModifyBlockData = {};

        if(index !== -1) {
          for(const [ key, value ] of Object.entries(preBlockList[index])) {
            if(data.payload[key]) {
              payload[key as keyof ModifyBlockData] = value;
            }
          }
  
          tempData.update.push(createTempData<ModifyBlockData>(preBlockList[index].id, payload));
          preBlockList[index] = Object.assign({}, preBlockList[index], data.payload);
        }

        
      } else if(data.set === "comment") {

      }
    }

  }

  if(updatedData.delete) {
    const blockIdList: string[] | null = updatedData.delete.blockIdList? 
      updatedData.delete.blockIdList : null;
    const commentIdList: string[] | null = updatedData.delete.commentIdList?
    updatedData.delete.commentIdList : null;

    if(blockIdList) {
      const [ removedBlockList, targetBlockList ] = divideBlock(preBlockList, blockIdList);

      preBlockList = removedBlockList;

      tempData.create?.push(...targetBlockList.map(block => createTempData(block.id, block)))
    }
    
  }

  if(updatedData.create) {
    const toBeCreatedBlock = updatedData.create.filter(data => data.set === "block");

    // if(toBeCreatedBlock) {
    //   tempData.delete = toBeCreatedBlock.map(data => createTempData(data.blockId));
    //   preBlockList.push(...toBeCreatedBlock.map(data => data.payload));
    // }
    tempData.delete = [];

    for(const block of toBeCreatedBlock) {
      tempData.delete.push(createTempData(block.blockId));

      const index: number = preBlockList.findIndex(preBlock => preBlock.id === block.blockId);

      if(index !== -1) {
        preBlockList[index] = updateObject(block.payload, {
          position: preBlockList[index].position
        });
      } else {
        preBlockList.push(block.payload);
      }
      
    }

  }

  const result = orderingBlock(sortBlock(preBlockList));

  if(result.modifyData[0] || (result.tempData.update && result.tempData.update[0])) {
    console.log("확인 필요");
    console.log(result);

    if(result.tempData.update && result.tempData.update[0]) {
      if(!tempData.update) tempData.update = [];

      for(const data of result.tempData.update) {
        const index = tempData.update.findIndex(data => data.blockId === data.blockId);
        if(index !== -1) {
          tempData.update[index].payload = updateObject(tempData.update[index].payload, data.payload);
        } else {
          tempData.update.push(data);
        }
      }

    }
  }

  return {
    blockList: result.blockList,
    modifyData: result.modifyData,
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
  removeTextBlockInList,
  changeBlockPosition,
  switchBlockList,
  restoreBlock,
  changeBlockStyleType,
  updateBlockData
}

export default blockUtils;