import { TempData, StagedBlock } from ".";
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

const tempStoreUtils = {
  tempDataPush,
  getContentsToBeChanged
}

export default tempStoreUtils;