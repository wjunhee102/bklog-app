import React from 'react';
import { BulletedBlock } from '../../../../entities/block/text/BulletedBlock';
import { BlockComponentProps } from '../../BlockComponent';
import BaseBlockZone from '../../zone/base';
import BulletedBlockEle from './BulletedBlockEle';

const BulletedBlockComponent: React.FC<BlockComponentProps<BulletedBlock>> = ({
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
            <BulletedBlockEle 
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

export default BulletedBlockComponent;