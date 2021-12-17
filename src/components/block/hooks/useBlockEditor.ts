import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { UseBlockType } from './useBlock';

function useBlockEditor(useBlockReducer: UseBlockType) {

  const {
    state,
    stage,
    isGrab,
    isCliping,
    tempClipData,
    initBlock,
    onCommitBlock,
    onResetEditorState,
    onRevertBlock
  } = useBlockReducer;

  const titleBlock = useMemo(() => state.titleBlock, [state.titleBlock]);

   // elements
   const editorRef = useRef<HTMLDivElement>(null);

   const dragRef = useRef<HTMLDivElement>(null);
 
   // callback
   const handleOnIdle = useCallback(() => {
     if(stage[0]) onCommitBlock();
   }, [stage, onCommitBlock]);
 
   const handleMouseDown = useCallback((e: React.MouseEvent) => {
     dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 70}px)`);
   }, [dragRef]);
 
   const handleMouseMove = useCallback((e: React.MouseEvent) => {
     if(isGrab) {
       dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 70}px)`);
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

   useEffect(() => {
      console.log(state.blockList);
   }, [state.blockList])

   // idle
  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  });

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
    getLastActiveTime
  }
}

export type UseBLockEditorType = ReturnType<typeof useBlockEditor>;

export default useBlockEditor;