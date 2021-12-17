import React from "react";
import { BlockProps } from "../../Block";
import BaseBlockZone from "../../zone/base";
import TextBlockEle from "./TextBlockEle";

const TextBlock: React.FC<BlockProps> = ({ 
  blockData, 
  useBlockReducer, 
  parentInfo 
}) => {
  return (
    <BaseBlockZone
      blockData={blockData}
      useBlockReducer={useBlockReducer}
      parentInfo={parentInfo}
    >
      {
        (selected, setSelect) => {
          return (
            <TextBlockEle 
              blockData={blockData} 
              useBlockReducer={useBlockReducer} 
              selected={selected}
              setSelect={setSelect}
            />
          );
        }
      }
    </BaseBlockZone>
  )
}

export default TextBlock;