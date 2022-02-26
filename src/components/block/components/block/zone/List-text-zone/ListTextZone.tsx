import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { BlockComponentProps, ParentInfoType } from "../../BlockComponent";
import useBlockBase from "../hooks/useBlockBase";
import BlockContentsArea from "../common/BlockContentsArea";
import ChildrenBlock from "../../ChildrenBlock";
import BlockSelectArea from "../common/block-select-area";
import ListTag from "./elements/ListTag";
import { NumberedBlock } from "../../../../entities/block/text/NumberedBlock";
import { BulletedBlock } from "../../../../entities/block/text/BulletedBlock";
import "./ListTextZone.scss";


// numbered, bulleted, todo

const BulltedTypeList  = [ "●", "○", "■", "◎", "◇", "◆" ];

const NumberedTypeList = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 
  [], 
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"], 
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  "i", 
  "I"
];

function setSortType(parentSortType: number | null, typeList: string[]): [string, number] {
  let index: number = 0;
  
  if(parentSortType) {
    index = parentSortType + 1;
    if(!typeList[index]) index = 0;
  }

  return [ typeList[index], index ];
}

const SortedTypeTable = {
  "disc": "●",
  "cir": "○",
  "square": "■"
}

function covertSortType(sortType: any, index?: number) {
  if(index) return "1";

  return 
}
// function setSortText(type: string, parentSortType: number | null) {

// }

export interface ListTextProps {
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ListTextZoneProps extends BlockComponentProps<NumberedBlock | BulletedBlock> {
  children: (props: ListTextProps) => React.ReactNode;
}

const ListTextZone: React.FC<ListTextZoneProps> = ({
  block, useBlockReducer, parentInfo, children
}) => {

  const {
    state: {
      blockList
    }
  } = useBlockReducer;

  const {
    parentSelected,
    selected,
    setSelect,
    updated,
    childrenBlock
  } = useBlockBase(block, useBlockReducer, parentInfo);

  const parentTagType = (parentInfo && parentInfo.type === block.type && parentInfo.tagTypeIdx)?  
    parentInfo.tagTypeIdx : undefined;

  return (
    <div
      className={classNames(
        "block-zone sorted-text-zone",
        { selected: parentSelected? false : selected },
        { updated }
      )}
    >

      <BlockContentsArea
        block={block}
        useBlockReducer={useBlockReducer}
        childrenBlock={childrenBlock}
      >
        <div className="block-contents-container">
          <ListTag 
            block={block}
            useBlockReducer={useBlockReducer}
            parentTagType={parentTagType}
          />

          { children({selected, setSelect}) }
        </div>
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
  );
}

export default ListTextZone;