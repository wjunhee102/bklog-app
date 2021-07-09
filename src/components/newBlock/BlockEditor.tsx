import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData, ModifyData, ModifyDataType } from './types';
import Block from './components/Block';
import './assets/block.scss';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';
import useBklog from '../../hooks/useBKlog';
import { convertModifyData, replaceModifyData } from './reducer/utils';
import useSocket from '../../hooks/useSocket';
import { EditingUserInfo } from '../../store/modules/bklog/utils';
import testNewBlock from './test';

const TEST_DATA: ModifyDataType = {
  update: [
    {
      blockId: "1",
      set: "block",
      payload: {
        contents: ["123"]
      }
    }
  ],
  delete: {
    blockIdList: ["1"]
  },
  create: [
    {
      blockId: "2",
      set: "block",
      payload: {
        id: "2",
        position: "2",
        styleType: "bk-p",
        type: "text",
        contents: ["2"],
        styles: "s"
      }
    },
    {
      blockId: "3",
      set: "block",
      payload: {
        id: "3",
        position: "3",
        styleType: "bk-p",
        type: "text",
        contents: ["2"],
        styles: "s"
      }
    }
  ]
}

const TEST_DATA2: ModifyData[] = [
  {
    blockId: "1",
    set: "block",
    command: "update",
    payload: {
      position: "2",
      contents: ["1223"]
    }
  },
  {
    blockId: "2",
    set: "block",
    command: "create",
    payload: {
      id: "2",
      position: "2",
      styleType: "bk-p",
      type: "text",
      contents: ["2"],
      styles: "s"
    }
  },
  {
    blockId: "3",
    set: "block",
    command: "delete",
    payload: "1"
  }
];

console.log(replaceModifyData(TEST_DATA2, TEST_DATA));

const BlockEditor: React.FC = () => {
  const { 
    bklogState, 
    onClearBklogState,
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
    editingBlockId,
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

  // state
  const [ newVersion, setVersion ] = useState<string | null>(null);
  const [ updated, setUpdated ]    = useState<boolean>(false);

  // elements
  const editorRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  // memories
  const isFetching: boolean = useMemo(() => bklogState.isFetching, [bklogState.isFetching]);

  const isUpdated: boolean = useMemo(() => bklogState.isUpdated, [bklogState.isUpdated]);

  const isRefresh: boolean = useMemo(() => bklogState.isRefresh, [bklogState.isRefresh]);

  const pageId: string | null = useMemo(() => bklogState.pageInfo? bklogState.pageInfo.id : null, [bklogState.pageInfo]);

  const pushModifyData: ModifyDataType | null = useMemo(() => bklogState.pushModifyData, [bklogState.pushModifyData]);

  const currentVersion: string | null = useMemo(() => bklogState.version, [bklogState.version]);

  // callBack
  const handleOnIdle = useCallback(() => {
    if(state.stage[0]) onCommitBlock();
  }, [state.stage]);

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

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("updated", (data: string) => {
        console.log(`updated: ${data}`);
        setVersion(data);
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      socket.on("editing", (userInfo: EditingUserInfo) => {
        console.log(userInfo);
      });

      socket.on("edited", (penName: string) => {
        console.log(penName);
      });

    }
  }, [socket]);

  // idle
  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 2,
    onIdle: handleOnIdle,
    debounce: 500
  });

  // effect
  useEffect(() => {
    if(bklogState.blockList) {
      onInitBlockState(bklogState.blockList);
      onClearBklogState("blockList");
      onClearModifyData();
    }
  }, [bklogState.blockList]);

  useEffect(() => {
    if(isFetch && !isFetching && modifyData[0]) {
      onAddPushModifyData(convertModifyData(state.modifyData));
    }
  }, [modifyData]);

  useEffect(() => {
    if(isUpdated && socket) {
      socket.emit("update", [bklogState.pageInfo.id, currentVersion]);
      onChangeUpdateState();
      onClearModifyData();
    } 
  }, [isUpdated]);

  useEffect(() => {
    onUpdateBklog();
  }, [pushModifyData]);

  useEffect(() => {
    eventSocket();
  }, [socket]);

  useEffect(() => {
    if(socket && pageId) {
      console.log(socket, pageId);
      socket.emit("roomjoin", pageId);
    }
  }, [socket, pageId]);

  useEffect(() => {
    if(newVersion && currentVersion) {
      onUpdateVersion(newVersion, currentVersion);
      setVersion(null);
    }
  }, [newVersion]);

  useEffect(() => {
    if(bklogState.pullModifyData) { 
      onUpdateBlock(bklogState.pullModifyData);
      setUpdated(true);
    }
  }, [bklogState.pullModifyData]);

  useEffect(() => {
    if(isRefresh) onGetPage(bklogState.pageInfo.id);
  }, [isRefresh]);

  useEffect(() => {
    if(socket && pageId) {
      console.log(editingBlockId);
      if(editingBlockId) {
        socket.emit("edit", [ pageId, {
          penName: "junhee",
          editingId: editingBlockId
        }]);
      } else {
        socket.emit("edited", [ pageId, "junhee"]);
      }
    }
  }, [editingBlockId]);

  useEffect(() => {
    if(updated) {
      const timer = setTimeout(() => {
        setUpdated(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [updated]);

  useEffect(() => {
    testNewBlock();
  }, []);

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