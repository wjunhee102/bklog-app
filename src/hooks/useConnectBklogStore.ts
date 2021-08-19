import { useCallback, useEffect, useMemo, useState } from "react";
import { ReturnConnectStoreHook } from "../components/block";
import { UseBlockType } from "../components/block/hooks/useBlock";
import { convertModifyData } from "../components/block/reducer/utils";
import { ModifyDataType } from "../components/block/types";
import { EditingUserInfo } from "../store/modules/bklog/utils";
import { SOCKET_URL } from "../utils/api-utils";
import useBklog from "./useBKlog";
import useSocket from "./useSocket";

function useConnectBklogStore(useBlockReducer: UseBlockType): ReturnConnectStoreHook {
  const socket = useSocket(SOCKET_URL);

  const [ newVersion, setVersion ]    = useState<string | null>(null);
  const [ updated, setUpdated ]       = useState<boolean>(false);
  const [ updatingId, setUpdatingId ] = useState<string | null>(null);

  const {
    bklogState, 
    onClearBklogState,
    onUpdateBklog, 
    onAddPushModifyData, 
    onGetPage,
    onUpdateVersion,
    onChangeUpdatedState,
    onChangeUpdatingState,
    onReleaseUpdating
  } = useBklog();

  const {
    state,
    editingBlockId,
    isFetch,
    modifyData,
    onInitBlockState,
    onClearModifyData,
    onUpdateBlock
  } = useBlockReducer;

  const isFetching: boolean = useMemo(() => bklogState.isFetching, [bklogState.isFetching]);

  const isUpdated: boolean = useMemo(() => bklogState.isUpdated, [bklogState.isUpdated]);

  const isUpdating: boolean = useMemo(() =>  bklogState.isUpdating, [bklogState.isUpdating]);

  const isRefresh: boolean = useMemo(() => bklogState.isRefresh, [bklogState.isRefresh]);

  const pageId: string | null = useMemo(() => bklogState.pageInfo? bklogState.pageInfo.id : null, [bklogState.pageInfo]);

  const pushModifyData: ModifyDataType | null = useMemo(() => bklogState.pushModifyData, [bklogState.pushModifyData]);

  const currentVersion: string | null = useMemo(() => bklogState.version, [bklogState.version]);

  const eventSocket = useCallback(() => {
    if(socket) {

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update", (clientId: string) => {
        setUpdatingId(clientId);
        onChangeUpdatingState(true);
      });

      socket.on("updated", (data: string) => {
        console.log(`updated: ${data}`);
        setVersion(data);
        setUpdatingId(null);
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

  // effect
  useEffect(() => {
    if(bklogState.blockList) {
      console.log("init 실행");
      onInitBlockState(bklogState.blockList);
      onClearBklogState("blockList");
      // onClearModifyData();
    }
  }, [bklogState.blockList]);

  useEffect(() => {
    if(isFetch && !isFetching && modifyData[0] && !updatingId) {
      console.log("실행", modifyData);
      onAddPushModifyData(convertModifyData(state.modifyData));
    }
  }, [modifyData, isFetch, isFetching, updatingId]);

  useEffect(() => {
    if(isUpdated && socket) {
      socket.emit("updated", [bklogState.pageInfo.id, currentVersion]);
      onChangeUpdatedState();
      onClearModifyData();
    } 
  }, [isUpdated]);

  // 일단 서버에서 충돌 막을 방법을 찾아야 할 듯.
  useEffect(() => {
    if(!updatingId && socket) {
      onUpdateBklog();
      socket.emit("update");
    }
  }, [pushModifyData]);

  useEffect(eventSocket, [socket]);

  useEffect(() => {
    if(socket && pageId) {
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
    if(updatingId) {
      const timer = setTimeout(() => {
        setUpdatingId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updatingId]);

  useEffect(() => {
    if(!updatingId && pushModifyData) {
      onUpdateBklog();
    } else {
      const timer = setTimeout(() => {
        if(bklogState.isUpdating) onReleaseUpdating();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  useEffect(() => {
    console.log(modifyData);
  }, [modifyData]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return {
    updated
  };
}

export default useConnectBklogStore;