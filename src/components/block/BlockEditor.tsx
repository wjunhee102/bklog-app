import React from 'react';
import classNames from 'classnames';
import useBlock, { UseBlockType } from './hooks/useBlock';
import { ReturnConnectStoreHook } from '.';
import { BlockData } from './types';
import Block from './components/block';
import useBlockEditor from './hooks/useBlockEditor';
import './assets/BlockEditor.scss';

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
    blockList,
    initBlock,
    titleBlock,
    tempClipData,
    isGrab,
    isCliping,
    editorRef,
    dragRef,
    handleMouseDown,
    handleMouseMove,
    handleDrag,
    handleMouseUp,
    handleMouseLeave,
    handleKeyDown,
    handleKeyUp
  } = useBlockEditor(useBlockReducer, updated);

  return (
    <div 
      className="block-editor notranslate"
      ref={editorRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onDrag={handleDrag}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <div className="block-container-outer">
        
        <div className="cover">
          <img src="/img/cover.jpg" alt="junhee"/>
        </div>
        
        <div className={classNames(
          "block-container",
          {"not-drag": (isGrab || isCliping)? true : false}
        )}>
          <div className="block-title-box">

            {
              titleBlock?
              <Block 
                key={titleBlock.id}
                blockData={titleBlock}
                useBlockReducer={useBlockReducer}
              /> : null
            }

          </div>
          
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
        
      </div>

      <div className="block-overlay">
        <div className="block-overlay-container">

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
                const blockData = blockList[data];
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
      </div>

    </div>
  )
}

export default BlockEditor;