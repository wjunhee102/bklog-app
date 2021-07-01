import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

function useTextBlock(blockData: BlockData, hooks: UseBlockType, selected: boolean) {
  const [ editable, setEditable]        = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

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
        console.log(cursorEnd, e.target.innerText.length);
        if(cursorEnd === e.target.innerText.length) {
          console.log(cursorEnd, e.target.innerText.length, "???");
          setCursorStart(0);
          setCursorEnd(0);
          e.preventDefault();
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

  const handleKeyPress = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      const newBlock = createBlockData(
        blockData.position, 
        blockData.type, 
        blockData.styleType
      );

      onCommitBlock();
      onAddBlock([ newBlock ], blockData.position, newBlock.id);
    }
  }

  const handleKeyDown = (e: any) => {
    
    if (e.key === "Backspace") {
      setCursorStart(getSelectionStart(e.target));
      setCursorEnd(getSelectionEnd(e.target));

      if(cursorStart === 0 && cursorEnd === 0) {
        if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
          const nextEditIndex = blockData.index > 0? blockData.index - 1 : undefined;
          onCommitBlock();
          onDeleteBlock([blockData], nextEditIndex);
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
    console.log("click");
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }

  }, []);

  const handleMouseUp = () => {
    const getStartPosition = getSelectionStart(blockRef.current);
    const getEndPosition = getSelectionEnd(blockRef.current);
    setCursorStart(getStartPosition);
    setCursorEnd(getEndPosition);
  };

  const handleBlur = useCallback((e:any) => {
    if (!e.currentTarget.contains(e.target)) {
      setCursorStart(0);
      setCursorEnd(0);
      onCommitBlock();
    }
  }, []);

  const handleFocus = useCallback((element: any) => {
    element.focus();
  }, []);

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

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockRef.current) {
        console.log("포커스")
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
    
    if(isGrab) {
      setEditable(!isGrab);
    } else {
      setEditable(!selected);
    }
  }, [selected]);

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
    editable,
    setEditable
  };
}

export type UseTextBlockType = ReturnType<typeof useTextBlock>;

export default useTextBlock;