import React from 'react';
import useTitleBlock from '../../../hooks/useTitleBlock';
import { BlockProps } from '../../Block';
import ContentEditableEle from '../../common/ContentEditableEle';

const TitleBlockEle: React.FC<BlockProps> = ({
  blockData,
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
  } = useTitleBlock(blockData, useBlockReducer);

  return (
    <div
      className="title-block"
      onBlur={handleBlur}
    >
      <ContentEditableEle 
        className={blockData.styleType}
        editable={editable}
        ref={blockContentsRef}
        contents={blockData.contents}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onMouseDown={isFocus}
        onMouseUp={handleMouseUp}
        onFocus={isFocus}
        placeholder="무제"
      />
    </div>
  );
}

export default TitleBlockEle;