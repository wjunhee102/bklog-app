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
  
  if(!modifyData.create[0]) modifyData.create = undefined;
  if(!modifyData.update[0]) modifyData.update = undefined;
  if(!modifyData.delete.blockIdList[0]) modifyData.delete.blockIdList = undefined;
  if(!modifyData.delete.commentIdList[0]) modifyData.delete.commentIdList = undefined;
  if(!modifyData.delete.blockIdList && !modifyData.delete.commentIdList) modifyData.delete = undefined;

  return modifyData;
}

function replaceModifyData(currentData: ModifyData[], replaceData: ModifyDataType): ModifyData[] {
  if(!currentData[0]) return [];

  const updateData = replaceData.update? replaceData.update : null;
  const createData = replaceData.create? replaceData.create : null;
  const deleteData = replaceData.delete? replaceData.delete : null;

  let newModifyData: ModifyData[] = currentData.concat();

  if(deleteData) {
    const blockIdList = deleteData.blockIdList? deleteData.blockIdList : null;
    const commentIdList = deleteData.commentIdList? deleteData.commentIdList : null;

    if(blockIdList) {
      newModifyData = newModifyData.filter(data => !blockIdList.includes(data.blockId) || data.set !== "block");
    }
  }

  if(updateData && newModifyData[0]) {
    for(const data of updateData) {
      if(!newModifyData[0]) break;

      const index = newModifyData.findIndex(modifyData => 
        modifyData.blockId === data.blockId && modifyData.set === data.set);
      
      console.log(data, index);

      if(index !== -1) {
        if(newModifyData[index].command !== "delete") {
          let deleteCheck = true;

          for(const [ key, value ] of Object.entries(newModifyData[index].payload)) {
            if(!data.payload[key]) {
              deleteCheck = false;
            } else {
              newModifyData[index].payload[key] = undefined;
              delete newModifyData[index].payload[key];
            }
          }

          if(deleteCheck) newModifyData.splice(index, 1);
        }
      } 

    }
  }

  if(createData && newModifyData[0]) {
    for(const data of createData) {
      const index = newModifyData.findIndex(modifyData => 
        modifyData.blockId === data.blockId && modifyData.set === data.set);

      if(index !== -1) {
        newModifyData.splice(index, 1);
      } 

    }
  }

  return newModifyData;
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
  convertModifyData,
  replaceModifyData
}

export default sideStoreUtils;