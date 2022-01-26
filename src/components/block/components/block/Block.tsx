import React from "react";
import { UseBlockType } from "../../hooks/useBlock";
import { BlockData } from "../../types";
import BlockTable from './BlockTable';

export type ParentInfoType = {
  type: string;
  selected: boolean;
};

export interface BlockProps {
  blockData: BlockData;
  useBlockReducer: UseBlockType;
  parentInfo?: ParentInfoType;
}

const Block: React.FC<BlockProps> = ({
  blockData,
  useBlockReducer,
  parentInfo
}) => {
  if(BlockTable.hasOwnProperty(blockData.type)) {
    return BlockTable[blockData.type]({blockData, useBlockReducer, parentInfo});
  } else {
    return BlockTable["text"]({blockData, useBlockReducer, parentInfo});
  }
}

export default Block;
