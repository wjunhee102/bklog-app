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
import useSocket from '../../hooks/useSocket';

const BlockEditor: React.FC = () => {
  const { 
    bklogState, 
    onUpdateBklog, 
    onAddPushModifyData, 
    onGetPage,
    onUpdateVersion,
    onChangeUpdateState
  } = useBklog();
  const socket = useSocket("http://localhost:4600/bklog");
  const hooks  = useBlock();
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
    onClearModifyData,
    onUpdateBlock
  } = hooks;
  
  const [ update, setUpdate ] = useState<boolean>(false);

  const [ newVersion, setVersion ] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  const isFetching = useMemo(() => bklogState.isFetching, [bklogState.isFetching]);

  const isUpdated = useMemo(() => bklogState.isUpdated, [bklogState.isUpdated]);

  const isRefresh = useMemo(() => bklogState.isRefresh, [bklogState.isRefresh]);

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
  }, [isGrab, isCliping]);

  const handleMouseUp = useCallback(() => {
    onResetEditorState(false);
  }, [editorRef]);

  const handleMouseLeave = useCallback(() => {
    onResetEditorState(false);
  }, []);

  const eventSocket = useCallback(() => {
    if(socket) {
      socket.on("message", (data: any) => console.log(data));
      socket.on("updated", (data: string) => {
        console.log("updated", data, bklogState.pageInfo.id);
        setVersion(data);
      });
    }
  }, [socket]);

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
    if(isUpdated && socket) {
      socket.emit("update", [bklogState.pageInfo.id, bklogState.pageInfo.version]);
      onChangeUpdateState();
    } 
  }, [isUpdated]);

  useEffect(() => {
    onUpdateBklog();
  }, [pushModifyData]);

  useEffect(() => {

    if(bklogState.pageInfo && socket) {
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("roomjoin", bklogState.pageInfo.id);
      })
    }
    
  }, [bklogState.pageInfo, socket]);

  useEffect(() => {
    if(newVersion && bklogState.pageInfo) {
      onUpdateVersion(newVersion, bklogState.pageInfo.version);
      setVersion(null);
    }
  }, [newVersion]);

  useEffect(() => {
    eventSocket();
  }, [socket]);

  useEffect(() => {
    if(bklogState.pullModifyData) { 
      onUpdateBlock(bklogState.pullModifyData);
    }
  }, [bklogState.pullModifyData]);

  useEffect(() => {
    if(isRefresh) onGetPage(bklogState.pageInfo.id);
  }, [isRefresh]);

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