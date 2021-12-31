import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { UseBlockType } from './useBlock';

function useBlockEditor(useBlockReducer: UseBlockType, updated: boolean = false) {

  const {
    state,
    stage,
    isGrab,
    isCliping,
    tempClipData,
    initBlock,
    editingBlockId,
    setCursorStart,
    setCursorEnd,
    onCommitBlock,
    onResetEditorState,
    onRevertBlock,
    onChangeEditorState,
    onChangeFetchState
  } = useBlockReducer;

  const titleBlock = useMemo(() => state.titleBlock, [state.titleBlock]);

   // elements
   const editorRef = useRef<HTMLDivElement>(null);

   const dragRef = useRef<HTMLDivElement>(null);

   // callback 
   const handleMouseDown = useCallback((e: React.MouseEvent) => {
     console.log(`client(${e.clientX}, ${e.clientY}), page(${e.pageX}, ${e.pageY}), screen(${e.screenX}, ${e.screenY}) movement(${e.movementX}, ${e.movementY}) scroll(${window.scrollY})`, e)
     dragRef.current?.setAttribute("style", `transform: translate(${e.screenX - 40}px, ${e.screenY - 70}px)`);
   }, [dragRef]);
 
   const handleMouseMove = useCallback((e: React.MouseEvent) => {
     if(isGrab) {
       dragRef.current?.setAttribute("style", `transform: translate(${e.pageX - 40}px, ${e.pageY - 70}px)`);
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
 
   const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      onChangeEditorState('isPress', true);

     if((e.metaKey || e.ctrlKey)) {
       if(!stage[0]) {
         switch(e.key) {
           case "z":
             e.preventDefault();
             onRevertBlock();
           break;
     
           case "y":
             e.preventDefault();
             onRevertBlock(true);
           break;
     
           default: 
         }
       } 
 
       if(tempClipData[0]) {
 
       }
     }
   }, [onRevertBlock, stage, tempClipData]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    onChangeEditorState('isPress', false);
  }, [onChangeEditorState])

   // idle
   const handleOnIdle = useCallback(() => {
    if(stage[0]) onCommitBlock();
    onResetEditorState(true);
    onChangeFetchState(true);
  }, [stage, onCommitBlock]);

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 1,
    onIdle: handleOnIdle,
    debounce: 500
  });

  useEffect(() => {
    if(!updated) {
      useBlockReducer.onClearStateItem('updatedBlockIdList');
    }
  }, [updated]);

  useEffect(() => {
    if(!editingBlockId) {
      setCursorStart(0);
      setCursorEnd(0);
    }
  }, [editingBlockId]);

  return {
    state,
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