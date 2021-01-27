import { TempData, StagedBlock } from './index';
import { BlockData, TextProps } from '../../../../types/bklog';

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

  stage.forEach(data => {
    changedBlocks.push(blocks[data.blockIndex - 1]);
    
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