import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import Block, { ParentInfoType } from "./Block";

interface ChildrenBlockProps {
  childrenBlockData: BlockData[] | null;
  hooks: UseBlockType;
  parentInfo: ParentInfoType;
}

const ChildrenBlock: React.FC<ChildrenBlockProps> = ({ childrenBlockData, hooks, parentInfo }) => {
  return (
    <>
      { 
        childrenBlockData ? 
        childrenBlockData.map((child: any)=> 
          <Block
            key={child.id}
            blockData={child}
            hooks={hooks}
            parentInfo={parentInfo}
          />
        ) : null
      }
    </>
  );
}

export default ChildrenBlock;