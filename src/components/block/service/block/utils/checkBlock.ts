import { BlockInstancesTable } from '.';
import { Block } from '../../../entities/block/abstract/Block';
import { UnionBlock, UnionBlockGenericType } from '../../../entities/block/type';

function checkInstanceOfBlock(block: Block<UnionBlockGenericType> | UnionBlock): boolean {
  if(BlockInstancesTable.hasOwnProperty(block.type)) {
    return block instanceof BlockInstancesTable[block.type];
  }

  return false;
}

function checkInstanceOfBlockList(blockList: UnionBlock[]): boolean {

  for(const block of blockList) {

    if(BlockInstancesTable.hasOwnProperty(block.type)) {
      if(block instanceof BlockInstancesTable[block.type] === false) return false; 
    } else {
      return false;
    }
  
  }

  return true;
}

export default {
  checkInstanceOfBlock,
  checkInstanceOfBlockList
}