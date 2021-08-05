import { useCallback, useEffect, useMemo, useState } from "react";
import useBklog from "../../../hooks/useBKlog";
import useSocket from "../../../hooks/useSocket";
import { EditingUserInfo } from "../../../store/modules/bklog/utils";
import { convertModifyData } from "../reducer/utils";
import { ModifyDataType } from "../types";
import { UseBlockType } from "./useBlock";

function useConnectRedux(useBlockReducer: UseBlockType) {
  const socket = useSocket(process.env.NODE_ENV === "production"? "http://27.96.134.8:4600/bklog" : "http://localhost:4600/bklog");

  const [ newVersion, setVersion ]            = useState<string | null>(null);
  const [ updated, setUpdated ]               = useState<boolean>(false);
  const [ updatingId, setUpdatingId ] = useState<string | null>(null);

  const {
    bklogState, 
    onClearBklogState,
    onUpdateBklog, 
    onAddPushModifyData, 
    onGetPage,
    onUpdateVersion,
    onChangeUpdateState
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
      onInitBlockState(bklogState.blockList);
      onClearBklogState("blockList");
      onClearModifyData();
    }
  }, [bklogState.blockList]);

  useEffect(() => {
    if(isFetch && !isFetching && modifyData[0] && !updatingId) {
      onAddPushModifyData(convertModifyData(state.modifyData));
    }
  }, [modifyData, isFetch, isFetching, updatingId]);

  useEffect(() => {
    if(isUpdated && socket) {
      socket.emit("updated", [bklogState.pageInfo.id, currentVersion]);
      onChangeUpdateState();
      onClearModifyData();
    } 
  }, [isUpdated]);

  // 일단 서버에서 충돌 막을 방법을 찾아야 할 듯.
  useEffect(onUpdateBklog, [pushModifyData]);

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

  return {
    updated
  };
}

export default useConnectRedux;