import { useCallback, useEffect, useMemo, useState } from "react";
import { ReturnConnectStoreHook } from "../components/block";
import { UseBlockType } from "../components/block/hooks/useBlock";
import { convertModifyBlockData } from "../components/block/reducer/utils";
import { ModifyBlockDataType, ModifyPageInfoType } from "../components/block/types";
import { EditingUserInfo } from "../store/modules/bklog/utils";
import { SOCKET_URL } from "../utils/api-utils";
import { useConnectAuthStore } from "./useAuth";
import useBklog from "./useBklog";
import usePage from "./usePage";
import useSocket from "./useSocket";

function useConnectBklogStore(useBlockReducer: UseBlockType): ReturnConnectStoreHook {
  const socket = useSocket(SOCKET_URL);

  const [ newVersion, setVersion ]          = useState<string | null>(null);
  const [ updated, setUpdated ]             = useState<boolean>(false);
  const [ updatingId, setUpdatingId ]       = useState<string | null>(null);
  const [ updatedTimer, setUpdatedTimer ]   = useState<boolean>(false);
  const [ updatingTimer, setUpdatingTimer ] = useState<boolean>(false);
  const [ connected, setConnected ]         = useState<boolean>(false);

  const {
    bklogState, 
    onClearBklogState,
    onUpdateBklog, 
    onAddPushModifyBlockData, 
    onGetPage,
    onUpdateVersion,
    onChangeUpdatedState,
    onChangeUpdatingState,
    onReleaseUpdating,
    onChangePageInfo
  } = useBklog();

  const {
    onChangePageTitle
  } = usePage();

  const {
    user
  } = useConnectAuthStore();

  const {
    state,
    title,
    stagePage,
    editingBlockId,
    isFetch,
    modifyData,
    modifyPageInfo,
    onInitBlockState,
    onClearModifyData,
    onUpdateBlock,
    onInitPageTitle,
    onEditPageInfo,
    onEditPageTitle,
    onClearStateItem
  } = useBlockReducer;

  const pageTitle: string | null = useMemo(() => bklogState.pageInfo? bklogState.pageInfo.title : null, [bklogState.pageInfo]);

  const isKeyPress: boolean = useMemo(() => state.isPress, [state.isPress]);

  const isFetching: boolean = useMemo(() => bklogState.isFetching, [bklogState.isFetching]);

  const isUpdated: boolean = useMemo(() => bklogState.isUpdated, [bklogState.isUpdated]);

  const isUpdating: boolean = useMemo(() =>  bklogState.isUpdating, [bklogState.isUpdating]);

  const isRefresh: boolean = useMemo(() => bklogState.isRefresh, [bklogState.isRefresh]);

  const pageId: string | null = useMemo(() => bklogState.pageInfo? bklogState.pageInfo.id : null, [bklogState.pageInfo]);

  const editingPenName: string | null = useMemo(() => user? user.penName : "unknown", [user]);

  const pushModifyBlockData: ModifyBlockDataType | null = useMemo(() => bklogState.pushModifyBlockData, [bklogState.pushModifyBlockData]);

  const pushModifyPageInfo: ModifyPageInfoType | null = useMemo(() => bklogState.pushModifyPageInfo, [bklogState.pushModifyPageInfo]);

  const currentVersion: string | null = useMemo(() => bklogState.version, [bklogState.version]);

  const eventSocket = useCallback(() => {
    if(socket) {

      socket.on("connect", () => {
        console.log("connected");
        setConnected(true);
      });

      socket.on("update", (clientId: string) => {
        setUpdatingId(clientId);
        onChangeUpdatingState(true);
      });

      socket.on("updated", (version: string) => {
        setVersion(version);
        setUpdatingId(null);
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
        setConnected(false);
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
      onInitPageTitle(bklogState.pageInfo.title);
      onClearBklogState("blockList");
    }
  }, [bklogState.blockList]);

  useEffect(() => {
    if(pageTitle) {
      if(pageId) onChangePageTitle(pageId, pageTitle);
      if(pageTitle !== title) onInitPageTitle(pageTitle);
    }
  }, [pageTitle]);

  useEffect(() => {
    if(isFetch && !isFetching && !updatingId && !isUpdated && !isKeyPress) {
      if(modifyData[0]) onAddPushModifyBlockData(convertModifyBlockData(state.modifyData));
      if(modifyPageInfo) onChangePageInfo(modifyPageInfo);
    }
  }, [modifyData, modifyPageInfo, isFetch, isFetching, updatingId, isKeyPress]);

  useEffect(() => {
    if(isUpdated && socket) {
      socket.emit("updated", [bklogState.pageInfo.id, currentVersion]);
      onChangeUpdatedState();
      onClearModifyData();
      onClearStateItem("modifyPageInfo")
    } 
  }, [isUpdated]);

  useEffect(eventSocket, [socket]);

  useEffect(() => {
    if(socket && pageId) {
      if(connected) {
        console.log("connected", connected);
        socket.emit("roomjoin", pageId);
      } else {
        socket.emit("roomleave", pageId);
      }
    }
  }, [socket, pageId, connected]);

  useEffect(() => {
    if(newVersion && currentVersion) {
      onUpdateVersion(newVersion, currentVersion);
      setVersion(null);
    }
  }, [newVersion]);

  useEffect(() => {
    if(bklogState.pullModifyBlockData) { 
      onUpdateBlock(bklogState.pullModifyBlockData);
      setUpdated(true);
    }
  }, [bklogState.pullModifyBlockData]);

  useEffect(() => {
    if(isRefresh) onGetPage(bklogState.pageInfo.id);
  }, [isRefresh]);

  useEffect(() => {
    if(socket && pageId) {
      if(editingBlockId) {
        socket.emit("edit", [ pageId, {
          penName: editingPenName,
          editingId: editingBlockId
        }]);
      } else {
        socket.emit("edited", [ pageId, editingPenName]);
      }
    }
  }, [editingBlockId]);

  useEffect(() => {
    if(updated && !updatedTimer) {
      setUpdatedTimer(true);

      const timer = setTimeout(() => {
        setUpdated(false);
        setUpdatedTimer(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [updated]);

  useEffect(() => {
    if(updatingId && !updatingTimer) {
      setUpdatingTimer(true);

      const timer = setTimeout(() => {
        setUpdatingTimer(false);
        setUpdatingId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updatingId]);

  /** update */

   // 일단 서버에서 충돌 막을 방법을 찾아야 할 듯.
  useEffect(() => {
    console.log(pushModifyPageInfo);
    if(!updatingId && !isFetching && socket && (pushModifyBlockData || pushModifyPageInfo)) {
      onUpdateBklog();
      socket.emit("update");
    }
  }, [pushModifyBlockData, pushModifyPageInfo]);

  useEffect(() => {
    if(isFetching && (pushModifyBlockData || pushModifyPageInfo)) {
      if(!updatingId && !isUpdating) {
        onUpdateBklog();
      } else {
        const timer = setTimeout(() => {
          if(isUpdating) onReleaseUpdating();
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }
  }, [isUpdating, updatingId]);

  useEffect(() => {
    return () => {
      setUpdated(false);
      setUpdatedTimer(false);
      setUpdatingTimer(false);
    }
  }, []);

  return {
    updated
  };
}

export default useConnectBklogStore;