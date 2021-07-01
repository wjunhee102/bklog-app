import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { BlockData } from "../types";
import { UseBlockType } from "./useBlock";
import { 
  contentsElement,
  copyInClipboard,
  createClipboardContentsText,
  createContentsElement
} from '../utils';
import { 
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange
} from '../utils/selectionText';
import { createBlockData } from "../reducer/utils";


function useBlockEle(blockData: BlockData, hooks: UseBlockType) {
  //text
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  //text
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);
  //base
  const [ select, setSelect ]           = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const {
    initBlock,
    isGrab,
    isHoldingDown,
    isCliping,
    editingBlockId,
    onChangeEditingId,
    onEditBlock,
    onAddBlock,
    onChangeTextStyle,
    onCommitBlock,
    onDeleteBlock,
    onRevertBlock,
    onSwitchBlock
  } = hooks;

  //text
  const createMarkup = useMemo(()=> {
    const htmlElement = blockData.contents[0]?
    (!blockData.contents[1]? 
      contentsElement(blockData.contents[0])
      : blockData.contents.reduce(createContentsElement)
    ) : "";

    return {
      __html: htmlElement
    }
  }, [blockData.contents]);

  // 공통? base? 일반 block에서는 필요없나?
  const childrenBlock = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  // keyboard methods text
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
          onChangeEditingId(blockData.index - 1);
        }
        
        break;

      case "ArrowDown":

        if(cursorEnd === e.target.innerText.length) {
          setCursorStart(0);
          setCursorEnd(0);
          e.preventDefault();
          onChangeEditingId(blockData.index + 1);
        }
        
        break;

      case "Backspace":
        if(cursorStart === 0 && cursorEnd === 0) {
          if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
            onCommitBlock();
            onDeleteBlock([blockData]);
            if(blockData.index > 1) onChangeEditingId(blockData.index - 1);
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
    // const value = createClipboardContentsText(getBlocksContents());
    // copyInClipboard(value);
  }

  const handleCopy = (e: any) => {
    // onClearClipboard();
    // if(select) {
    //   e.preventDefault();
    //   onSetClipboard();
    //   copyBlocks();
    // }
  }

  const handlePaste = (e: any) => {
    // if(getClipboard[0]) {
    //   e.preventDefault();
    //   onAddBlockList(blockData.id, getClipboard);
    // }
  }

  const handleKeyPress = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      const newBlock = createBlockData(
        blockData.position, 
        blockData.type, 
        blockData.styleType
      );

      onCommitBlock();
      onAddBlock([ newBlock ], blockData.position);
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
    // if(clipOn) handleClipOn(false)
    // if(getTempClip[0]) onClearTempClip();
  }

  // base?
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
    // if(clipDataMode) handleClipOn(false);
  }

  const handleMouseEnter = (e: any) => {
    if(isCliping && isHoldingDown) { 
      // onSetTempClip(blockData.index);
    } 
  }

  const handleMouseLeave = (e: any) => {
    if(isCliping && isHoldingDown) {
      const getStartPosition = getSelectionStart(blockRef.current);
      const getEndPosition = getSelectionEnd(blockRef.current);
      // if((getStartPosition - getEndPosition) || !getTempClip[0]) {
      //   onSetTempClip(blockData.index);
      //   handleBlur(e);

      //   //test 
      //   const text = document.createElement("textarea");
      //   document.body.appendChild(text);
      //   text.select();
      //   document.body.removeChild(text);
      // } 
    }
  }

  const handleMouseMove = (e: any) => {
    if(isHoldingDown) {
      // handleClipOn(true);
    }
  }

  // text
  // Focus methods text
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

    if(blockData.id !== editingBlockId) onChangeEditingId(blockData.id);
  }

  const reBlockFocus = () => {
    handleFocus(blockRef.current);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && focused === blockRef.current) {
      refreshPoint(blockRef.current, cursorStart, cursorEnd);
    }

  }, [blockData.contents]);

  //base?
  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockRef.current) {
        handleFocus(blockRef.current);
      }
    } else {
      setStyleToggle(false);
    }
  }, [editingBlockId]);

  // container
  useEffect(() => {
    if(blockData.type === "container") {
      if(!childrenBlock) onDeleteBlock([blockData]);
    }
  }, [childrenBlock]);

  useEffect(() => {
    if(cursorEnd - cursorStart >= 1) {
      setStyleToggle(true);
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd]);

  // useEffect(() => {
  //   console.log(getTempClip);
  //   if(getTempClip.includes(blockData.index)) {
  //     setSelect(true);
  //   } else {
  //     setSelect(false);
  //   }
  // }, [getTempClip]);
  
  return {
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
  }
}

export default useBlockEle;