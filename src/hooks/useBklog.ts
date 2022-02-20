import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModifyBlockToken } from '../components/block/entities/modify/block/ModifyBlockToken';
import { ModifyPageDataToken } from '../components/block/entities/modify/page/ ModifyPageDataToken';
import { ModifyService } from '../components/block/service/modify/ModifyService';
import { RootState } from '../store/modules';
import { addPushModifyBlockTokenList, BklogState, resetBklog, updateBklog, getPage, updateVersion, changeUpdatedState, ClearBklogStateType, clearBklogState, releaseUpdating, changeUpdatingState, changePageInfo, addPageEditor, excludePageEditor } from '../store/modules/bklog/utils';
import { Token } from '../utils/token';

export const useConnectBklogStore = (): BklogState => useSelector((state: RootState) => state.bklog);

function useBklogActions(bklogState: BklogState) {
  
  const dispatch = useDispatch();

  const onClearBklogState = useCallback((...key: ClearBklogStateType[]) => {
    dispatch(clearBklogState(...key));
  }, [dispatch]);

  const onGetPage = useCallback((pageId: string) => {
    console.log("페이지 불러오기");
    dispatch(getPage(pageId));
  }, [dispatch]);

  const onResetBklog = useCallback(() => {
    dispatch(resetBklog());
  }, [dispatch]);

  const onAddPushModifyBlockTokenList = useCallback((modifyBlockTokenList: ModifyBlockToken[]) => {
    dispatch(addPushModifyBlockTokenList(modifyBlockTokenList));
  }, [dispatch]);

  const onChangePageInfo = useCallback((modifyPageTokenList: ModifyPageDataToken[]) => {
    dispatch(changePageInfo(modifyPageTokenList));
  }, [dispatch]);

  const onUpdateBklog = useCallback(() => {
    if(bklogState.pageInfo && (bklogState.pushModifyBlockTokenList || bklogState.pushModifyPageTokenList)) {

      const data = new ModifyService({
        modifyBlockTokenList: bklogState.pushModifyBlockTokenList? bklogState.pushModifyBlockTokenList : undefined,
        modifyPageTokenList: bklogState.pushModifyPageTokenList? bklogState.pushModifyPageTokenList : undefined
      }).merge().getData();

      if(!data) return false;

      dispatch(updateBklog({
        pageId: bklogState.pageInfo.id,
        pageVersions: {
          current: bklogState.version? bklogState.version : "",
          next: Token.getUUID()
        },
        data
      }));
   }
  }, [dispatch, bklogState.pushModifyBlockTokenList, bklogState.pushModifyPageTokenList, bklogState.version]);

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
    if(!bklogState.pageInfo) return false;
    dispatch(releaseUpdating(bklogState.pageInfo.id));
  }, [dispatch, bklogState.pageInfo]);

  const onAddPageEditor = useCallback((profileId: string, targetProfileId: string) => {
    if(!bklogState.pageInfo) return false;
    dispatch(addPageEditor({
      pageId: bklogState.pageInfo.id, 
      profileId, 
      targetProfileId
    }))
  }, [dispatch]);

  const onExcludePageEditor = useCallback((profileId: string, targetProfileId: string) => {
    if(!bklogState.pageInfo) return false;
    dispatch(excludePageEditor({
      pageId: bklogState.pageInfo.id, 
      profileId, 
      targetProfileId
    }))
  }, [dispatch]);

  return { 
    bklogState,
    onClearBklogState,
    onResetBklog,
    onGetPage,
    onAddPushModifyBlockTokenList,
    onChangePageInfo,
    onUpdateBklog,
    onUpdateVersion,
    onChangeUpdatedState,
    onChangeUpdatingState,
    onReleaseUpdating,
    onAddPageEditor,
    onExcludePageEditor
  };
}

export default () => useBklogActions(useConnectBklogStore());