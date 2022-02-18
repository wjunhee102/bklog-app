import React from 'react';
import { NumberedBlock } from '../../../../entities/block/text/NumberedBlock';
import { BlockComponentProps } from '../../BlockComponent';
import BaseBlockZone from '../../zone/base';
import NumberedBlockEle from './NumberedBlockEle';

const NumberedBlockComponent: React.FC<BlockComponentProps<NumberedBlock>> = ({
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
            <NumberedBlockEle 
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

export default NumberedBlockComponent;