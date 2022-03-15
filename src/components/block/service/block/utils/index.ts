import { ImageBlock } from "../../../entities/block/image/ImageBlock";
import { NumberedBlock } from "../../../entities/block/text/NumberedBlock";
import { TextBlock } from "../../../entities/block/text/TextBlock";
import { UnionBlock } from "../../../entities/block/type";
import { BLOCK_CONTAINER } from "../../../entities/block/type/types/container";
import { BLOCK_IMAGE } from "../../../entities/block/type/types/image";
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT, BLOCK_TODO } from "../../../entities/block/type/types/text";
import { BLOCK_TITLE } from "../../../entities/block/type/types/title";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import checkBlock from "./checkBlock";
import create from "./create";
import positioning from "./positioning";
import setMap from "./setMap";
import update from "./update";

export type BlockIdMap = Map<string, true>;
export interface ResBlockService {
  blockList: UnionBlock[];
  modifyBlockTokenList?: ModifyBlockToken[];
  historyBlockTokenList?: HistoryBlockToken[];
}

export interface BlockPosition {
  previousId: string | null;
  parentId: string | null;
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

export const createBlockIdMap = setMap.createBlockIdMap;

export const createBlock = create.createBlock;

export const sortBlockList         = positioning.sortBlockList;
export const positioningBlock      = positioning.positioningBlock;
export const resetToTargetPosition = positioning.resetToTargetPosition;

export const findBlock                     = update.findBlock;
export const findBlockIndex                = update.findBlockIndex;        
export const updateBlockListStagedProperty = update.updateBlockListStagedProperty;
export const recolieBlockPreviousId        = update.recolieBlockPreviousId;
export const insertBlockList               = update.insertBlockList;
export const removeBlockList               = update.removeBlockList;
export const changeBlockType               = update.changeBlockType;

export const checkInstanceOfBlock     = checkBlock.checkInstanceOfBlock;
export const checkInstanceOfBlockList = checkBlock.checkInstanceOfBlockList;
export const checkKindOfBlockType     = checkBlock.checkKindOfBlockType;