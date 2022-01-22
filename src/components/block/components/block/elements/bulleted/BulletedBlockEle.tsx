import React from 'react';
import { BlockProps } from '../../Block';
import { BaseProps } from '../../zone/base/BaseBlockZone';
import TextBlockActionMenuBar from '../common/action-menubar';
import ContentEditableEle from '../common/ContentEditableEle';
import useTextBlock from '../text/hooks/useTextBlock';

interface BulletedBlockEleProps extends BlockProps {
  zoneProps: BaseProps;
}

const BulletedBlockEle: React.FC<BulletedBlockEleProps> = ({
  blockData,
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
  } = useTextBlock(blockData, useBlockReducer, zoneProps);

  return (
    <div
      className="bulleted-block block"
      onBlur={handleBlur}
    >
      <ContentEditableEle
        className={blockData.styleType}
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
          blockData={blockData}
          startPosition={cursorStart}
          endPosition={cursorEnd}
          reBlockFocus={handleElementFocus}
          useBlockReducer={useBlockReducer}
        /> : null
      }
    </div>
  );
}

export default BulletedBlockEle;