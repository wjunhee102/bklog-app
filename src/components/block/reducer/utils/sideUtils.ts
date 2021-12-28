import { TempData, StagedBlock, TempDataType, TempSet, createBlockData, BlockState, restoreBlock, BlockStateProps } from ".";
import { updateObject } from "../../../../store/utils";
import { BlockData, RawBlockData, ModifyData, ModifyCommand, ModifySet, ModifyBlockData, ModifyBlockDataType, BlockDataProps, ParamCreateModifyBlock, ParamModifyBlock, ParamDeleteModity } from "../../types";

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

const CREATE = "create";
const UPDATE = "update";
const DELETE = 'delete';

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
  return createModifyData<RawBlockData>(CREATE, "block", block.id, updateObject(block, {
    index: undefined,
    parentId: undefined
  }));
}

function setDeleteModifyDataOfBlock(blockId: string): ModifyData {
  return createModifyData(DELETE, "block", blockId);
}

function setUpdateModifyDataOfBlock(blockId: string, payload: ModifyBlockData) {
  return createModifyData<ModifyBlockData>(UPDATE, "block", blockId, payload);
}

function pushModifyDataList(modifyDataList: ModifyData[], newModifyDataList: ModifyData[]) {
  if(!newModifyDataList[0]) return;

  const modifyData = newModifyDataList.pop();

  let index = modifyDataList.findIndex((data) => data.blockId === modifyData.blockId && data.set === modifyData.set);

  if(index !== -1) {
    const { command, blockId, set, payload } = modifyDataList[index];

    if(set === "block") {

      if(modifyData.command === DELETE) {

        if(command === CREATE) {
          newModifyDataList.splice(index, 1);
        } else {
          newModifyDataList[index].command = DELETE;
        }

      } else {
        if(modifyData.payload) modifyDataList[index].payload = payload? Object.assign({}, payload, modifyData.payload) : modifyData.payload;
      }

    } else {
      modifyDataList.push(modifyData); 
    }

  } else { 
    modifyDataList.push(modifyData);
  }

  pushModifyDataList(modifyDataList, newModifyDataList);
}

function updateModifyData(preModifyData: ModifyData[], newModifyData: ModifyData[]) {
  if(!newModifyData[0]) {
    return preModifyData;
  }

  const modifyDataList = [...preModifyData];

  newModifyData.reverse();

  pushModifyDataList(modifyDataList, newModifyData);

  return modifyDataList;
}

const modifyDataReducer = (acc: ModifyBlockDataType, cur: ModifyData) => {
  switch (cur.command) {
    case CREATE:
      cur.command = undefined;
      acc.create.push(cur);
      
      break;

    case UPDATE:
      cur.command = undefined;
      acc.update.push(cur);
      
      break;

    case DELETE:
      if(cur.set === "block") {
        acc.delete.blockIdList.push(cur.blockId);
      } else if(cur.set === "comment") {
        acc.delete.commentIdList.push(cur.payload);
      }

      break;
  }

  return acc;
}

function convertModifyBlockData(modifyDataList: ModifyData[] | null) {
  if(!modifyDataList[0] || !modifyDataList) return null;

  const acc: ModifyBlockDataType = {
    create: [],
    update: [],
    delete: {
      blockIdList: [],
      commentIdList: []
    }
  }
  const modifyData: ModifyBlockDataType = modifyDataList.reduce(modifyDataReducer, acc);
  
  if(!modifyData.create[0]) modifyData.create = undefined;
  if(!modifyData.update[0]) modifyData.update = undefined;
  if(!modifyData.delete.blockIdList[0]) modifyData.delete.blockIdList = undefined;
  if(!modifyData.delete.commentIdList[0]) modifyData.delete.commentIdList = undefined;
  if(!modifyData.delete.blockIdList && !modifyData.delete.commentIdList) modifyData.delete = undefined;

  return modifyData;
}

function replaceModifyBlockData(currentData: ModifyData[], replaceData: ModifyBlockDataType): ModifyData[] {
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

      if(index !== -1) {
        if(newModifyData[index].command !== DELETE) {
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

function createPageTitleBlockData(title: string) {
  return createBlockData<string>({
    id: "title",
    position: "title",
    type: "title",
    styleType: "bk-title",
    parentId: "title",
    contents: title
  });
}

function revertBlockState(
  state: BlockState, 
  front: boolean
): BlockState {
  if(!front && state.tempBack[0]) {
    const tempBack = state.tempBack.concat();
    const lastTempBack = tempBack.pop();
    const editingBlockId = lastTempBack.editingBlockId? lastTempBack.editingBlockId : null;
    const { blockList, tempData, modifyData } = restoreBlock(state.blockList, lastTempBack);

    let titleBlockData = null;
    let lastTitleBlockData = state.titleBlock;

    if(lastTempBack.pageTitle) {
      if(lastTempBack.pageTitle) {
        titleBlockData = createPageTitleBlockData(lastTempBack.pageTitle);
      }
    }

    console.log(lastTempBack);
    
    tempData.editingBlockId = state.editingBlockId;
    tempData.pageTitle = titleBlockData? lastTitleBlockData.contents : undefined;

    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId,
      blockList,
      titleBlock: titleBlockData? titleBlockData : lastTitleBlockData,
      tempBack,
      tempFront: tempDataPush(state.tempFront, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: true
    });

  } else if(state.tempFront[0]) {
    const tempFront = state.tempFront.concat();
    const lastTempFront = tempFront.pop();
    const editingBlockId = lastTempFront.editingBlockId? lastTempFront.editingBlockId : null;
    const { blockList, tempData, modifyData } = restoreBlock(state.blockList, lastTempFront);

    let titleBlockData = null;
    let lastTitleBlockData = state.titleBlock;

    if(lastTempFront.pageTitle) {
      if(lastTempFront.pageTitle) {
        titleBlockData = createPageTitleBlockData(lastTempFront.pageTitle);
      }
    }
    
    tempData.editingBlockId = state.editingBlockId;
    tempData.pageTitle = titleBlockData? lastTitleBlockData.contents : undefined;

    return updateObject<BlockState, BlockStateProps>(state, {
      blockList,
      editingBlockId,
      tempFront,
      tempBack: tempDataPush(state.tempBack, tempData),
      modifyData: updateModifyData(state.modifyData, modifyData),
      isFetch: true
    });

  } else {
    return state;
  }
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
  convertModifyBlockData,
  replaceModifyBlockData,
  createPageTitleBlockData,
  revertBlockState
}

export default sideStoreUtils;