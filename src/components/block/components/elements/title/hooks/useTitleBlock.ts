import { useCallback, useEffect, useRef, useState } from "react";
import { BlockData } from "../../../../types";
import { UseBlockType } from "../../../../hooks/useBlock";
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../../../../utils/selectionText';
import useElementFocus from "../../../../hooks/useElementFocus";
import useMoveCursorPoint from "../../../../hooks/useCursorPointHandler";
import useKeyboardActionHandlerAll from "../../../../hooks/useKeyboardActionHandlerAll";

function useTitleBlock(blockData: BlockData, useBlockReducer: UseBlockType) {
  
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
    onAddTitleBlock,
    onEditPageTitle,
    onCommitPage,
    onClearStateItem
  } = useBlockReducer;

  const [ editable, setEditable ] = useState<boolean>(true);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const { 
    handleFocus, 
    handleElementFocus 
  } = useElementFocus(blockContentsRef.current);

  const {
    handleKeyUp,
    handleKeyPress
  } = useKeyboardActionHandlerAll({
    keyUp: {
      startAction: (e: any) => {
        if(e.ctrlKey && e.key === "Meta") return true;
      },
      defaultAction: (e: any) => {
        onEditPageTitle(e.target.innerText);
      },
      finallyAction: (e: any) => {
        setCursorStart(getSelectionStart(e.target));
        setCursorEnd(getSelectionEnd(e.target));
      },
      ["Enter"]: (e: any) => {
        e.preventDefault();
      },
      ["ArrowUp"]: (e: any) => {
        e.preventDefault();
        setCursorStart(0);
        setCursorEnd(0);
        setSelectionRange(e.target, 0, 0);
      },
      ["ArrowDown"]: (e: any) => {
        e.preventDefault();
        const contentsLength = e.target.innerText.length;
        setCursorStart(contentsLength);
        setCursorEnd(contentsLength);
        setSelectionRange(e.target, contentsLength, contentsLength);
      },
      ["Backspace"]: (e: any) =>{
        if(e.target.innerText.length !== (cursorStart && cursorEnd)) {
          onEditPageTitle(e.target.innerText);
        } 
      },
      [" "]: (e: any) => {
        setCursorEnd(0);
        onEditPageTitle(e.target.innerText);
        onCommitPage();
      }
    },
    keyPress: {
      defaultAction: (e: any) => {
      },
      ["Enter"]: (e: any) => {
        e.preventDefault();
        onAddTitleBlock(
          e.target.innerText,
          getSelectionStart(e.target),
          getSelectionEnd(e.target)
        );
      }
    }
  }, [blockData, cursorStart, cursorEnd]);

  const {
    handleSetCursorPoint,
    handleMoveToEndPoint,
    handleRefreshCursorPoint
  } = useMoveCursorPoint({
    element: blockContentsRef.current,
    setCursorStart,
    setCursorEnd,
    cursorStart,
    cursorEnd
  });

  const handleMouseUp = () => {
    handleSetCursorPoint();
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
    handleMoveToEndPoint();
    if(blockData.id !== editingBlockId) onChangeEditingId(blockData.id);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && blockContentsRef && focused === blockContentsRef.current) {
      handleRefreshCursorPoint();
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
    if(editingBlockId === blockData.id) handleFocus(blockContentsRef.current);
  }, []);

  return {
    blockContentsRef,
    handleKeyUp,
    handleKeyPress,
    handleBlur,
    handleMouseUp,
    isFocus,
    editable
  }
}

export default useTitleBlock;