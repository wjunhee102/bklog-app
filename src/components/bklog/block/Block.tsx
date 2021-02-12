import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import useBKlog from '../../../hooks/useBKlog';
import { 
  BlockData
} from '../../../types/bklog';
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

interface BlockProps {
  blockData: BlockData<any>;
}

function Block({ blockData }:BlockProps) {

  const [ editing, setEditing ] = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ] = useState<number>(0);

  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const { 
    getRigthToEdit,
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
        if(!e.target.innerHTML && cursorStart === 0 && cursorEnd === 0) {
          onDeleteBlock(blockData.id);
          if(blockData.index > 1) onEditAble(null, blockData.index-1);
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
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.id, blockData.property? blockData.property.type : null);
    }
  }

  // mouse methods
  const handleMouseUp = (e: any) => {
    const getStartPosition = getSelectionStart(blockRef.current);
    const getEndPosition = getSelectionEnd(blockRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
  }

  // Focus methods
  const handleBlur = (e:any) => {
    if (e.currentTarget === e.target) {
      // console.log('unfocused self 1');
    } else {
      // console.log('unfocused child 2', e.target);
    }
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Not triggered when swapping focus between children
      setCursorStart(0);
      setCursorEnd(0);
      onCommitBlock();
    }
  }

  const handleFocus = (ele: any) => {
    ele.focus();
  }

  const isFocus = (e: any) => {
    if(!styleToggle) {
      moveEndPoint(blockRef.current);
    } else if((cursorStart | cursorEnd)) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    } 
    onEditAble(blockData.id);
  }

  useEffect(()=> {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && focused === blockRef.current) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    }

  }, [blockData.property])

  useEffect(()=> {
    if(getEditAbleId === blockData.id) {
      if(blockRef.current) handleFocus(blockRef.current);
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

  const reBlockFocus = ()=> {
    handleFocus(blockRef.current);
  }

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
    >
       <div 
        className="block black-mode"
        onBlur={handleBlur}
       > 
        { 
          blockData.property && blockData.type !== "container" ? 
            <ContentEditableEle 
              className={blockData.property.type}
              dangerouslySetInnerHTML={createMarkup}
              ref={blockRef}
              onKeyPress={handleKeyPress}
              onKeyUp={handleKeyUp}
              onMouseUp={handleMouseUp}
              onFocus={isFocus}
              placeholder="입력해주세요..."
            />
          : null
        }
        <button className="bk-del" onClick={()=>{onDeleteBlock(blockData.id)}}> 삭제 </button>
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
              <Block 
                blockData={child}
                key={child.id}
              />
            ) : null
          }
    </div>
  )
}

export default Block;