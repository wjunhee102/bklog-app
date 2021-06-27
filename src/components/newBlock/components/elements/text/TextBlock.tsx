import React from "react";
import { BlockProps } from "../../Block";
import BaseBlockZone from "../../zone/BaseBlockZone";
import TextBlockEle from "./TextBlockEle";

const TextBlock: React.FC<BlockProps> = ({ blockData, hooks }) => {
  return (
    <BaseBlockZone
      blockData={blockData}
      hooks={hooks}
    >
      {
        (selected, setSelect) => {
          return (
            <TextBlockEle 
              blockData={blockData} 
              hooks={hooks} 
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