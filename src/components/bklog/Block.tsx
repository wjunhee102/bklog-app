import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import { useIdleTimer} from 'react-idle-timer';

import { BlockData, UUID } from '../../types/bklog';
import useBKlog from '../../hooks/useBKlog';
import { createContentsElement } from './utils';
import { 
  getSelectionDirection,
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange,
  getValue
} from './utils/selectionText';

import ContentEditableEle from './ContentEditableEle';

import './block.css';

interface BlockProps {
  blockData: BlockData<any>;
}

const Block = ({ blockData }:BlockProps) => {

  const [ editing, setEditing ] = useState<boolean>(true);

  const [ cursurPoint, setCursurPoint ] = useState<number>(0);

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
  
  // 위치 변경시 어떻게 리프레쉬 될지 고민해야 함.
  const children = blockData.children[0]? 
    getChilrenBlock(blockData.id) : null;

  const editContent = (e:any) => {  
    const range = document.createRange();
    const selObj = window.getSelection();
    const data = selObj? selObj.toString() : "없음";
    const focusOffset = selObj? selObj.focusOffset : null;
    // e.target.tabindex = 2
    console.log(selObj, focusOffset, data);
    onEditBlock(blockData.id, blockData.index, e.target.innerHTML);

    const caretPosition = getSelectionDirection(e.target) !== 'forward' ? 
      getSelectionStart(e.target) : getSelectionEnd(e.target)
    console.log(caretPosition)
    
    setCursurPoint(caretPosition);

    switch(e.key) {
 
      case "Enter":
        e.preventDefault();
        break;

      case "ArrowUp": 
        onEditAble(null, blockData.index - 1);
        break;

      case "ArrowDown":
        onEditAble(null, blockData.index + 1);
        break;
      
      case "ArrowLeft":
        break;
      
      case "ArrowRight":
        break;

      case "Backspace":
        if(!e.target.innerHTML) {
          onDeleteBlock(blockData.id);
          if(blockData.index > 1) onEditAble(null, blockData.index-1);
          break;
        }
      
      case " ":
        onCommitBlock();
        break;

    }
  }

  const createMarkup = useMemo(()=> {
    return {
      __html: blockData.property && blockData.property.contents[0]?
      blockData.property.contents.reduce(createContentsElement)
      : ""
    }
  }, [blockData.property]);

  const mouseOver = (e:any) => {
    
    if(e.target.parentNode.tagName === "A") {
      console.log(e.target.parentNode.href);
      window.open(e.target.parentNode.href);
      console.log("실행");
    }
  }

  const addContent = (e:any) => {
    console.log(e.key)
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.index);
    }
  }

  // const changeTextStyle = (text:string, type: string) => {
  //   return [
  //     text,
  //     type
  //   ]
  // }

  // const dragData = (e:any) => {
  //   const range = document.createRange();
  //   const selObj = window.getSelection()
  //   const data = selObj? selObj.toString() : "없음";
  //   const focusOffset = selObj? selObj.focusOffset : null;

  //   const newText = changeTextStyle(data, "b");

  //   console.log(newText);
  
  //   // if(focusOffset) {
  //   //   const newBlock = blockData.contents.concat().join();
  //   //   const newData =  newBlock.replace(data, `<strong>${data}</strong>`);
  //   //   onEditBlock(blockData.id, newData);
  //   //   console.log(newData, "ㅁㄴㅇㅁㄴㅇ");
  //   //   console.log("dsadsd")
  //   // }
  // }

  const testMouse = (e:any)=> {
    const selObj:any = window.getSelection();
    // console.log(e, selObj.toString(), selObj.focusOffset);
  }

  const focus = (ele: any) => {
    const selObj:any = window.getSelection();
    const range = document.createRange();
    
    ele.focus();
    const length = ele.innerText.length;
    // console.log(selObj.anchorNode,selObj.toString(), selObj.rangeCount);
    // selObj.selectAllChildren(ele);
    const caretPosition = getSelectionDirection(ele) !== 'forward' ? 
      getSelectionStart(ele) : getSelectionEnd(ele)

    setSelectionRange(ele, length, length);
    console.log(caretPosition, length);
    
    // selObj.extend(ele, 3)
    // selObj.setBaseAndExtent(ele, ele.children.length, ele, ele.children.length);
    // ele.setSelectionRange(length, length);
    // if(ele.childNodes[0] && blockData.contents.join().length > 0) {
    //   range.setStart(ele.childNodes[0], 3);
    //   range.setEnd(ele.childNodes[0], 4);
    // }  
    // console.log(ele.childNodes[0], blockData.contents.join().length);
  }

  const refreshPoint = (ele:any)=> {
    console.log(cursurPoint, 'commit 됨');
    setSelectionRange(ele, cursurPoint, cursurPoint);
  }


  useEffect(()=> {
    if(cursurPoint) {
      refreshPoint(blockRef.current)
    }
    
  }, [blockData.property])

  useEffect(()=> {
   if(getEditAbleId === blockData.id && blockRef.current ) {
    focus(blockRef.current);
   }

   if(blockData.type === "container") {
    if(!blockData.children[0]) onDeleteBlock(blockData.id);
  }
  },[getEditAbleId]);

  return (
    <div data-id={blockData.id} className="block-zone">
       <div className="bk-block"> 
        { 
          blockData.property && blockData.type !== "container" ? 
            getRigthToEdit? 
            <>
            {/* <div 
            //   ref={blockRef}
            //   className={`${blockData.property.type}`}
            //   contentEditable={editing}
            //   onKeyUp={editContent}
            //   onBlur={onCommitBlock}
            //   dangerouslySetInnerHTML={createMarkup()} 
            //   onMouseUp={mouseOver}
            //   onKeyPress={addContent}
            //   onFocus={()=>onEditAble(blockData.id)}
            //   // onMouseUp={dragData}
            //   // onMouseDown={dragData}
            //   placeholder="입력해주세요."
            // ></div>  */}
            <ContentEditableEle 
              dangerouslySetInnerHTML={createMarkup}
              ref={blockRef}
              onKeyPress={addContent}
              onKeyUp={editContent}
              onFocus={()=>onEditAble(blockData.id)}
              onBlur={onCommitBlock}
              onMouseDown={testMouse}
              onMouseUp={testMouse}
              placeholder="입력해주세요..."
            />
            <button onClick={()=>{onDeleteBlock(blockData.id)}}> 삭제 </button>
            </>
            : <div className="bk-block"
                dangerouslySetInnerHTML={createMarkup}             
              ></div>
            : null
        }
      </div>
          {
            children ? 
            children.map((child)=> 
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