import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModifyDataType } from '../components/newBlock/types';
import { RootState } from '../store/modules';
import { addPushModifyData, BklogState, resetBklog, ReqUpdateBklog, updateBklog, getPage } from '../store/modules/bklog/utils';
import { Token } from '../utils/token';

function useBklog() {
  
  const bklogState: BklogState = useSelector((state: RootState) => state.bklog);
  
  const dispatch = useDispatch();

  const onGetPage = useCallback((id: string) => {
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
      const { id, version } = bklogState.pageInfo;
      const modifyData = bklogState.pushModifyData;

      dispatch(updateBklog({
        pageId: id,
        pageVersions: {
          current: version,
          next: Token.getUUID()
        },
        data: modifyData
      }));
   }
  }, [dispatch, bklogState.pageInfo, bklogState.pushModifyData]);

  return { 
    bklogState,
    onResetBklog,
    onGetPage,
    onAddPushModifyData,
    onUpdateBklog
  };
}

export default useBklog;