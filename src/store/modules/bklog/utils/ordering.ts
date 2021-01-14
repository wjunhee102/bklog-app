import { RawBlockData, BlockData, UUID } from '../../../../types/bklog';

/**
 * block ordering
 * @param block 
 */
export default function orderingBlock(block:any): BlockData<any>[] {
  const rawBlocks: RawBlockData<any>[] | BlockData<any>[] = block.concat();
  const newBlocks: BlockData<any>[] = [];
  const deleteCount = 1;
  let splicePoint: number = 0;
  let blockIndex: number = 1;
  let nextBlockId: UUID | null = null;
  let idStack:UUID[] = [];

  /**
   * 첫번째 block 찾기
   * @param block 
   * @param idx 
   */
  const isFirstBlock = (block: RawBlockData<any>, idx: number) => {
    if(!block.parentId && !block.preBlockId) {
      splicePoint = idx;
      nextBlockId = block.nextBlockId;
      return true;
    } return false;
  }

  /**
   * 다음 block 찾기
   * @param id 
   */
  const isNextBlock = (id: string) => (block: RawBlockData<any>, idx: number) => {
    if(block.id === id) {
      splicePoint = idx;
      if(block.children[0]) {
        nextBlockId = block.children[0];
        if(block.nextBlockId) idStack.push(block.nextBlockId)
      } else {
        nextBlockId = block.nextBlockId
      }
      return true;
    }
    return false;
  }

  while(rawBlocks[0]) {
    let currentId:UUID | undefined | null;

    if(nextBlockId) {
      currentId = nextBlockId;
    } else if(idStack.length >= 1) {
      currentId = idStack.pop();
    }

    if(currentId) {
      newBlocks.push(Object.assign({}, 
          rawBlocks.filter(isNextBlock(currentId))[0], {
          index: blockIndex++
        })
      );
    
    } else {
      newBlocks.push(Object.assign({}, 
        rawBlocks.filter(isFirstBlock)[0], {
          index: blockIndex++
        })
      );
    }
    console.log(blockIndex, newBlocks);
    rawBlocks.splice(splicePoint, deleteCount);
  }
  
  return newBlocks;
}