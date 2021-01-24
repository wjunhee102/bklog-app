import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import useBKlog from '../../../hooks/useBKlog';
import { 
  BlockData, 
  UUID,
  ContentType,
  TextContents
} from '../../../types/bklog';
import { 
  contentsElement,
  createContentsElement,
  findTextStyle
} from '../utils';
import { 
  getSelectionDirection,
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange
} from '../utils/selectionText';

import ContentEditableEle from './ContentEditableEle';

import '../block.css';

interface BlockProps {
  blockData: BlockData<any>;
}

const Block = ({ blockData }:BlockProps) => {

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
    onCommitBlock,
    onChangeTextStyle
  } = useBKlog();

  const createMarkup = useMemo(()=> {
    const htmlElement = blockData.property && blockData.property.contents[0]?
    (blockData.property.contents.length === 1? 
      contentsElement(blockData.property.contents[0])
      : blockData.property.contents.reduce(createContentsElement)
    ) : "";

    console.log(htmlElement);

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
    setStyleToggle(false);

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

  const handleKeyPress = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.index);
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
    // if (e.currentTarget === e.target) {
    //   console.log('unfocused self 1');
    // } else {
    //   console.log('unfocused child 2', e.target);
    // }
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Not triggered when swapping focus between children
      setCursorStart(0);
      setCursorEnd(0);
      // onCommitBlock();
    }
  }

  const handleFocus = (ele: any) => {
    ele.focus();
  }

  const moveStartPoint = (ele: any) => {
    setSelectionRange(ele, 0, 0);
  }

  const moveEndPoint = (ele: any) => {
    const length = ele.innerText.length;
    setSelectionRange(ele, length, length);
  }

  const refreshPoint = (
    ele:any, 
    cursorStart: number, 
    cursorEnd?: number | null
    ) => {
    setSelectionRange(ele, cursorStart, cursorEnd? cursorEnd : cursorStart);
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
    if(getEditAbleId === blockData.id && blockRef.current) {
      handleFocus(blockRef.current);
    }

    if(blockData.type === "container") {
      if(!blockData.children[0]) onDeleteBlock(blockData.id);
    }

  },[getEditAbleId]);

  useEffect(()=> {
    if(cursorEnd - cursorStart >= 1) {
      setStyleToggle(true);
      onCommitBlock();
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd]);

  const reBlockFocus = ()=> {
    handleFocus(blockRef.current);
  }

  return (
    <div 
      data-id={blockData.id} 
      className="block-zone"
    >
       <div 
        className="bk-block"
        onBlur={handleBlur}
       > 
        { 
          blockData.property && blockData.type !== "container" ? 
            <ContentEditableEle 
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
        <button onClick={()=>{onDeleteBlock(blockData.id)}}> 삭제 </button>
        {
          styleToggle? 
          <TextStyleMenu
            blockIndex={blockData.index}
            startPosition={cursorStart}
            endPosition={cursorEnd}
            currentStyles={findTextStyle(blockData.property.contents, cursorStart + 1)}
            setStyleToggle={setStyleToggle}
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

interface TextStyleMenuProps {
  blockIndex: number;
  startPosition: number;
  endPosition: number;
  currentStyles:  ContentType[] | null | undefined;
  setStyleToggle: React.Dispatch<React.SetStateAction<boolean>>;
  reBlockFocus: any;
}

function TextStyleMenu({
  blockIndex, 
  startPosition,
  endPosition,
  currentStyles,
  setStyleToggle,
  reBlockFocus
}: TextStyleMenuProps) {
  const { onChangeTextStyle, onEditAble } = useBKlog();


  const handleBold = () => {
    onChangeTextStyle(
      blockIndex, 
      ["b"],
      startPosition, 
      endPosition,
      "add"
    )
    reBlockFocus();
  }

  return (
    <div 
      className="bk-style-toggles"
    >
      <button onClick={handleBold} className="bk-style-toggle">B</button>
      <button className="bk-style-toggle">I</button>
      <button className="bk-style-toggle">_</button>
      <button className="bk-style-toggle">COLOR</button>   
    </div>
  )
}

export default Block;