import { useCallback, useEffect, useRef, useState } from "react";
import { UseBlockType } from "../../../../../hooks/useBlock";
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../../../../../utils/selectionText';
import useElementFocus from "../../../../../hooks/useElementFocus";
import useMoveCursorPoint from "../../../../../hooks/useCursorPointHandler";
import useKeyboardActionHandlerAll from "../../../../../hooks/useKeyboardActionHandlerAll";
import { TitleBlock } from "../../../../../entities/block/title/TitleBlock";

function useTitleBlock(block: TitleBlock, useBlockReducer: UseBlockType) {
  
  const {
    cursorStart,
    cursorEnd,
    setCursorStart,
    setCursorEnd,
    state: {
      editable: storeEditable,
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

  const [ editable, setEditable ] = useState<boolean>(storeEditable);

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
      Enter: (e: any) => {
        e.preventDefault();
      },
      ArrowUp: (e: any) => {
        e.preventDefault();
        setCursorStart(0);
        setCursorEnd(0);
        setSelectionRange(e.target, 0, 0);
      },
      ArrowDown: (e: any) => {
        e.preventDefault();
        const contentsLength = e.target.innerText.length;
        setCursorStart(contentsLength);
        setCursorEnd(contentsLength);
        setSelectionRange(e.target, contentsLength, contentsLength);

        if((cursorEnd && cursorStart) === e.target.innerText.length) {
          onChangeEditingId(0);
        }
      },
      Backspace: (e: any) =>{
        if(e.target.innerText.length !== (cursorStart && cursorEnd)) {
          onEditPageTitle(e.target.innerText);
        } 
      },
      " ": (e: any) => {
        setCursorEnd(0);
        onEditPageTitle(e.target.innerText);
        onCommitPage();
      }
    },
    keyPress: {
      Enter: (e: any) => {
        e.preventDefault();
        onAddTitleBlock(
          e.target.innerText,
          getSelectionStart(e.target),
          getSelectionEnd(e.target)
        );
      }
    }
  }, [block, cursorStart, cursorEnd]);

  const {
    handleSetCursorPoint,
    handleMoveToEndPoint,
    handleRefreshCursorPoint,
    handleMoveToWantPoint
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
    if(block.id !== editingBlockId) onChangeEditingId(block.id);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if(!(cursorStart | cursorEnd) || !blockContentsRef.current || focused !== blockContentsRef.current) return;
    
    blockContentsRef.current.blur();
    blockContentsRef.current.focus();  
    handleRefreshCursorPoint();

  }, [block.contents]);

  useEffect(() => {
    if(editingBlockId !== block.id || !blockContentsRef.current) return;

    handleElementFocus();

    if(!preBlockInfo || preBlockInfo.type !== "text") return;

    if(preBlockInfo.payload[0] !== "delete") { 
      onClearStateItem("preBlockInfo");
      return;
    };

    const length = blockContentsRef.current.innerText.length - preBlockInfo.payload[1];

    handleMoveToWantPoint(length, length);
    onClearStateItem("preBlockInfo");

  }, [editingBlockId]);

  useEffect(() => {
    if(storeEditable) setEditable(!isGrab);
  }, [isGrab]);

  useEffect(() => {
    if(editingBlockId === block.id) handleFocus(blockContentsRef.current);
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