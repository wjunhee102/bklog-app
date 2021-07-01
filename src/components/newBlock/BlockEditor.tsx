import React, { useCallback, useEffect, useRef, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import Block from './components/Block';
import './assets/block.scss';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';

// let clientX = 0;
// let clientY = 0;

const BlockEditor: React.FC = () => {
  const hooks = useBlock();
  
  const {
    state,
    isGrab,
    isCliping,
    tempClipData,
    initBlock,
    onCommitBlock,
    onResetEditorState
  } = hooks;

  const editorRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  const handleOnIdle = useCallback(() => {
    if(state.stage[0]) onCommitBlock();
  }, [state.stage]);

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current?.setAttribute("style", `transform: translate(${e.clientX + 10}px, ${e.clientY - 50}px)`);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if(isGrab) {
      dragRef.current?.setAttribute("style", `transform: translate(${e.clientX + 10}px, ${e.clientY - 50}px)`);
    }
  }, [isGrab]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    if(isGrab || isCliping) {
    }
  }, [isGrab, isCliping])

  const handleMouseUp = useCallback(() => {
    // if(!dragRef) {
    //   const textarea = document.createElement("textarea");
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   document.body.removeChild(textarea);
    //   console.log("실행")
    // }
    onResetEditorState(false);
  }, [editorRef]);

  const handleMouseLeave = useCallback(() => {
    onResetEditorState(false);
  }, []);

  useEffect(() => {
    console.log(state, !hooks.isGrab);
  }, [state]);

  return (
    <div 
      className="block-editor blockEditor items-center overflow-auto w-full notranslate text-gray-700 bg-white h-full rounded-md shadow-md"
      ref={editorRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onDrag={handleDrag}
    >
      <div className="cover mb-8"></div>
      <div className={classNames(
        "m-auto", 
        "h-full", 
        "block-container",
        {"not-drag": (isGrab || isCliping)? true : false}
      )}>
        {
          initBlock?
          initBlock.root.map((block: BlockData) =>
            <Block
              key={block.id}
              blockData={block}
              hooks={hooks}
            />
          ) : <div></div>
        }
      </div>

      {
        // 이거 전용 element를 만들어야 함.
        <div 
          className={classNames(
            "drag-elements",
            {hidden: !isGrab}
          )}
          ref={dragRef}
        >
          {
            tempClipData[0] !== undefined?
            tempClipData.map((data, idx) => {
              const blockData = state.blockList[data];
              return (
                <Block 
                  key={idx} 
                  blockData={blockData}
                  hooks={hooks}
                />
              );
            })
            : null
          }
        </div>
      }
      

    </div>
  )
}

export default BlockEditor;