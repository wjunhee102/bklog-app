import React from "react";
import { UseBlockTypes } from "./hooks/useBlock";
import { BlockData } from "./types";
import ContentEditableEle from './ContentEditableEle';
import TextStyleToggle from './TextStyleToggle';
import './block.scss';
import classNames from 'classnames';
import useBlockEle from "./hooks/useBlockEle";

interface BlockEleProps {
  idx: number;
  blockData: BlockData,
  hooks: UseBlockTypes
}

const BlockElement: React.FC<BlockEleProps> = ({
  idx,
  blockData,
  hooks
}) => {

  const {
    cursorStart,
    cursorEnd,
    styleToggle,
    select,
    blockRef,
    createMarkup,
    childrenBlock,
    handleKeyUp,
    handleKeyDown,
    handleCopy,
    handlePaste,
    handleKeyPress,
    moveEndPoint,
    refreshPoint,
    clearTempClip,
    handleClick,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleBlur,
    handleFocus,
    isFocus,
    reBlockFocus
  } = useBlockEle(blockData, hooks);

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
    >
       <div 
        className="bk-block relative pr-8"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
       > 
        { 
          blockData && blockData.type !== "container" ? 
            <ContentEditableEle 
              className={blockData.styleType}
              editable={true}
              dangerouslySetInnerHTML={createMarkup}
              ref={blockRef}
              onKeyPress={handleKeyPress}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              onCopy={handleCopy}
              onPaste={handlePaste}
              onClick={handleClick}
              onMouseDown={isFocus}
              onMouseUp={handleMouseUp}
              onFocus={isFocus}
              placeholder="입력해주세요..."
            />
          : null
        }
        {/* <button 
          className="bk-del absolute right-0" 
          onClick={()=>{onDeleteBlock(blockData.id)}}> 
          삭제 
        </button> */}
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
        <div 
          className={classNames(
            "cover",
            {"selectable": select}
          )}
          onClick={clearTempClip}
        ></div>
      </div>
          {
            childrenBlock ? 
            childrenBlock.map((child: any)=> 
              <BlockElement
                idx={blockData.index}
                key={child.id}
                blockData={child}
                hooks={hooks}
              />
            ) : null
          }
    </div>
  )
}

export default BlockElement;
