import React from "react";
import { UnionBlock } from "../../entities/block/type";
import { UseBlockType } from "../../hooks/useBlock";
import Block, { ParentInfoType } from "./BlockComponent";

interface ChildrenBlockProps {
  childrenBlock: UnionBlock[] | null;
  useBlockReducer: UseBlockType;
  parentInfo: ParentInfoType;
}

const ChildrenBlock: React.FC<ChildrenBlockProps> = ({ childrenBlock, useBlockReducer, parentInfo }) => {
  return (
    <>
      { 
        childrenBlock ? 
        childrenBlock.map((child: any)=> 
          <Block
            key={child.id}
            block={child}
            useBlockReducer={useBlockReducer}
            parentInfo={parentInfo}
          />
        ) : null
      }
    </>
  );
}

export default ChildrenBlock;