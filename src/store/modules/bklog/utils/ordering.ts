import { RawBlockData, BlockData, UUID } from '../../../../types/bklog';


type Blocks = RawBlockData<any>[] | BlockData<any>[];

/**
 * 첫번째 block 찾기
 */
const isFirstBlockPoint = (block: RawBlockData<any> | BlockData<any>) => 
  !block.preBlockId && !block.parentBlockId;

/**
 * 다음 block 찾기
 * @param id 
 */
const isNextBlockPoint = (id:string) => 
  (block: RawBlockData<any> | BlockData<any>) => 
  block.id === id;

/**
 * block ordering
 * @param block 
 */
export default function orderingBlock(blocks: Blocks): BlockData<any>[] {
  const BLOCK_LENGTH = blocks.length;
  const rawBlocks: Blocks = blocks.concat();
  const newBlocks: BlockData<any>[] = [];
  
  let newBlock: BlockData<any> | RawBlockData<any>;
  let currentPosition: number = 0;
  let blockIndex: number = 1;
  let nextBlockId: UUID | null = null;
  let idStack:UUID[] = [];
  let length: number = BLOCK_LENGTH - 1;
  
  while(rawBlocks[0] && newBlocks.length < BLOCK_LENGTH) {
    let currentId:UUID | undefined | null;

    if(nextBlockId) {
      currentId = nextBlockId;
    } else if(idStack.length >= 1) {
      currentId = idStack.pop();
    }

    if(currentId) {
      currentPosition = rawBlocks.findIndex(isNextBlockPoint(currentId));
    } else {
      currentPosition = rawBlocks.findIndex(isFirstBlockPoint);
    }

    if(currentPosition === -1) {
      console.log("currentId 누락", currentId, newBlocks)
      return newBlocks
    }

    newBlock = rawBlocks[currentPosition];

    if(newBlock.children[0] !== undefined) {
      nextBlockId = newBlock.children[0];
        if(newBlock.nextBlockId) idStack.push(newBlock.nextBlockId)
    } else {
      nextBlockId = newBlock.nextBlockId;
    }

    newBlocks.push(Object.assign({}, newBlock, {
      index: blockIndex++
    }));
  
    rawBlocks[currentPosition] = rawBlocks[length];
    rawBlocks.pop();

    length--;
  }
  
  return newBlocks;
}