import React from 'react';
import useTitleBlock from './hooks/useTitleBlock';
import { BlockComponentProps } from '../../BlockComponent';
import ContentEditableEle from '../common/ContentEditableEle';
import { TitleBlock } from '../../../../entities/block/title/TitleBlock';

const TitleBlockEle: React.FC<BlockComponentProps<TitleBlock>> = ({
  block,
  useBlockReducer
}) => {

  const {
    blockContentsRef,
    handleKeyUp,
    handleKeyPress,
    handleMouseUp,
    isFocus,
    editable,
    handleBlur
  } = useTitleBlock(block, useBlockReducer);

  return (
    <div
      className="title-block block"
      onBlur={handleBlur}
    >
      <ContentEditableEle 
        className={block.styleType}
        editable={editable}
        ref={blockContentsRef}
        contents={block.contents}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onMouseUp={handleMouseUp}
        onFocus={isFocus}
        placeholder="무제"
      />
    </div>
  );
}

export default TitleBlockEle;