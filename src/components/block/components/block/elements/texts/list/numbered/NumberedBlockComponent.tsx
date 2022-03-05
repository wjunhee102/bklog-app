import React from 'react';
import { NumberedBlock } from '../../../../../../entities/block/text/NumberedBlock';
import { BlockComponentProps } from '../../../../BlockComponent';
import ListTextZone from '../../../../zone/list-text';
import NumberedBlockEle from './NumberedBlockEle';

const NumberedBlockComponent: React.FC<BlockComponentProps<NumberedBlock>> = (props) => {
  const { block, useBlockReducer } = props;
  
  return (
    <ListTextZone {...props}>
      {
        (zoneProps) => {
          return (
            <NumberedBlockEle 
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

export default NumberedBlockComponent;