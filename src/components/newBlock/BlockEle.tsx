import React from "react";
import { BlockData } from "./types";

interface BlockEleProps {
  idx: number;
  position: number[];
  blockData: BlockData
}

const BlockElement: React.FC<BlockEleProps> = ({
  idx,
  position,
  blockData
}) => {
  return (
    <div>

    </div>
  )
}

export default BlockElement;
