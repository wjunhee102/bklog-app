import React from "react";
import useBlockBase from "./hooks/useBlockBase";
import { BlockProps, ParentInfoType } from "../../Block";
import ChildrenBlock from "../../ChildrenBlock";
import classNames from "classnames";
import BlockContentsArea from "../common/BlockContentsArea";
import BlockSelectArea from "../common/BlockSelectArea";

export interface BaseProps {
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BaseBlockZoneProps extends BlockProps {
  children: (props: BaseProps) => React.ReactNode;
  parentInfo?: ParentInfoType;
}

const BaseBlockZone: React.FC<BaseBlockZoneProps> = ({ 
  blockData, useBlockReducer, parentInfo, children 
}) => {

  const {
    parentSelected,
    selected,
    setSelect,
    updated,
    childrenBlockData
  } = useBlockBase(blockData, useBlockReducer, parentInfo);

  return (
    <div 
      className={classNames(
        "block-zone",
        { selected: parentSelected? false : selected },
        { updated }
      )}
    >
      <BlockContentsArea
        blockData={blockData}
        useBlockReducer={useBlockReducer}
        childrenBlockData={childrenBlockData}
      >
        { children({selected, setSelect}) }
      </BlockContentsArea>
      
      <ChildrenBlock 
        childrenBlockData={childrenBlockData} 
        useBlockReducer={useBlockReducer} 
        parentInfo={{
          type: blockData.type,
          selected
        }} 
      />

      <BlockSelectArea 
        blockData={blockData}
        useBlockReducer={useBlockReducer}
        parentInfo={parentInfo}
        selected={selected}
        setSelect={setSelect}
      />
      
    </div>
  )
}

export default BaseBlockZone;