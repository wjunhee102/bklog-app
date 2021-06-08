import { BlockData } from "../../types";
import blockUtils from "./blockUtils";
import orderingBlockUtils from "./ordering";

export interface BlockState {
  blockList: BlockData[]
}

// block order utils;
export const sortBlock     = orderingBlockUtils.sortBlock;
export const orderingBlock = orderingBlockUtils.orderingBlock;
export const initBlock     = orderingBlockUtils.initBlock;


// block utils
export const resetToTargetPosition = blockUtils.resetToTargetPosition;