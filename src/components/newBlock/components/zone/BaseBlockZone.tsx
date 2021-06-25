import React from "react";
import useBlockBase from "../../hooks/useBlockBase";
import { BlockProps } from "../Block";
import ChildrenBlock from "../ChildrenBlock";

const BaseBlockZone: React.FC<BlockProps> = ({ blockData, hooks, children }) => {
  const {
    selected,
    setSelect,
    childrenBlockData,
    handleKeyDown,
    blockRef
  } = useBlockBase(blockData, hooks);

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
      onKeyDown={handleKeyDown}
      ref={blockRef}
    >
      { children }
      <ChildrenBlock childrenBlockData={childrenBlockData} hooks={hooks} />
    </div>
  )
}

export default BaseBlockZone;