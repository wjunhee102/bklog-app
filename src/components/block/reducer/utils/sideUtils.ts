import { TempData, StagedBlock, ModifyData } from ".";
import { BlockData, TextProps } from "../../types";

function tempDataPush(
  tempStore: TempData[], 
  tempData: TempData, 
  limitCount: number = 5
  ): TempData[] {

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
  
  let changedBlocks:BlockData<TextProps>[] = [];
  console.log(stage);
  stage.forEach(data => {
    console.log(blocks[data.blockIndex - 1]);
    if(blocks[data.blockIndex - 1].type === "text") {
      changedBlocks.push(blocks[data.blockIndex - 1]);
    }
  });
  
  console.log(changedBlocks);
  return changedBlocks.map(block => {
    return {
      id: block.id,
      contents: block.property? block.property.contents : null,
      blockIndex: block.index
    }
  })
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
  updateModifyData
}

export default sideStoreUtils;