import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { BlockComponentProps, ParentInfoType } from "../../BlockComponent";
import useBlockBase from "../hooks/useBlockBase";
import BlockContentsArea from "../common/BlockContentsArea";
import ChildrenBlock from "../../ChildrenBlock";
import BlockSelectArea from "../common/block-select-area";
import ListTag from "./elements/ListTag";
import { BLOCK_NUMBERED } from "../../../../entities/block/type/types/text";
import { NumberedBlock } from "../../../../entities/block/text/NumberedBlock";


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

function getFrontPosition(position: string): string {
  const positionArg = position.split('-');
  const index = positionArg.length - 1;
  const lastPosition = +positionArg[index];

  if(lastPosition < 2) return "null";

  positionArg[index] = `${lastPosition - 1}`;    

  return positionArg.join('-');
}

// function setSortText(type: string, parentSortType: number | null) {

// }

export interface ListTextProps {
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ListTextZoneProps extends BlockComponentProps<NumberedBlock> {
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

  useEffect(() => {
    const inFrontOfBlock = blockList[block.index - 1];

    if(inFrontOfBlock
      && inFrontOfBlock instanceof NumberedBlock 
      && inFrontOfBlock.position === getFrontPosition(block.position)
      && inFrontOfBlock.meta?.order) {
      block.setOrder(inFrontOfBlock.meta.order + 1);

      return;
    }

    block.setOrder(1);
  }, [blockList[block.index - 1]?.meta]);

  useEffect(() => {
    console.log(block.position, block.meta);
  }, [block.meta]);

  return (
    <div
      className={classNames(
        "block-zone sorted-text-zone",
        { selected: parentSelected? false : selected },
        { updated }
      )}
    >

      <ListTag 
        block={block}
        useBlockReducer={useBlockReducer}
        parentTagType={parentTagType}
      />

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
  );
}

export default ListTextZone;