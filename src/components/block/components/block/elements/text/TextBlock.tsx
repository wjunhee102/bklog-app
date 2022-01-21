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
        (props) => {
          return (
            <TextBlockEle 
              blockData={blockData} 
              useBlockReducer={useBlockReducer} 
              zoneProps={props}
            />
          );
        }
      }
    </BaseBlockZone>
  );
}

export default TextBlock;