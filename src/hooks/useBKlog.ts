import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModifyDataType } from '../components/block/types';
import { RootState } from '../store/modules';
import { addPushModifyData, BklogState, resetBklog, updateBklog, getPage, updateVersion, changeUpdateState, ClearBklogStateType, clearBklogState, releaseUpdating } from '../store/modules/bklog/utils';
import { Token } from '../utils/token';

function useBklog() {
  
  const bklogState: BklogState = useSelector((state: RootState) => state.bklog);
  
  const dispatch = useDispatch();

  const onClearBklogState = useCallback((key: ClearBklogStateType) => {
    dispatch(clearBklogState(key));
  }, [dispatch]);

  const onGetPage = useCallback((id: string) => {
    console.log("페이지 불러오기");
    dispatch(getPage(id));
  }, [dispatch]);

  const onResetBklog = useCallback(() => {
    dispatch(resetBklog());
  }, [dispatch]);

  const onAddPushModifyData = useCallback((modifyData: ModifyDataType) => {
    dispatch(addPushModifyData(modifyData));
  }, [dispatch]);

  const onUpdateBklog = useCallback(() => {
    if(bklogState.pageInfo && bklogState.pushModifyData) {
      const { id } = bklogState.pageInfo;
      const modifyData = bklogState.pushModifyData;

      dispatch(updateBklog({
        pageId: id,
        pageVersions: {
          current: bklogState.version,
          next: Token.getUUID()
        },
        data: modifyData
      }));
   }
  }, [dispatch, bklogState.pageInfo, bklogState.pushModifyData, bklogState.version]);

  const onUpdateVersion = useCallback((id, preId) => {
    dispatch(updateVersion(id, preId));
  }, [dispatch]);

  const onChangeUpdateState = useCallback((isUpdated?: boolean) => {
    dispatch(changeUpdateState(isUpdated));
  }, [dispatch]);

  const onReleaseUpdating = useCallback(() => {
    dispatch(releaseUpdating(bklogState.pageInfo.id));
  }, [dispatch, bklogState.pageInfo]);

  return { 
    bklogState,
    onClearBklogState,
    onResetBklog,
    onGetPage,
    onAddPushModifyData,
    onUpdateBklog,
    onUpdateVersion,
    onChangeUpdateState,
    onReleaseUpdating
  };
}

export default useBklog;