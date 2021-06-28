import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import '../assets/block.scss';
import TextBlock from "./elements/text";

export type ParentInfoType = {
  type: string;
  selected: boolean;
};

export interface BlockProps {
  blockData: BlockData;
  hooks: UseBlockType;
  parentInfo?: ParentInfoType | undefined;
}

const Block: React.FC<BlockProps> = ({
  blockData,
  hooks,
  parentInfo
}) => {
  switch(blockData.type) {
    case "text":
      return <TextBlock blockData={blockData} hooks={hooks} parentInfo={parentInfo} />
    default:
      return null;
  };
}

export default Block;
