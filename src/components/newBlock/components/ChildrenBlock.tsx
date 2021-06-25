import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import Block from "./Block";

interface ChildrenBlockProps {
  childrenBlockData: BlockData[] | null;
  hooks: UseBlockType;
}

const ChildrenBlock: React.FC<ChildrenBlockProps> = ({ childrenBlockData, hooks }) => {
  return (
    <>
      { 
        childrenBlockData ? 
        childrenBlockData.map((child: any)=> 
          <Block
            key={child.id}
            blockData={child}
            hooks={hooks}
          />
        ) : null
      }
    </>
  );
}

export default ChildrenBlock;