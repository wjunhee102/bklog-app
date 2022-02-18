import React from 'react';
import { ImageBlock } from '../../../../entities/block/image/ImageBlock';
import { BlockComponentProps } from '../../BlockComponent';
import BaseBlockZone from '../../zone/base';
import ImageBlockEle from './ImageBlockEle';

const ImageBlockComponent: React.FC<BlockComponentProps<ImageBlock>> = ({
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
            <ImageBlockEle
              block={block}
              useBlockReducer={useBlockReducer}
              zoneProps={props}
            />
          )
        }
      }
    </BaseBlockZone>
  );
}

export default ImageBlockComponent;