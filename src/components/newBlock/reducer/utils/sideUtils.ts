import { TempData, StagedBlock, ModifyData, ModifyCommand, ModifySet, ModifyBlockData, TempDataType, TempSet } from ".";
import { updateObject } from "../../../../store/utils";
import { BlockData, RawBlockData } from "../../types";

function tempDataPush(
  tempStore: TempDataType[], 
  tempData: TempDataType, 
  limitCount: number = 5
  ): TempDataType[] {

  const newTempStore = [...tempStore, tempData];
  if(limitCount < newTempStore.length) {
    newTempStore.shift();
  }

  return newTempStore;
}

function getContentsToBeChanged(
  blocks: BlockData<any>[], 
  stage: StagedBlock[]
  ): StagedBlock[] {
  
  let changedBlocks: BlockData[] = [];
  
  for(const data of stage) {
    if(blocks[data.blockIndex].type === "text") {
      changedBlocks.push(blocks[data.blockIndex]);
    }
  }

  return changedBlocks.map(block => {
    return {
      id: block.id,
      contents: block.contents? block.contents : null,
      blockIndex: block.index
    }
  })
}

function createTempData<T = any>(
  set: TempSet, 
  blockId: string, 
  payload?: T
): TempData {
  return {
    blockId,
    set,
    payload
  }
}

function createModifyData<T = any>(
  command: ModifyCommand, 
  set: ModifySet,
  blockId: string, 
  payload?: T
): ModifyData {
  return {
    command,
    set,
    blockId,
    payload
  }
}

function setCreateModifyDataOfBlock(block: BlockData): ModifyData {
  return createModifyData<RawBlockData>("create", "block", block.id, updateObject(block, {
    index: undefined,
    parentId: undefined
  }));
}

function setDeleteModifyDataOfBlock(blockId: string): ModifyData {
  return createModifyData("delete", "block", blockId);
}

function setUpdateModifyDataOfBlock(blockId: string, payload: ModifyBlockData) {
  return createModifyData<ModifyBlockData>("update", "block", blockId, payload);
}

function updateModifyData(preModifyData: ModifyData[], newModifyData: ModifyData[]) {
  if(!newModifyData[0]) {
    return preModifyData;
  }
  
  const newModifyDataList = [...preModifyData];

  for(const modifyData of newModifyData) {
    let index = newModifyDataList.findIndex((data) => data.blockId === modifyData.blockId);

    if(index !== -1) {
      const { command, blockId, set, payload } = newModifyDataList[index];

      if(set === modifyData.set) {

        if(command === "create" && modifyData.command === "delete") {

          newModifyDataList.splice(index, 1);
          
        } else {

          newModifyDataList[index] = {
            blockId,
            set,
            command: command === "create" && modifyData.command === "update"? "create" : modifyData.command,
            payload: payload? Object.assign({}, payload, modifyData.payload) : modifyData.payload
          }

        }

      } else {

        if(set !== "block" && command !== "delete") {
         newModifyDataList.push(modifyData); 
        }

      }

    } else { 
      newModifyDataList.push(modifyData);
    }
  }

  return newModifyDataList;
}

const sideStoreUtils = {
  tempDataPush,
  getContentsToBeChanged,
  createTempData,
  createModifyData,
  setCreateModifyDataOfBlock,
  setDeleteModifyDataOfBlock,
  setUpdateModifyDataOfBlock,
  updateModifyData
}

export default sideStoreUtils;