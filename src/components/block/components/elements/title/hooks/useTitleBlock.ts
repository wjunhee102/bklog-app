import { useCallback, useEffect, useRef, useState } from "react";
import { BlockData } from "../../../../types";
import { UseBlockType } from "../../../../hooks/useBlock";
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../../../../utils/selectionText';
import useElementFocus from "../../../../hooks/useElementFocus";

function useTitleBlock(blockData: BlockData, useBlockReducer: UseBlockType) {
  const [ editable, setEditable ] = useState<boolean>(true);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const { handleElementFocus } = useElementFocus(blockContentsRef.current);

  const {
    cursorStart,
    cursorEnd,
    setCursorStart,
    setCursorEnd,
    state: {
      isGrab,
      preBlockInfo,
      editingBlockId,
    },
    onChangeEditingId,
    onEditPageInfo,
    onAddTitleBlock,
    onEditPageTitle,
    onCommitPage,
    onClearStateItem
  } = useBlockReducer;

   // keyboard methods text
   const handleKeyUp = useCallback((e:any) => {
    if(e.ctrlKey && e.key === "Meta") return;
    
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
          onChangeEditingId(0);
        }
        
        break;

      case " ":
        setCursorEnd(0);
        onEditPageTitle(e.target.innerText);
        onCommitPage();
        break;

      case "Backspace": 
        if(e.target.innerText.length !== (cursorStart && cursorEnd)) {
          onEditPageTitle(e.target.innerText);
        } 

        break;
      
      default:
        onEditPageTitle(e.target.innerText);
    }

    setCursorStart(getSelectionStart(e.target));
    setCursorEnd(getSelectionEnd(e.target));

  }, [blockData, cursorEnd, cursorStart]);

  const handleKeyPress = (e: any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddTitleBlock(
        e.target.innerText,
        getSelectionStart(e.target),
        getSelectionEnd(e.target)
      );
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
      onCommitPage();
      onChangeEditingId();
    }
  }, []);

  const isFocus = () => {
    moveEndPoint(blockContentsRef.current);
    if(blockData.id !== editingBlockId) onChangeEditingId(blockData.id);
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
        handleElementFocus();

        if(preBlockInfo) {
          if(preBlockInfo.type === "text") {
            if(preBlockInfo.payload[0] === "delete") {
              const length = blockContentsRef.current.innerText.length - preBlockInfo.payload[1];
              setSelectionRange(blockContentsRef.current, length, length);
            }
            onClearStateItem("preBlockInfo");
          }
        }

      }
    }
  }, [editingBlockId]);

  useEffect(() => {
    setEditable(!isGrab);
  }, [isGrab]);

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockContentsRef.current) {
        handleElementFocus();
        setSelectionRange(blockContentsRef.current, 0, 0);
      }
    }
  }, [blockContentsRef]);

  return {
    blockContentsRef,
    handleKeyUp,
    handleKeyPress,
    handleBlur,
    handleMouseUp,
    isFocus,
    moveEndPoint,
    editable
  }
}

export default useTitleBlock;