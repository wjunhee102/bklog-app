import React from "react";
import { UnionBlock } from "../../entities/block/type";
import { BLOCK_IMAGE } from "../../entities/block/type/types/image";
import { BLOCK_TEXT } from "../../entities/block/type/types/text";
import { UseBlockType } from "../../hooks/useBlock";
import BlockComponentTable from './BlockComponentTable';

export interface ParentInfoType {
  type: string;
  selected: boolean;
  tagTypeIdx?: number;
};

export interface BlockComponentProps<T extends UnionBlock = UnionBlock> {
  block: T;
  useBlockReducer: UseBlockType;
  parentInfo?: ParentInfoType;
}

const BlockComponent: React.FC<BlockComponentProps<UnionBlock>> = ({
  block,
  useBlockReducer,
  parentInfo
}) => {
  if(BlockComponentTable.hasOwnProperty(block.type)) {
    return BlockComponentTable[block.type as keyof typeof BlockComponentTable]({block: block as never, useBlockReducer, parentInfo});
  }

  return null;
}

export default BlockComponent;
