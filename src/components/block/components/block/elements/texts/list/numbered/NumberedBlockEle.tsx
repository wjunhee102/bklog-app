import React from 'react';
import { NumberedBlock } from '../../../../../../entities/block/text/NumberedBlock';
import { BlockComponentProps } from '../../../../BlockComponent';
import { BaseProps } from '../../../../zone/base/BaseBlockZone';
import TextBlockActionMenuBar from '../../../common/action-menubar';
import ContentEditableEle from '../../../common/ContentEditableEle';
import useNumberedBlock from '../hooks/useListBlock';

interface NumberedBlockEleProps extends BlockComponentProps<NumberedBlock> {
  zoneProps: BaseProps;
}

const NumberedBlockEle: React.FC<NumberedBlockEleProps> = (props) => {
  const { block,useBlockReducer } = props;

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
  } = useNumberedBlock(props);

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