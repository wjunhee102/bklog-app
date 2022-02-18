import React from 'react';
import { NumberedBlock } from '../../../../entities/block/text/NumberedBlock';
import { UnionTextBlock } from '../../../../entities/block/type';
import { BlockComponentProps } from '../../BlockComponent';
import { BaseProps } from '../../zone/base/BaseBlockZone';
import TextBlockActionMenuBar from '../common/action-menubar';
import ContentEditableEle from '../common/ContentEditableEle';
import useTextBlock from '../text/hooks/useTextBlock';

interface NumberedBlockEleProps extends BlockComponentProps<NumberedBlock> {
  zoneProps: BaseProps;
}

const NumberedBlockEle: React.FC<NumberedBlockEleProps> = ({
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
      className="numbered-block block"
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
  );
}

export default NumberedBlockEle;