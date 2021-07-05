import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import Block from './components/Block';
import './assets/block.scss';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';
import useBklog from '../../hooks/useBKlog';
import { convertModifyData } from './reducer/utils';
import { ReqUpdateBklog } from '../../store/modules/bklog/utils';

const PAGE_INFO: ReqUpdateBklog = {
	"pageId": "4d771ba2ad9806fcad4158dc67506e3f",
	"pageVersions": {
		"current": "4d06bfb7f376c98e8b1fb613e3981bw35",
		"next": "1d06bfb7f376c98e8b1fb6123e3981bw35"
	},
	"data": {
		"update": [
			{
				"blockId": "d5cc2725-97ec-494b-bc80-c16f96379e40",
				"set": "block",
				"payload": {
					"id": "d5cc2725-97ec-494b-bc80-c16f96379e40",
					"position": "2",
					"type": "block",
					"styleType": "bk-p",
					"styles": {
						"color": "white",
						"backgroudColor": "black"
					},
					"contents": [
						["블록 2입니다."]
					]
				}
			}
		]
	}
}

const BlockEditor: React.FC = () => {
  const { bklogState, onUpdateBklog, onAddPushModifyData } = useBklog();

  const hooks = useBlock();
  
  const {
    state,
    isGrab,
    isCliping,
    isFetch,
    tempClipData,
    modifyData,
    initBlock,
    onInitBlockState,
    onCommitBlock,
    onResetEditorState,
    onClearModifyData
  } = hooks;

  const editorRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  const isFetching = useMemo(() => bklogState.isFetching, [bklogState.isFetching]);

  const pushModifyData = useMemo(() => bklogState.pushModifyData, [bklogState.pushModifyData]);

  const handleOnIdle = useCallback(() => {
    if(state.stage[0]) onCommitBlock();
  }, [state.stage]);

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 70}px)`);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if(isGrab) {
      dragRef.current?.setAttribute("style", `transform: translate(${e.clientX - 40}px, ${e.clientY - 70}px)`);
    }
  }, [isGrab]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    if(isGrab || isCliping) {
    }
  }, [isGrab, isCliping])

  const handleMouseUp = useCallback(() => {
    onResetEditorState(false);
  }, [editorRef]);

  const handleMouseLeave = useCallback(() => {
    onResetEditorState(false);
  }, []);

  useEffect(() => {
    if(bklogState.blockList) {
      onInitBlockState(bklogState.blockList);
    }
  }, [bklogState.blockList]);

  useEffect(() => {
    if(isFetch && !isFetching && modifyData[0]) {
      console.log("convert", convertModifyData(state.modifyData));
      onAddPushModifyData(convertModifyData(state.modifyData));
      onClearModifyData();
    }
  }, [modifyData]);

  useEffect(() => {
    onUpdateBklog();
  }, [pushModifyData]);

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