import React, { useCallback, useEffect, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';
import useBlock, { UseBlockType } from './hooks/useBlock';
import { ReturnConnectStoreHook } from '.';
import { BlockData } from './types';
import Block from './components/Block';
import './assets/BlockEditor.scss';
import useBlockEditor from './hooks/useBlockEditor';

const valueNotConnectStoreHook: ReturnConnectStoreHook = {
  updated: false
};

interface BlockEditorProps {
  connectStoreHook?: (useBlockReducer: UseBlockType) => ReturnConnectStoreHook;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ connectStoreHook }) => {
  const useBlockReducer = useBlock();

  const { updated } = connectStoreHook? connectStoreHook(useBlockReducer) : valueNotConnectStoreHook; 

  const {
    state,
    initBlock,
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
  } = useBlockEditor(useBlockReducer);

  return (
    <div 
      className="block-editor items-center w-full notranslate text-gray-700 bg-white h-auto"
      ref={editorRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onDrag={handleDrag}
      onKeyDown={handleKeyDown}
    >
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