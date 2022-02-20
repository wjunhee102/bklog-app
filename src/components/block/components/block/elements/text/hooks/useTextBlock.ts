import { useCallback, useEffect, useRef, useState } from "react";
import { UseBlockType } from "../../../../../hooks/useBlock";
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../../../../../utils/selectionText';
import { BaseProps } from "../../../zone/base/BaseBlockZone";
import useElementFocus from "../../../../../hooks/useElementFocus";
import useMoveCursorPoint from "../../../../../hooks/useCursorPointHandler";
import useConvertToHTML from "../../../../../hooks/useCovertToHTML";
import useKeyboardActionHandlerAll from "../../../../../hooks/useKeyboardActionHandlerAll";
import { UnionTextBlock } from "../../../../../entities/block/type";

function useTextBlock(block: UnionTextBlock, useBlockReducer: UseBlockType, zoneProps: BaseProps) {
  
  const {
    cursorStart,
    cursorEnd,
    setCursorStart,
    setCursorEnd,
    state: {
      isGrab,
      isHoldingDown,
      isCliping,
      preBlockInfo,
      editingBlockId,
    },    
    onChangeEditingId,
    onEditTextBlock,
    onAddTextBlock,
    onCommitTextBlock,
    onDeleteBlock,
    onDeleteTextBlock,
    onDeleleTitleBlock,
    onClearStateItem
  } = useBlockReducer;

  const {
    selected
  } = zoneProps;

  const [ editable, setEditable ]       = useState<boolean>(true);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const { 
    handleFocus,
    handleElementFocus 
  } = useElementFocus<HTMLDivElement>(blockContentsRef.current);

  const contentsHTML = useConvertToHTML(block.contents);

  const {
    handleKeyDown,
    handleKeyPress,
    handleKeyUp
  } = useKeyboardActionHandlerAll({
    keyUp: {
      startAction: (e: any) => {
        if(e.ctrlKey && e.key === "Meta") return true;
      },
      defaultAction: (e: any) => {
        onEditTextBlock(block.id, block.index, e.target.innerHTML);
      },
      finallyAction: (e: any) => {
        setCursorStart(getSelectionStart(e.target));
        setCursorEnd(getSelectionEnd(e.target));
      },
      "Enter": (e: any) => {
        e.preventDefault();
      },
      "ArrowUp": (e: any) => {
      },
      "ArrowDown": (e: any) => {
      },
      "Backspace": (e: any) =>{
        if(e.target.innerText.length !== (cursorStart && cursorEnd)) {
          onEditTextBlock(block.id, block.index, e.target.innerHTML);
        } 
      },
      " ": (e: any) => {
        setCursorEnd(0);
        onEditTextBlock(block.id, block.index, e.target.innerHTML);
        onCommitTextBlock();
      }
    },
    keyPress: {
      "Enter": (e: any) => {
        if(e.key === "Enter") {
          e.preventDefault();
          onAddTextBlock(
            block.index, 
            e.target.innerHTML, 
            getSelectionStart(e.target), 
            getSelectionEnd(e.target)
          );
        }
      }
    },
    keyDown: {
      "Backspace": (e: any) => {
        const cursorStartPoint = getSelectionStart(e.target);
        const cursorEndPoint   = getSelectionEnd(e.target);
        
        setCursorStart(cursorStartPoint);
        setCursorEnd(cursorEndPoint);
  
        if(cursorStartPoint === 0 && cursorEndPoint === 0) {
          if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
            const nextEditIndex = block.index - 1;
            onDeleteBlock([block], nextEditIndex);
          } else if(block.index !== 0) {
            onDeleteTextBlock(block.index, e.target.innerHTML, e.target.innerText.length);
          } else {
            onDeleleTitleBlock(e.target.innerText);
          }
          
        }
      },
      "ArrowUp": (e: any) => {
        e.preventDefault();
        setCursorStart(0);
        setCursorEnd(0);
        setSelectionRange(e.target, 0, 0);

        if(cursorStart === 0 && cursorEnd === 0) {
          onChangeEditingId(block.index - 1);
        } 
      },
      "ArrowDown": (e: any) => {
        e.preventDefault();
        const contentsLength = e.target.innerText.length;
        setCursorStart(contentsLength);
        setCursorEnd(contentsLength);
        setSelectionRange(e.target, contentsLength, contentsLength);

        if((cursorEnd && cursorStart) === e.target.innerText.length) {
          onChangeEditingId(block.index + 1);
        }
      }
    }
  }, [block, cursorStart, cursorEnd]);

  const {
    handleMoveToWantPoint,
    handleSetCursorPoint,
    handleMoveToEndPoint,
    handleRefreshCursorPoint
  } = useMoveCursorPoint<HTMLDivElement>({
    element: blockContentsRef.current,
    setCursorStart,
    setCursorEnd,
    cursorStart,
    cursorEnd
  });

  const handleClick = useCallback((e: any) => {
    const parentNode = e.target.parentNode;

    if(parentNode.tagName === "A") {
      window.open(parentNode.href);
    }

  }, []);

  const handleMouseUp = () => {
    handleSetCursorPoint();
  };

  const handleBlur = useCallback((e: any) => {
    if(e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setCursorStart(0);
      setCursorEnd(0);
      onCommitTextBlock();
      onChangeEditingId();
    }
  }, []);

  const isFocus = () => {
    if(!styleToggle) {
      handleMoveToEndPoint();
    } else if((cursorStart | cursorEnd)) {
      handleRefreshCursorPoint();
    } 

    if(block.id !== editingBlockId) onChangeEditingId(block.id);
  }

  useEffect(() => {
    const focused = document.activeElement;
    
    if((cursorStart | cursorEnd) && blockContentsRef.current && focused === blockContentsRef.current) {
      handleRefreshCursorPoint();
    }

  }, [block.contents]);

  useEffect(() => {
    if(editingBlockId === block.id) {
      if(blockContentsRef.current) {
        handleElementFocus();

        if(preBlockInfo) {
          if(preBlockInfo.type === "text") {
            if(preBlockInfo.payload[0] === "delete") {
              const length = blockContentsRef.current.innerText.length - preBlockInfo.payload[1];
              handleMoveToWantPoint(length, length);
            }
            onClearStateItem("preBlockInfo");
          }
        }

      }
    } else {
      setStyleToggle(false);
    }
  }, [editingBlockId]);

  useEffect(() => {
    if(editingBlockId === block.id) handleFocus(blockContentsRef.current);
  }, []);

  useEffect(() => {
    if(cursorEnd - cursorStart >= 1 && block.id === editingBlockId) {
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
    blockContentsRef,
    contentsHTML,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    handleElementFocus,
    editable,
    setEditable
  };
}

export type UseTextBlockType = ReturnType<typeof useTextBlock>;

export default useTextBlock;