import { ImageBlock } from "../../../entities/block/image/ImageBlock";
import { NumberedBlock } from "../../../entities/block/text/NumberedBlock";
import { TextBlock } from "../../../entities/block/text/TextBlock";
import { UnionBlock, UnionBlockData, UnionRawBlockData } from "../../../entities/block/type";
import { BLOCK_IMAGE } from "../../../entities/block/type/types/image";
import { BLOCK_NUMBERED, BLOCK_TEXT } from "../../../entities/block/type/types/text";


function createBlock(blockData: UnionBlockData | UnionRawBlockData ): UnionBlock | null {
  switch(blockData.type) {
    case BLOCK_TEXT:
      return new TextBlock(blockData);
      
    case BLOCK_NUMBERED: 
      return new NumberedBlock(blockData);

    case BLOCK_IMAGE:
      return new ImageBlock(blockData);
  }

  return null;
}


export default {
  createBlock
}