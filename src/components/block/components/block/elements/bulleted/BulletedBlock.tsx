import React from 'react';
import { BlockProps } from '../../Block';
import BaseBlockZone from '../../zone/base';
import BulletedBlockEle from './BulletedBlockEle';

const BulletedBlock: React.FC<BlockProps> = ({
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
            <BulletedBlockEle 
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

export default BulletedBlock;