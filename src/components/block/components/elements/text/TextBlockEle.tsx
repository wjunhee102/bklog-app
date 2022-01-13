import React from 'react';
import useTextBlock from '../../../hooks/useTextBlock';
import { BlockProps } from '../../Block';
import TextBlockActionMenuBar from './elements/action-menubar';
import ContentEditableEle from '../../common/ContentEditableEle';

interface TextBlockEleProps extends BlockProps {
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextBlockEle: React.FC<TextBlockEleProps> = ({ 
  blockData, 
  useBlockReducer, 
  selected,
  setSelect
}) => {

  const {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockContentsRef,
    createMarkup,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    reBlockFocus,
    editable,
    setEditable
  } = useTextBlock(blockData, useBlockReducer, selected);

  return (
    <div 
      className="text-block"
      onBlur={handleBlur}
    > 
      <ContentEditableEle
        className={blockData.styleType}
        editable={editable}
        dangerouslySetInnerHTML={createMarkup}
        ref={blockContentsRef}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onMouseDown={isFocus}
        onMouseUp={handleMouseUp}
        onFocus={isFocus}
        placeholder="입력해주세요..."
      />
      {
        styleToggle?
        <TextBlockActionMenuBar 
          show={styleToggle}
          blockData={blockData}
          startPosition={cursorStart}
          endPosition={cursorEnd}
          reBlockFocus={reBlockFocus}
          useBlockReducer={useBlockReducer}
        /> : null
      }
    </div>
  )
}

export default TextBlockEle;