import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import Block, { ParentInfoType } from "./Block";

interface ChildrenBlockProps {
  childrenBlockData: BlockData[] | null;
  useBlockReducer: UseBlockType;
  parentInfo: ParentInfoType;
}

const ChildrenBlock: React.FC<ChildrenBlockProps> = ({ childrenBlockData, useBlockReducer, parentInfo }) => {
  return (
    <>
      { 
        childrenBlockData ? 
        childrenBlockData.map((child: any)=> 
          <Block
            key={child.id}
            blockData={child}
            useBlockReducer={useBlockReducer}
            parentInfo={parentInfo}
          />
        ) : null
      }
    </>
  );
}

export default ChildrenBlock;