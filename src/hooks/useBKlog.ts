import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModifyBlockDataType, ModifyPageInfoType } from '../components/block/types';
import { RootState } from '../store/modules';
import { addPushModifyBlockData, BklogState, resetBklog, updateBklog, getPage, updateVersion, changeUpdatedState, ClearBklogStateType, clearBklogState, releaseUpdating, changeUpdatingState, changePageInfo } from '../store/modules/bklog/utils';
import { Token } from '../utils/token';

export const useConnectBklogStore = (): BklogState => useSelector((state: RootState) => state.bklog);

function useBklogActions(bklogState: BklogState) {
  
  const dispatch = useDispatch();

  const onClearBklogState = useCallback((key: ClearBklogStateType) => {
    dispatch(clearBklogState(key));
  }, [dispatch]);

  const onGetPage = useCallback((pageId: string) => {
    console.log("페이지 불러오기");
    dispatch(getPage(pageId));
  }, [dispatch]);

  const onResetBklog = useCallback(() => {
    dispatch(resetBklog());
  }, [dispatch]);

  const onAddPushModifyBlockData = useCallback((modifyBlockData: ModifyBlockDataType) => {
    dispatch(addPushModifyBlockData(modifyBlockData));
  }, [dispatch]);

  const onAddPushModfiyPageInfo = useCallback((modifyPageInfo: ModifyPageInfoType) => {
    dispatch(changePageInfo(modifyPageInfo));
  }, [dispatch]);

  const onUpdateBklog = useCallback(() => {
    if(bklogState.pageInfo && (bklogState.pushModifyBlockData || bklogState.pushModifyPageInfo)) {
      dispatch(updateBklog({
        pageId: bklogState.pageInfo.id,
        pageVersions: {
          current: bklogState.version,
          next: Token.getUUID()
        },
        data: {
          modifyPageInfo: bklogState.pushModifyPageInfo? bklogState.pushModifyPageInfo : undefined,
          modifyBlockData: bklogState.pushModifyBlockData? bklogState.pushModifyBlockData : undefined
        }
      }));
   }
  }, [dispatch, bklogState.pushModifyBlockData, bklogState.pushModifyPageInfo, bklogState.version]);

  const onUpdateVersion = useCallback((id, preId) => {
    dispatch(updateVersion(id, preId));
  }, [dispatch]);

  const onChangeUpdatedState = useCallback((isUpdated?: boolean) => {
    dispatch(changeUpdatedState(isUpdated));
  }, [dispatch]);

  const onChangeUpdatingState = useCallback((isUpdating?: boolean) => {
    dispatch(changeUpdatingState(isUpdating));
  }, [dispatch]);

  const onReleaseUpdating = useCallback(() => {
    dispatch(releaseUpdating(bklogState.pageInfo.id));
  }, [dispatch, bklogState.pageInfo]);

  return { 
    bklogState,
    onClearBklogState,
    onResetBklog,
    onGetPage,
    onAddPushModifyBlockData,
    onAddPushModfiyPageInfo,
    onUpdateBklog,
    onUpdateVersion,
    onChangeUpdatedState,
    onChangeUpdatingState,
    onReleaseUpdating
  };
}

export default () => useBklogActions(useConnectBklogStore());