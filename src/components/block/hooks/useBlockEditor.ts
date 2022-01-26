import React, { useCallback, useEffect, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { UseBlockType } from './useBlock';
import useKeyboardActionHandler from './useKeyboardActionHandler';

function useBlockEditor(useBlockReducer: UseBlockType, updated: boolean = false) {

  const {
    state: {
      blockList,
      stageBlock,
      stagePage,
      isGrab,
      isCliping,
      tempClipData,
      editingBlockId,
    },
    titleBlock,
    initBlock,
    setCursorStart,
    setCursorEnd,
    onCommitTextBlock,
    onCommitPage,
    onResetEditorState,
    onRevertBlock,
    onChangeEditorState,
    onChangeFetchState,
    onClearStateItem
  } = useBlockReducer;

   // elements
   const editorRef = useRef<HTMLDivElement>(null);

   const dragRef = useRef<HTMLDivElement>(null);

   // callback 
   const handleMouseDown = useCallback((e: React.MouseEvent) => {
     dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 30}px)`);
   }, [dragRef]);
 
   const handleMouseMove = useCallback((e: React.MouseEvent) => {
     if(isGrab) {
       dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 30}px)`);
     }
   }, [isGrab, dragRef]);
 
   const handleDrag = useCallback((e: React.DragEvent) => {
     if(isGrab || isCliping) {
     }
   }, [isGrab, isCliping]);
 
   const handleMouseUp = useCallback(() => {
     onResetEditorState(false);
   }, [editorRef, onResetEditorState]);
 
   const handleMouseLeave = useCallback(() => {
     onResetEditorState(false);
   }, [onResetEditorState]);

   const handleKeyDown = useKeyboardActionHandler({
       startAction: (e: any) => {
        onChangeEditorState('isPress', true);

        if((e.metaKey || e.ctrlKey) && !stageBlock[0]) {
          return false;
        } else {
          return true;
        }
      },
      ["z"]: (e: any) => {
        e.preventDefault();
        onRevertBlock();
      },
      ["y"]: (e: any) =>  {
        e.preventDefault();
        onRevertBlock(true);
      }
   }, [stageBlock, tempClipData]);

  const handleKeyUp = useKeyboardActionHandler({
    startAction: (e: any) => {
      onChangeEditorState('isPress', false);
      return true;
    }
  }, []);

   // idle
   const handleOnIdle = useCallback(() => {
    if(stageBlock[0]) onCommitTextBlock();
    if(stagePage) onCommitPage();
    onResetEditorState(true);
    onChangeFetchState(true);
  }, [stageBlock, stagePage, onCommitTextBlock, onCommitPage]);

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 1,
    onIdle: handleOnIdle,
    debounce: 500
  });

  useEffect(() => {
    if(!updated) {
      onClearStateItem('updatedBlockIdList');
    }
  }, [updated]);

  useEffect(() => {
    if(!editingBlockId) {
      setCursorStart(0);
      setCursorEnd(0);
    }
  }, [editingBlockId]);

  return {
    blockList,
    initBlock,
    titleBlock,
    tempClipData,
    isGrab,
    isCliping,
    editorRef,
    dragRef,
    handleOnIdle,
    handleMouseDown,
    handleMouseMove,
    handleDrag,
    handleMouseUp,
    handleMouseLeave,
    handleKeyDown,
    handleKeyUp,
    getLastActiveTime
  }
}

export type UseBLockEditorType = ReturnType<typeof useBlockEditor>;

export default useBlockEditor;