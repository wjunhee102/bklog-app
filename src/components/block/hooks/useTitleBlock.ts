import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockData } from "../types";
import { UseBlockType } from "./useBlock";
import { contentsElement, copyInClipboard, createClipboardContentsText, createContentsElement } from '../utils';
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../utils/selectionText';
import { createBlockData, parseHtmlContents, sliceTextContents } from "../reducer/utils";

function useTitleBlock(blockData: BlockData, useBlockReducer: UseBlockType) {
  const [ editable, setEditable]        = useState<boolean>(true);
  const [ cursorStart, setCursorStart ] = useState<number>(0);
  const [ cursorEnd, setCursorEnd ]     = useState<number>(0);
  const [ stage, setStage ] = useState<string>(blockData.contents);

  const blockContentsRef = useRef<HTMLDivElement>(null);

  const {
    isGrab,
    nextBlockInfo,
    editingBlockId,
    onChangeEditingId,
    onEditPageTitle,
    onAddTextBlock,
    onAddBlock,
    onCommitBlock,
    onClearNextBlockInfo
  } = useBlockReducer;

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
        setStage(e.target.innerHTML);
        onEditPageTitle(e.target.innerHTML);
        break;
      
      default:
        setStage(e.target.innerHTML);
    }

  }, [blockData, cursorEnd, cursorStart]);

  const handleKeyPress = (e: any) => {
    if(e.key === "Enter") {
      e.preventDefault();

      const [ front, back ] = sliceTextContents(parseHtmlContents(e.target.innerHTML), cursorStart, cursorEnd);

      console.log(front, back, cursorStart, cursorEnd);

      const newBlock = createBlockData({
        position: "1",
        type: "text",
        styleType: "bk-p",
        contents: back
      });

      onEditPageTitle(front[0]? front[0][0] : "");

      onAddBlock([newBlock], "1", false, newBlock.id);
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
      // onEditPageTitle(stage);
      onChangeEditingId();
      console.log("blur")
    }
  }, []);

  const handleFocus = useCallback((element: any) => {
    element.focus();
  }, []);

  const isFocus = () => {
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
    }
  }, [editingBlockId]);

  useEffect(() => {
    if(isGrab) {
      setEditable(!isGrab);
    } 
  }, [isGrab]);

  useEffect(() => {
    if(editingBlockId === blockData.id) {
      if(blockContentsRef) {
        handleFocus(blockContentsRef.current);
        setSelectionRange(blockContentsRef.current, 0, 0);
      }
    }
  }, [blockContentsRef]);

  return {
    blockContentsRef,
    handleKeyUp,
    handleKeyPress,
    handleFocus,
    handleBlur,
    handleMouseUp,
    isFocus,
    moveEndPoint,
    editable
  }
}

export default useTitleBlock;