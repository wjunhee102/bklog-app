import React from "react";
import { UseBlockType } from "../../hooks/useBlock";
import { BlockData } from "../../types";
import TextBlock from "./elements/text";
import TitleBlock from "./elements/title";
import './Block.scss';

export type ParentInfoType = {
  type: string;
  selected: boolean;
};

export interface BlockProps {
  blockData: BlockData;
  useBlockReducer: UseBlockType;
  parentInfo?: ParentInfoType;
}

// BlockTable에 없는 type일시 삭제되도록 설정해야함.
const BlockTable = {
  ["text"]: (props: BlockProps) => <TextBlock {...props} />,
  ["title"]: (props: BlockProps) => <TitleBlock {...props} />
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
