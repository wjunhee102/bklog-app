import React from "react";
import { UseBlockType } from "../hooks/useBlock";
import { BlockData } from "../types";
import TextBlock from "./elements/text";

export type ParentInfoType = {
  type: string;
  selected: boolean;
};

export interface BlockProps {
  blockData: BlockData;
  useBlockReducer: UseBlockType;
  parentInfo?: ParentInfoType;
}

// const BlockHandler = {
//   ["text"]: (
//       blockData: BlockData, 
//       useBlockReducer: UseBlockType, 
//       parentInfo?: ParentInfoType
//     ) =>  <TextBlock blockData={blockData} useBlockReducer={useBlockReducer} parentInfo={parentInfo} />

// }

const Block: React.FC<BlockProps> = ({
  blockData,
  useBlockReducer,
  parentInfo
}) => {
  switch(blockData.type) {
    case "text":
      return <TextBlock blockData={blockData} useBlockReducer={useBlockReducer} parentInfo={parentInfo} />
    default:
      return null;
  };
  // if(BlockHandler.hasOwnProperty(blockData.type)) {
  //   return BlockHandler[blockData.type](blockData, useBlockReducer, parentInfo);
  // } else {
  //   return null
  // }
}

export default Block;
