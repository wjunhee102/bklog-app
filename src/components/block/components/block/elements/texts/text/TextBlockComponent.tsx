import React from "react";
import { TextBlock } from "../../../../../entities/block/text/TextBlock";
import { BlockComponentProps } from "../../../BlockComponent";
import BaseBlockZone from "../../../zone/base";
import TextBlockEle from "./TextBlockEle";


const TextBlockComponent: React.FC<BlockComponentProps<TextBlock>> = (props) => {
  const { block, useBlockReducer } = props;

  return (
    <BaseBlockZone {...props}>
      {
        (zoneProps) => {
          return (
            <TextBlockEle 
              block={block} 
              useBlockReducer={useBlockReducer} 
              zoneProps={zoneProps}
            />
          );
        }
      }
    </BaseBlockZone>
  );
}

export default TextBlockComponent;