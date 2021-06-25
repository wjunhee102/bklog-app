import React from 'react';
import { UseBlockType } from "../../../hooks/useBlock";
import useTextBlock from '../../../hooks/useTextBlock';
import { BlockData } from "../../../types";
import { BlockProps } from '../../Block';
import ContentEditableEle from './base/ContentEditableEle';
import TextStyleToggle from './base/TextStyleToggle';

const TextBlockEle: React.FC<BlockProps> = ({ blockData, hooks }) => {

  const {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockRef,
    createMarkup,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    reBlockFocus,
    editable
  } = useTextBlock(blockData, hooks);

  return (
    <div 
      className="bk-block relative pr-8"
      onBlur={handleBlur}
      > 
      { 
        <ContentEditableEle
          className={blockData.styleType}
          editable={editable}
          dangerouslySetInnerHTML={createMarkup}
          ref={blockRef}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onMouseDown={isFocus}
          onMouseUp={handleMouseUp}
          onFocus={isFocus}
          placeholder="입력해주세요..."
        />
      }
      {
        styleToggle? 
        <TextStyleToggle
          blockIndex={blockData.index}
          startPosition={cursorStart}
          endPosition={cursorEnd}
          contents={blockData.contents}
          reBlockFocus={reBlockFocus}
          hooks={hooks}
        /> : null
      }
    </div>
  )
}

export default TextBlockEle;