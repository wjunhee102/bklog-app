import React from "react";
import useBlockBase from "../hooks/useBlockBase";
import { BlockComponentProps, ParentInfoType } from "../../BlockComponent";
import ChildrenBlock from "../../ChildrenBlock";
import classNames from "classnames";
import BlockContentsArea from "../common/BlockContentsArea";
import BlockSelectArea from "../common/block-select-area";
import { UnionBlock } from "../../../../entities/block/type";

export interface BaseProps {
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BaseBlockZoneProps extends BlockComponentProps<UnionBlock> {
  children: (props: BaseProps) => React.ReactNode;
  parentInfo?: ParentInfoType;
}

const BaseBlockZone: React.FC<BaseBlockZoneProps> = ({ 
  block, useBlockReducer, parentInfo, children 
}) => {

  const {
    parentSelected,
    selected,
    setSelect,
    updated,
    childrenBlock
  } = useBlockBase(block, useBlockReducer, parentInfo);

  return (
    <div 
      className={classNames(
        "block-zone",
        { selected: parentSelected? false : selected },
        { updated }
      )}
    >
      
      <BlockContentsArea
        block={block}
        useBlockReducer={useBlockReducer}
        childrenBlock={childrenBlock}
      >
        { children({selected, setSelect}) }
      </BlockContentsArea>
      
      <ChildrenBlock 
        childrenBlock={childrenBlock} 
        useBlockReducer={useBlockReducer} 
        parentInfo={{
          type: block.type,
          selected
        }} 
      />

      <BlockSelectArea 
        block={block}
        useBlockReducer={useBlockReducer}
        parentInfo={parentInfo}
        selected={selected}
        setSelect={setSelect}
      />
      
    </div>
  )
}

export default BaseBlockZone;