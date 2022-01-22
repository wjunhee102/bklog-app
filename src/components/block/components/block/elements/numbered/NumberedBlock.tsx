import React from 'react';
import { BlockProps } from '../../Block';
import BaseBlockZone from '../../zone/base';
import NumberedBlockEle from './NumberedBlockEle';

const NumberedBlock: React.FC<BlockProps> = ({
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
            <NumberedBlockEle 
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

export default NumberedBlock;