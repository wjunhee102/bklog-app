import { TempData, StagedBlock, TempDataType, TempSet } from ".";
import { updateObject } from "../../../../store/utils";
import { BlockData, RawBlockData, ModifyData, ModifyCommand, ModifySet, ModifyBlockData, ModifyDataType } from "../../types";

function tempDataPush(
  tempStore: TempDataType[], 
  tempData: TempDataType, 
  limitCount: number = 6
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
  blockId: string, 
  payload?: T
): TempData {
  return {
    blockId,
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

const modifyDataReducer = (acc: ModifyDataType, cur: ModifyData) => {
  switch (cur.command) {
    case "create":
      acc.create.push(cur);
      
      break;

    case "update":
      acc.update.push(cur);
      
      break;

    case "delete":
      if(cur.set === "block") {
        acc.delete.blockIdList.push(cur.blockId);
      } else if(cur.set === "comment") {
        acc.delete.commentIdList.push(cur.payload);
      }

      break;
  }

  return acc;
}

function convertModifyData(modifyDataList: ModifyData[]) {
  const acc: ModifyDataType = {
    create: [],
    update: [],
    delete: {
      blockIdList: [],
      commentIdList: []
    }
  }
  const modifyData: ModifyDataType = modifyDataList.reduce(modifyDataReducer, acc);
  
  if(!acc.create[0]) acc.create = undefined;
  if(!acc.update[0]) acc.update = undefined;
  if(!acc.delete.blockIdList[0] && !acc.delete.commentIdList[0]) acc.delete = undefined;

  return modifyData;
}

const sideStoreUtils = {
  tempDataPush,
  getContentsToBeChanged,
  createTempData,
  createModifyData,
  setCreateModifyDataOfBlock,
  setDeleteModifyDataOfBlock,
  setUpdateModifyDataOfBlock,
  updateModifyData,
  convertModifyData
}

export default sideStoreUtils;