import React from "react";
import { UseBlockTypes } from "./hooks/useBlock";
import { BlockData } from "./types";

interface BlockEleProps {
  idx: number;
  blockData: BlockData,
  actions: UseBlockTypes
}

const BlockElement: React.FC<BlockEleProps> = ({
  idx,
  blockData,
  actions
}) => {
  return (
    <div className="block-zone">

    </div>
  )
}

export default BlockElement;
