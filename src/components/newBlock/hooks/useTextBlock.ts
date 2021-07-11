import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { createBlockData, sliceTextContents } from "../reducer/utils";

function useTextBlock(blockData: BlockData, hooks: UseBlockType, selected: boolean) {
  const [ editable, setEditable]        = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const {
    initBlock,
    isGrab,
    isHoldingDown,
    isCliping,
    nextBlockInfo,
    editingBlockId,
    onChangeEditingId,
    onEditBlock,
    onAddTextBlock,
    onChangeTextStyle,
    onCommitBlock,
    onChangeBlockContents,
    onDeleteBlock,
    onDeleteTextBlock,
    onRevertBlock,
    onSwitchBlock,
    onClearNextBlockInfo
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
  const handleKeyUp = useCallback((e:any) => {
    if(e.ctrlKey) return;
    
    setCursorStart(getSelectionStart(e.target));
    setCursorEnd(getSelectionEnd(e.target));
    
    switch(e.key) {

      case "Enter":
        e.preventDefault();
        break;

      case "ArrowUp": 
      // cursor가 앞으로 튐
        e.preventDefault();
        setCursorStart(0);
        setCursorEnd(0);
        setSelectionRange(e.target, 0, 0);

        if(cursorStart === 0 && cursorEnd === 0) {
          onChangeEditingId(blockData.index - 1);
        } 
        
        break;

      case "ArrowDown":
        e.preventDefault();
        const contentsLength = e.target.innerText.length;
        setCursorStart(contentsLength);
        setCursorEnd(contentsLength);
        setSelectionRange(e.target, contentsLength, contentsLength);

        if((cursorEnd && cursorStart) === e.target.innerText.length) {
          setCursorStart(0);
          setCursorEnd(0);
          onChangeEditingId(blockData.index + 1);
        }
        
        break;

      case " ":
        setCursorEnd(0);
        onEditBlock(blockData.id, blockData.index, e.target.innerHTML);
        onCommitBlock();
        break;
      
      default:
        onEditBlock(blockData.id, blockData.index, e.target.innerHTML);
    }

  }, [blockData, cursorEnd, cursorStart]);

  const handleKeyPress = (e: any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddTextBlock(
        blockData.index, 
        e.target.innerHTML, 
        getSelectionStart(e.target), 
        getSelectionEnd(e.target)
      );
    }
  }

  const handleKeyDown = (e: any) => {
    
    if (e.key === "Backspace") {
      const cursorStartPoint = getSelectionStart(e.target);
      const cursorEndPoint   = getSelectionEnd(e.target);
      
      setCursorStart(cursorStartPoint);
      setCursorEnd(cursorEndPoint);

      if(cursorStartPoint === 0 && cursorEndPoint === 0) {
        if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
          const nextEditIndex = blockData.index > 0? blockData.index - 1 : undefined;
          onDeleteBlock([blockData], nextEditIndex);
        } else if(blockData.index !== 0) {
          onDeleteTextBlock(blockData.index, e.target.innerHTML, e.target.innerText.length);
        }
        
      }

    }
  }

  const moveEndPoint = useCallback((ele: any) => {
    const length = ele.innerText.length;
    setCursorStart(length);
    setCursorEnd(length);
    setSelectionRange(ele, length, length);
  }, []);

  const refreshPoint = useCallback((
    ele:any, 
    cursorStart: number, 
    cursorEnd?: number | null
    ) => {
    setSelectionRange(ele, cursorStart, cursorEnd? cursorEnd : cursorStart);
  }, []);

  const handleClick = useCallback((e: any) => {
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }

  }, []);

  const handleMouseUp = () => {
    const getStartPosition = getSelectionStart(blockContentsRef.current);
    const getEndPosition = getSelectionEnd(blockContentsRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
  };

  const handleBlur = useCallback((e: any) => {
    if(e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setCursorStart(0);
      setCursorEnd(0);
      onCommitBlock();
      onChangeEditingId();
    }
  }, []);

  const handleFocus = useCallback((element: any) => {
    element.focus();
  }, []);

  const isFocus = () => {
    if(!styleToggle) {
      moveEndPoint(blockContentsRef.current);
    } else if((cursorStart | cursorEnd)) {
      refreshPoint(blockContentsRef.current, cursorStart, cursorEnd);
    } 

    if(blockData.id !== editingBlockId) onChangeEditingId(blockData.id);
  }

  const reBlockFocus = () => {
    handleFocus(blockContentsRef.current);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && blockContentsRef && focused === blockContentsRef.current) {
      refreshPoint(blockContentsRef.current, cursorStart, cursorEnd);
    }

  }, [blockData.contents]);

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockContentsRef.current) {
        handleFocus(blockContentsRef.current);

        if(nextBlockInfo) {
          if(nextBlockInfo.type === "text") {
            if(nextBlockInfo.payload[0] === "delete") {
              const length = blockContentsRef.current.innerText.length - nextBlockInfo.payload[1];
              setSelectionRange(blockContentsRef.current, length, length);
            }
            onClearNextBlockInfo();
          }
        }

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
    
    if(isGrab) {
      setEditable(!isGrab);
    } else {
      setEditable(!selected);
    }
  }, [selected]);

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockContentsRef) {
        handleFocus(blockContentsRef.current);
        setSelectionRange(blockContentsRef.current, 0, 0);
      }
    }
  }, [blockContentsRef]);

  return {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockContentsRef,
    createMarkup,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    reBlockFocus,
    editable,
    setEditable
  };
}

export type UseTextBlockType = ReturnType<typeof useTextBlock>;

export default useTextBlock;