import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModifyDataType } from '../components/newBlock/types';
import { RootState } from '../store/modules';
import { addPushModifyData, BklogState, resetBklog } from '../store/modules/bklog/utils';

function useBklog() {
  
  const state:BklogState = useSelector((state: RootState) => state.bklog);
  
  const dispatch = useDispatch();

  const pageInfo = useMemo(() => state.pageInfo, [state.pageInfo]);

  const onResetBklog = useCallback(() => {
    dispatch(resetBklog());
  }, [dispatch]);

  const onAddPushModifyData = useCallback((modifyData: ModifyDataType) => {
    dispatch(addPushModifyData(modifyData));
  }, [dispatch]);

  return { 
    state,
    pageInfo,
    onResetBklog,
    onAddPushModifyData
  };
}

export default useBklog;