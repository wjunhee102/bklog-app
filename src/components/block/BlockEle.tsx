import React, { useEffect, useRef, useState, useMemo } from 'react';
import { UseBlockTypes } from './hooks/useBlock';
import { 
  BlockData
} from './types';
import { 
  contentsElement,
  copyInClipboard,
  createClipboardContentsText,
  createContentsElement
} from './utils';
import { 
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange
} from './utils/selectionText';
import ContentEditableEle from './ContentEditableEle';
import TextStyleToggle from './TextStyleToggle';
import './block.scss';
import classNames from 'classnames';

interface BlockProps {
  blockData: BlockData<any>;
  actions: UseBlockTypes;
  clipboard: {
    clipOn: boolean;
    handleClipOn: (on: boolean) => void;
  };
  mouseOn: boolean;
}

function BlockElement({ 
  blockData, 
  actions, 
  clipboard: { clipOn, handleClipOn },
  mouseOn
 }:BlockProps) {

  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);
  const [ select, setSelect ]           = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const { 
    getRightToEdit,
    getEditAbleId,
    getTempClip,
    getClipboard,
    getBlocksContents,
    onAddBlock, 
    onAddBlockList,
    onDeleteBlock,
    getChilrenBlock,
    onEditAble,
    onEditBlock,
    onCommitBlock,
    onSetTempClip,
    onClearTempClip,
    onSetClipboard,
    onClearClipboard,
    getTest
  } = actions;

  const createMarkup = useMemo(()=> {
    const htmlElement = blockData.property && blockData.property.contents[0]?
    (!blockData.property.contents[1]? 
      contentsElement(blockData.property.contents[0])
      : blockData.property.contents.reduce(createContentsElement)
    ) : "";

    return {
      __html: htmlElement
    }
  }, [blockData.property]);
  
  // 위치 변경시 어떻게 리프레쉬 될지 고민해야 함.
  const childrenBlock = blockData.children[0]? 
    getChilrenBlock(blockData.id) : null;

  // keyboard methods
  const handleKeyUp = (e:any) => {  
    setCursorStart(getSelectionStart(e.target));
    setCursorEnd(getSelectionEnd(e.target));

    switch(e.key) {

      case "Enter":
        setCursorStart(0);
        setCursorEnd(0);
        e.preventDefault();
        break;

      case "ArrowUp": 
      // cursor가 앞으로 튐
        
        if(cursorStart === 0) {
          e.preventDefault();
          setCursorStart(0);
          setCursorEnd(0);
          onEditAble(null, blockData.index - 1);
        }
        
        break;

      case "ArrowDown":

        if(cursorEnd === e.target.innerText.length) {
          setCursorStart(0);
          setCursorEnd(0);
          e.preventDefault();
          onEditAble(null, blockData.index + 1);
        }
        
        break;

      case "Backspace":
        if(cursorStart === 0 && cursorEnd === 0) {
          if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
            onCommitBlock();
            onDeleteBlock(blockData.id);
            if(blockData.index > 1) onEditAble(null, blockData.index - 1);
          }
          break;

        } else {
          onEditBlock(blockData.id, blockData.index, e.target.innerHTML);
          break;
        }
      
      case " ":
        setCursorEnd(0);
        onEditBlock(blockData.id, blockData.index, e.target.innerHTML);
        onCommitBlock();
        break;
      
      default:
        onEditBlock(blockData.id, blockData.index, e.target.innerHTML);

    }
    

  }

  const handleKeyDown = (e: any) => {
  }

  const copyBlocks = () => {
    const value = createClipboardContentsText(getBlocksContents());
    copyInClipboard(value);
  }

  const handleCopy = (e: any) => {
    onClearClipboard();
    if(select) {
      e.preventDefault();
      onSetClipboard();
      copyBlocks();
    }
  }

  const handlePaste = (e: any) => {
    if(getClipboard[0]) {
      e.preventDefault();
      onAddBlockList(blockData.id, getClipboard);
    }
  }

  const handleKeyPress = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onCommitBlock();
      onAddBlock(blockData.id, blockData.property? blockData.property.type : null);
    }
  }

  const moveEndPoint = (ele: any) => {
    const length = ele.innerText.length;
    setCursorStart(length);
    setCursorEnd(length);
    setSelectionRange(ele, length, length);
  }

  const refreshPoint = (
    ele:any, 
    cursorStart: number, 
    cursorEnd?: number | null
    ) => {
    setSelectionRange(ele, cursorStart, cursorEnd? cursorEnd : cursorStart);
  }

  const clearTempClip = () => {
    if(clipOn) handleClipOn(false)
    if(getTempClip[0]) onClearTempClip();
  }

  const handleClick = (e: any) => {
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }

    clearTempClip();
  }

  // mouse methods
  const handleMouseUp = (e: any) => {
    const getStartPosition = getSelectionStart(blockRef.current);
    const getEndPosition = getSelectionEnd(blockRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
    if(clipOn) handleClipOn(false);
  }

  const handleMouseEnter = (e: any) => {
    if(clipOn && mouseOn) { 
      onSetTempClip(blockData.index);
    } 
  }

  const handleMouseLeave = (e: any) => {
    if(clipOn && mouseOn) {
      const getStartPosition = getSelectionStart(blockRef.current);
      const getEndPosition = getSelectionEnd(blockRef.current);
      if((getStartPosition - getEndPosition) || !getTempClip[0]) {
        onSetTempClip(blockData.index);
        handleBlur(e);

        //test 
        const text = document.createElement("textarea");
        document.body.appendChild(text);
        text.select();
        document.body.removeChild(text);
      } 
    }
  }

  const handleMouseMove = (e: any) => {
    if(mouseOn) {
      handleClipOn(true);
    }
  }

  // Focus methods
  const handleBlur = (e:any) => {
    if (!e.currentTarget.contains(e.target)) {
      setCursorStart(0);
      setCursorEnd(0);
      onCommitBlock();
    }
  }

  const handleFocus = (element: any) => {
    element.focus();
  }

  const isFocus = () => {
    if(!styleToggle) {
      moveEndPoint(blockRef.current);
    } else if((cursorStart | cursorEnd)) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    } 

    if(blockData.id !== getEditAbleId) onEditAble(blockData.id);
  }

  const reBlockFocus = () => {
    handleFocus(blockRef.current);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && focused === blockRef.current) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    }

  }, [blockData.property]);

  useEffect(() => {
    if(getEditAbleId === blockData.id) {
      if(blockRef.current) {
        handleFocus(blockRef.current);
      }
    } else {
      setStyleToggle(false);
    }
  },[getEditAbleId]);

  useEffect(() => {
    if(blockData.type === "container") {
      if(!blockData.children[0]) onDeleteBlock(blockData.id);
    }
  }, [blockData.children]);

  useEffect(() => {
    if(cursorEnd - cursorStart >= 1) {
      setStyleToggle(true);
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd]);

  useEffect(() => {
    console.log(getTempClip);
    if(getTempClip.includes(blockData.index)) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [getTempClip]);

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
          blockData.property && blockData.type !== "container" ? 
            <ContentEditableEle 
              className={blockData.property.type}
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
            contents={blockData.property.contents}
            reBlockFocus={reBlockFocus}
            actions={actions}
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
                key={child.id}
                blockData={child}
                actions={actions}
                clipboard={{clipOn, handleClipOn}}
                mouseOn={mouseOn}
              />
            ) : null
          }
    </div>
  )
}

export default BlockElement;
