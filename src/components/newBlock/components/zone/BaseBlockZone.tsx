import React from "react";
import useBlockBase from "../../hooks/useBlockBase";
import { BlockProps } from "../Block";
import ChildrenBlock from "../ChildrenBlock";

interface BaseBlockZoneProps extends BlockProps {
  children: (
    selected: boolean, 
    setSelect: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
}

const BaseBlockZone: React.FC<BaseBlockZoneProps> = ({ blockData, hooks, children }) => {
  const {
    selected,
    setSelect,
    childrenBlockData
  } = useBlockBase(blockData, hooks);

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
    >
      { children(selected, setSelect) }
      <ChildrenBlock childrenBlockData={childrenBlockData} hooks={hooks} />
    </div>
  )
}

export default BaseBlockZone;