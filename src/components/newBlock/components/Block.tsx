import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import '../assets/block.scss';
import TextBlock from "./elements/text";

export interface BlockProps {
  blockData: BlockData,
  hooks: UseBlockType
}

const Block: React.FC<BlockProps> = ({
  blockData,
  hooks
}) => {
  switch(blockData.type) {
    case "text":
      return <TextBlock blockData={blockData} hooks={hooks} />
    default:
      return null;
  };
}

export default Block;
