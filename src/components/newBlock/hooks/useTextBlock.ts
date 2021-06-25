import { useEffect, useMemo, useRef, useState } from "react";
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

function useTextBlock(blockData: BlockData, hooks: UseBlockType) {
  const [ editable, setEditable]        = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const {
    initBlock,
    mouseDownOn,
    clipDataOn,
    gripOn,
    editingBlockId,
    onChangeEditingId,
    onEditBlock,
    onAddBlock,
    onChangeTextStyle,
    onCommitBlock,
    onDeleteBlock,
    onRevertBlock,
    onSwitchBlock,
    deleting,
    setDeleting
  } = hooks;

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

  const handleKeyDown = (e: any) => {
    console.log(e.key);
    if (e.key === "Backspace") {
      // 자고 일어나서 다시
      setCursorStart(getSelectionStart(e.target));
      setCursorEnd(getSelectionEnd(e.target));
      // 자고 일어나서 다시
      console.log("1231", cursorStart, cursorEnd);
      if(cursorStart === 0 && cursorEnd === 0) {
        setDeleting(true);
      }

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

  const handleClick = (e: any) => {
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }

  }

  const handleMouseUp = (e: any) => {
    const getStartPosition = getSelectionStart(blockRef.current);
    const getEndPosition = getSelectionEnd(blockRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
  }

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

    if(blockData.id !== editingBlockId) onChangeEditingId(0, blockData.id);
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

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockRef.current) {
        handleFocus(blockRef.current);
      }
    } else {
      setStyleToggle(false);
    }
  }, [editingBlockId]);

  useEffect(() => {
    if(cursorEnd - cursorStart >= 1) {
      setStyleToggle(true);
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd]);

  useEffect(() => {
    setEditable(!deleting);
  }, [deleting]);

  return {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockRef,
    createMarkup,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    reBlockFocus,
    editable
  };
}

export type UseTextBlockType = ReturnType<typeof useTextBlock>;

export default useTextBlock;