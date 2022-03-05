import React from 'react';
import { BulletedBlock } from '../../../../../../entities/block/text/BulletedBlock';
import { BlockComponentProps } from '../../../../BlockComponent';
import ListTextZone from '../../../../zone/list-text/ListTextZone';
import BulletedBlockEle from './BulletedBlockEle';

const BulletedBlockComponent: React.FC<BlockComponentProps<BulletedBlock>> = (props) => {
  const { block, useBlockReducer } = props;

  return (
    <ListTextZone {...props}>
      {
        (zoneProps) => {
          return (
            <BulletedBlockEle 
              block={block} 
              useBlockReducer={useBlockReducer} 
              zoneProps={zoneProps}
            />
          );
        }
      }
    </ListTextZone>
  );
}

export default BulletedBlockComponent;