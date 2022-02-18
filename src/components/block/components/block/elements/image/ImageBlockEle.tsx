import classNames from 'classnames';
import React from 'react';
import { ImageBlock } from '../../../../entities/block/image/ImageBlock';
import { BlockComponentProps } from '../../BlockComponent';
import { BaseProps } from '../../zone/base/BaseBlockZone';
import useImageBlock from './hooks/useImageBlock';

interface ImageBlockEleProps extends BlockComponentProps<ImageBlock> {
  zoneProps: BaseProps;
}

const ImageBlockEle: React.FC<ImageBlockEleProps> = ({
  block,
  useBlockReducer,
  zoneProps
}) => {

  const {
    imageBlockContainer,
    handleResizeOn,
    handleResize,
    handleResizeOff
  } = useImageBlock(block, useBlockReducer, zoneProps);

  return (
    <div 
      className={classNames("image-block block", {
        "disable": zoneProps.selected
      })}
      onMouseMove={handleResize}
      onMouseUp={handleResizeOff}
      onMouseLeave={handleResizeOff}
      onBlur={handleResizeOff}
    >
      <div 
        className="image-block-container"
        ref={imageBlockContainer}
      >

        <div className="image-block-contents">
          <img className="block-img" src={block.contents.url} alt="" />
        </div>

        <div className="image-block-overlay">
          <div 
            className="image-block-resizebar leftbar"
            onMouseDown={handleResizeOn(false)}
          >
            <div className="vertical-bar"></div>
          </div>

          <div 
            className="image-block-resizebar rightbar"
            onMouseDown={handleResizeOn(true)}
          >
            <div className="vertical-bar"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ImageBlockEle;