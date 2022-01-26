import React from 'react';
import { BlockProps } from '../../Block';
import BaseBlockZone from '../../zone/base';
import ImageBlockEle from './ImageBlockEle';

const ImageBlock: React.FC<BlockProps> = ({
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
            <ImageBlockEle
              blockData={blockData}
              useBlockReducer={useBlockReducer}
              zoneProps={props}
            />
          )
        }
      }
    </BaseBlockZone>
  );
}

export default ImageBlock;