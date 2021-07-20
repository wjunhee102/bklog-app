import React, { useCallback, useEffect, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';
import useBlock from './hooks/useBlock';
import { BlockData, ModifyData, ModifyDataType } from './types';
import { replaceModifyData } from './reducer/utils';
import useConnectRedux from './hooks/useConnectRedux';
import Block from './components/Block';
import './assets/block.scss';

const BlockEditor: React.FC = () => {
  
  // custom hooks
  const useBlockReducer = useBlock();

  // redux & api
  const { updated } = useConnectRedux(useBlockReducer);
  
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

  // idle
  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  });

  return (
    <div 
      className="block-editor blockEditor items-center overflow-auto w-full notranslate text-gray-700 bg-white h-full rounded-md shadow-md"
      ref={editorRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onDrag={handleDrag}
      onKeyDown={handleKeyDown}
    >
      <div className="cover"></div>
      <div className={classNames(
        "pt-8",
        "m-auto", 
        "h-full", 
        "block-container",
        {"not-drag": (isGrab || isCliping)? true : false},
        {"updated": updated}
      )}>
        {
          initBlock?
          initBlock.root.map((block: BlockData) =>
            <Block
              key={block.id}
              blockData={block}
              useBlockReducer={useBlockReducer}
            />
          ) : <div> Loading... </div>
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
                  useBlockReducer={useBlockReducer}
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