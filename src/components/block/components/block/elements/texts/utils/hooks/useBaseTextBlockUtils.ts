import { useEffect, useRef, useState, useCallback } from "react";
import { BaseProps } from "../../../../zone/base/BaseBlockZone";
import { UnionTextBlock } from "../../../../../../entities/block/type";
import { UseBlockType } from "../../../../../../hooks/useBlock";
import useCursorPointHandler from "../../../../../../hooks/useCursorPointHandler";
import useElementFocus from "../../../../../../hooks/useElementFocus";
import useGetTextBlockContents from "../../../../../../hooks/useGetTextBlockContents";

interface UseBaseTextBlockUtilsProps {
  block: UnionTextBlock;
  useBlockReducer: UseBlockType;
  zoneProps: BaseProps;
}

function useBaseTextBlockUtils({
  block,
  useBlockReducer,
  zoneProps
}: UseBaseTextBlockUtilsProps) {

  const {
    cursorStart,
    cursorEnd,
    setCursorStart,
    setCursorEnd,
    state: {
      editable: storeEditable,
      isGrab,
      isHoldingDown,
      isCliping,
      preBlockInfo,
      editingBlockId,
    },    
    onChangeEditingId,
    onCommitTextBlock,
    onClearStateItem
  } = useBlockReducer;

  const {
    selected
  } = zoneProps;

  const [ editable, setEditable ]       = useState<boolean>(storeEditable);
  const [ styleToggle, setStyleToggle ] = useState<boolean>(false);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const { 
    handleFocus,
    handleElementFocus 
  } = useElementFocus<HTMLDivElement>(blockContentsRef.current);

  const contentsHTML = useGetTextBlockContents(block);

  const {
    handleMoveToWantPoint,
    handleSetCursorPoint,
    handleMoveToEndPoint,
    handleRefreshCursorPoint
  } = useCursorPointHandler<HTMLDivElement>({
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
    } else if(cursorStart | cursorEnd) {
      handleRefreshCursorPoint();
    } 

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
    if(editingBlockId === block.id) handleFocus(blockContentsRef.current);
  }, []);

  useEffect(() => {
    if(cursorEnd - cursorStart >= 1 && block.id === editingBlockId) {
      setStyleToggle(true);
    } else {
      setStyleToggle(false);
    }
  }, [cursorStart, cursorEnd, editingBlockId]);

  useEffect(() => {
    if(storeEditable) {
      if(isGrab) {
        setEditable(!isGrab);
      } else {
        setEditable(!selected);
      }
    }
  }, [selected]);

  useEffect(() => {
    if(editingBlockId !== block.id) { 
      setStyleToggle(false);
      return;
    }

    if(!blockContentsRef.current) return;

    handleElementFocus();

    if(!preBlockInfo || preBlockInfo.type !== "text") return;

    if(preBlockInfo.payload[0] !== "delete") {
      onClearStateItem("preBlockInfo");
      return;
    }

    const length = blockContentsRef.current.innerText.length - preBlockInfo.payload[1];
    handleMoveToWantPoint(length, length);
    onClearStateItem("preBlockInfo");

  }, [editingBlockId]);

  return {
    styleToggle,
    blockContentsRef,
    contentsHTML,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    handleElementFocus,
    editable
  }
}

export default useBaseTextBlockUtils;