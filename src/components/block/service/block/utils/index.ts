import { ImageBlock } from "../../../entities/block/image/ImageBlock";
import { NumberedBlock } from "../../../entities/block/text/NumberedBlock";
import { TextBlock } from "../../../entities/block/text/TextBlock";
import { UnionBlock } from "../../../entities/block/type";
import { BLOCK_CONTAINER } from "../../../entities/block/type/types/container";
import { BLOCK_IMAGE } from "../../../entities/block/type/types/image";
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT, BLOCK_TODO } from "../../../entities/block/type/types/text";
import { BLOCK_TITLE } from "../../../entities/block/type/types/title";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import create from "./create";
import ordering from "./ordering";

export interface ResBlockService {
  blockList: Array<UnionBlock>;
  modifyBlockTokenList?: Array<ModifyBlockToken>;
  historyBlockTokenList?: Array<ModifyBlockToken>;
}

export const BlockInstancesTable = {
  [BLOCK_TEXT]      : TextBlock,
  [BLOCK_NUMBERED]  : NumberedBlock,
  [BLOCK_IMAGE]     : ImageBlock,
  [BLOCK_BULLETED]  : TextBlock,
  [BLOCK_TITLE]     : TextBlock,
  [BLOCK_TODO]      : TextBlock,
  [BLOCK_CONTAINER] : TextBlock
}

export const createBlock = create.createBlock;

export const sortBlock     = ordering.sortBlock;
export const orderingBlock = ordering.orderingBlock;