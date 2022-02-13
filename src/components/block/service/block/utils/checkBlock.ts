import { BlockInstancesTable } from '.';
import { Block } from '../../../entities/block/abstract/Block';
import { BlockType, UnionBlock, UnionBlockGenericType } from '../../../entities/block/type';
import { BLOCK_CONTAINER } from '../../../entities/block/type/types/container';
import { BLOCK_IMAGE } from '../../../entities/block/type/types/image';
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TODO } from '../../../entities/block/type/types/text';
import { BLOCK_TEXT } from '../../../types';

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

const TEXT_TYPE_LIST = [BLOCK_TEXT, BLOCK_TODO, BLOCK_NUMBERED, BLOCK_BULLETED];
const IMAGE_TYPE_LIST = [BLOCK_IMAGE];
const CONTAINER_TYPE_LIST = [BLOCK_CONTAINER];
const BLOCK_TYPE_LIST = [TEXT_TYPE_LIST, IMAGE_TYPE_LIST, CONTAINER_TYPE_LIST];

function checkKindOfBlockType(type: BlockType): BlockType {
  return BLOCK_TYPE_LIST.filter(typeList => typeList.includes(type as never))[0][0];
}

export default {
  checkInstanceOfBlock,
  checkInstanceOfBlockList,
  checkKindOfBlockType
}