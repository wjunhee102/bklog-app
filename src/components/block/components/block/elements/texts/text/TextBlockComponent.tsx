import React from "react";
import { TextBlock } from "../../../../../entities/block/text/TextBlock";
import { BlockComponentProps } from "../../../BlockComponent";
import BaseBlockZone from "../../../zone/base";
import TextBlockEle from "./TextBlockEle";


const TextBlockComponent: React.FC<BlockComponentProps<TextBlock>> = ({ 
  block, 
  useBlockReducer, 
  parentInfo 
}) => {
  return (
    <BaseBlockZone
      block={block}
      useBlockReducer={useBlockReducer}
      parentInfo={parentInfo}
    >
      {
        (props) => {
          return (
            <TextBlockEle 
              block={block} 
              useBlockReducer={useBlockReducer} 
              zoneProps={props}
            />
          );
        }
      }
    </BaseBlockZone>
  );
}

export default TextBlockComponent;