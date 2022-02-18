import React from 'react';
import useTextBlock from './hooks/useTextBlock';
import { BlockComponentProps } from '../../BlockComponent';
import TextBlockActionMenuBar from '../common/action-menubar';
import ContentEditableEle from '../common/ContentEditableEle';
import { BaseProps } from '../../zone/base/BaseBlockZone';
import { TextBlock } from '../../../../entities/block/text/TextBlock';

interface TextBlockEleProps extends BlockComponentProps<TextBlock> {
  zoneProps: BaseProps;
}

const TextBlockEle: React.FC<TextBlockEleProps> = ({ 
  block, 
  useBlockReducer, 
  zoneProps
}) => {

  const {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockContentsRef,
    contentsHTML,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    handleElementFocus,
    editable
  } = useTextBlock(block, useBlockReducer, zoneProps);

  return (
    <div 
      className="text-block block"
      onBlur={handleBlur}
    > 
      <ContentEditableEle
        className={block.styleType}
        editable={editable}
        dangerouslySetInnerHTML={contentsHTML}
        ref={blockContentsRef}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onMouseUp={handleMouseUp}
        onFocus={isFocus}
        placeholder="입력해주세요..."
      />
      {
        styleToggle?
        <TextBlockActionMenuBar 
          show={styleToggle}
          block={block}
          startPosition={cursorStart}
          endPosition={cursorEnd}
          reBlockFocus={handleElementFocus}
          useBlockReducer={useBlockReducer}
        /> : null
      }
    </div>
  )
}

export default TextBlockEle;