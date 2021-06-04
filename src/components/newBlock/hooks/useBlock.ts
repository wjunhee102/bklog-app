import { useCallback, useMemo, useReducer } from 'react';
import blockReducer, {BlockState} from '../reducer';
import { BlockData } from '../types';

const initialState: BlockState = {
  blockList: []
}

interface BlockDataTree extends BlockData {
  children: BlockDataTree | null;
}

function createBlockTree(blockList: BlockData[]) {

}

function useBlock() {
  
  const [ state, dispatch ] = useReducer(blockReducer, initialState);


  return { 
    state
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;