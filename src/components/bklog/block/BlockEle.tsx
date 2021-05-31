import React, { useEffect, useRef, useState, useMemo } from 'react';
import useBKlog from './hooks/useBKlog';
import { 
  BlockData
} from './types';
import { 
  contentsElement,
  createContentsElement
} from '../utils';
import { 
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange
} from '../utils/selectionText';
import ContentEditableEle from './ContentEditableEle';
import TextStyleToggle from './TextStyleToggle';
import './block.scss';
import classNames from 'classnames';

interface BlockProps {
  blockData: BlockData<any>;
}

function BlockElement({ blockData }:BlockProps) {

  const [ editing, setEditing ] = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ] = useState<number>(0);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);
  const [ mouseOn, setMouseOn ] = useState<boolean>(false);
  const [ select, setSelect ] = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const { 
    getRightToEdit,
    getEditAbleId,
    onAddBlock, 
    onDeleteBlock,
    getChilrenBlock,
    onEditAble,
    onEditBlock,
    onCommitBlock
  } = useBKlog();

  const createMarkup = useMemo(()=> {
    const htmlElement = blockData.property && blockData.property.contents[0]?
    (blockData.property.contents.length === 1? 
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
            if(blockData.index > 1) onEditAble(null, blockData.index-1);
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
    console.log(e.target);
  }

  // const moveStartPoint = (ele: any) => {
  //   setCursorStart(0);
  //   setCursorEnd(0);
  //   setSelectionRange(ele, 0, 0);
  // }

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

  const handleKeyPress = (e:any) => {
    console.log("keyPress");
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.id, blockData.property? blockData.property.type : null);
    }
  }

  const handleClick = (e: any) => {
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }
  }

  // const handleMouseDown = (e: any) => {
  //   setMouseOn(true);
  // }

  // mouse methods
  const handleMouseUp = (e: any) => {
    const getStartPosition = getSelectionStart(blockRef.current);
    const getEndPosition = getSelectionEnd(blockRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
  }

  // const handleMouseMove = (e: any) => {
  //   console.log(e.target.innerText.length, (cursorEnd - cursorStart));
  //   if(e.target.innerText.length === (cursorEnd - cursorStart)) {
  //     setSelect(true);
  //   }
  // }

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

  useEffect(()=> {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && focused === blockRef.current) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    }

  }, [blockData.property])

  useEffect(()=> {
    if(getEditAbleId === blockData.id) {
      if(blockRef.current) {
        handleFocus(blockRef.current);
      }
    } else {
      setStyleToggle(false);
    }
  },[getEditAbleId]);

  useEffect(()=> {
    if(blockData.type === "container") {
      if(!blockData.children[0]) onDeleteBlock(blockData.id);
    }
  }, [blockData.children])

  useEffect(()=> {
    if(cursorEnd - cursorStart >= 1) {
      setStyleToggle(true);
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd]);

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
    >
       <div 
        className="bk-block relative pr-8"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
       > 
        { 
          blockData.property && blockData.type !== "container" ? 
            <ContentEditableEle 
              className={blockData.property.type}
              dangerouslySetInnerHTML={createMarkup}
              ref={blockRef}
              onKeyPress={handleKeyPress}
              onKeyUp={handleKeyUp}
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
          /> : null
        }
      </div>
          {
            childrenBlock ? 
            childrenBlock.map((child)=> 
              <BlockElement
                blockData={child}
                key={child.id}
              />
            ) : null
          }

      <div className={classNames(
        "cover",
        {"selectable": select}
      )}></div>
    </div>
  )
}

export default BlockElement;
