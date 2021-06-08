import { useCallback, useMemo, useReducer } from 'react';
import { testDB } from '../db';
import blockReducer from '../reducer';
import { BlockState } from '../reducer/utils';
import { initBlock, orderingBlock, sortBlock } from '../reducer/utils/ordering';
import { BlockData, RawBlockData } from '../types';

const reducer = (acc: any, cur: BlockData) => {
  if(!acc.hasOwnProperty([cur.parentId])) {
    acc[cur.parentId] = []
  } 

  acc[cur.parentId].push(cur);

  return acc;
}

const initialState: BlockState = {
  blockList: initBlock(testDB)
}

function useBlock() {
  
  const [ state, dispatch ] = useReducer(blockReducer, initialState);

  const initBlock: any = useMemo(()=>
    state.blockList.reduce(reducer, {}), [state.blockList]);

  return { 
    state,
    initBlock
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;