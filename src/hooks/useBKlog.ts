import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import { BklogState } from '../store/modules/bklog/utils';
import {
  UUID,
  ContentType,
  BlockData
} from '../types/bklog';

function useBklog() {
  
  const state:BklogState = useSelector((state: RootState) => state.bklog);
  
  const dispatch = useDispatch();

  return { 
    state
  };
}

export default useBklog;