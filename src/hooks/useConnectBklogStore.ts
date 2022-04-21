import { useCallback, useEffect, useState } from "react";
import { ReturnConnectStoreHook } from "../components/block";
import { ModifyBlockToken } from "../components/block/entities/modify/block/ModifyBlockToken";
import { ModifyPageDataToken } from "../components/block/entities/modify/page/ ModifyPageDataToken";
import { UseBlockType } from "../components/block/hooks/useBlock";
import { ModifyBlockService } from "../components/block/service/modify/block/ModifyBlockService";
import { ModifyPageService } from "../components/block/service/modify/page/ModifyPageService";
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
    onAddPushModifyBlockTokenList, 
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
    onInitBlockState,
    onUpdateBlock,
    onInitPageTitle,
    onClearStateItem
  } = useBlockReducer;

  const {
    pageTitle,
    editingBlockId,
    isFetch,
    modifyBlockTokenList,
    modifyPageTokenList,
  } = state;

  const id: string | null = bklogState.pageInfo? bklogState.pageInfo.id : null;

  const title: string | null = bklogState.pageInfo? bklogState.pageInfo.title : null;

  const isKeyPress: boolean = state.isPress;

  const isFetching: boolean = bklogState.isFetching;

  const isUpdated: boolean = bklogState.isUpdated;

  const isUpdating: boolean = bklogState.isUpdating;

  const isRefresh: boolean = bklogState.isRefresh;

  const pageId: string | null = bklogState.pageInfo? bklogState.pageInfo.id : null;

  const editingPenName: string | null = user? user.penName : "unknown";

  const pushModifyBlockTokenList: ModifyBlockToken[] | null = bklogState.pushModifyBlockTokenList;

  const pushModifyPageTokenList: ModifyPageDataToken[] | null = bklogState.pushModifyPageTokenList;

  const currentVersion: string | null =  bklogState.version;

  const eventSocket = useCallback(() => {
    if(!socket) return;

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

  }, [socket]);

  // effect
  useEffect(() => {
    if(!bklogState.blockList || !bklogState.pageInfo) return;

    onInitBlockState(bklogState.blockList, bklogState.pageInfo.editable);
    onInitPageTitle(bklogState.pageInfo.title);
    onClearBklogState("blockList");
  }, [bklogState.blockList]);

  useEffect(() => {
    if(!pageTitle) return;
    if(pageId) onChangePageTitle(pageId, pageTitle);
    if(pageTitle !== title) onInitPageTitle(pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    if(isFetch && !isFetching && !updatingId && !isUpdated && !isKeyPress) {
      if(modifyBlockTokenList[0]) onAddPushModifyBlockTokenList(new ModifyBlockService(modifyBlockTokenList, true).getTokenList());
      if(modifyPageTokenList[0]) onChangePageInfo(new ModifyPageService(modifyPageTokenList, true).getTokenList());
    }
  }, [modifyBlockTokenList, modifyPageTokenList, isFetch, isFetching, updatingId, isKeyPress]);

  useEffect(() => {
    if(!isUpdated || !socket || !id) return;

    socket.emit("updated", [id, currentVersion]);
    onChangeUpdatedState();
    onClearStateItem("modifyBlockTokenList", "modifyPageTokenList");
  }, [isUpdated]);

  useEffect(eventSocket, [socket]);

  useEffect(() => {
    if(!socket || !pageId) return;

    if(connected) {
      console.log("connected", connected);
      socket.emit("roomjoin", pageId);
    } else {
      socket.emit("roomleave", pageId);
    }
  }, [socket, pageId, connected]);

  useEffect(() => {
    if(!newVersion || !currentVersion) return;
    
    onUpdateVersion(newVersion, currentVersion);
    setVersion(null);
  }, [newVersion]);

  useEffect(() => {
    if(!bklogState.pullModifyBlockData) return;
    
    onUpdateBlock(bklogState.pullModifyBlockData);
    setUpdated(true);
  }, [bklogState.pullModifyBlockData]);

  useEffect(() => {
    if(isRefresh && id) onGetPage(id);
  }, [isRefresh]);

  useEffect(() => {
    if(!socket || !pageId) return;
    
    if(editingBlockId) {
      socket.emit("edit", [ pageId, {
        penName: editingPenName,
        editingId: editingBlockId
      }]);
    } else {
      socket.emit("edited", [ pageId, editingPenName]);
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
    if(!updatingId && !isFetching && socket && (pushModifyBlockTokenList || pushModifyPageTokenList)) {
      onUpdateBklog();
      socket.emit("update");
    }
  }, [pushModifyBlockTokenList, pushModifyPageTokenList]);

  useEffect(() => {
    if(isFetching && (pushModifyBlockTokenList || pushModifyPageTokenList)) {
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