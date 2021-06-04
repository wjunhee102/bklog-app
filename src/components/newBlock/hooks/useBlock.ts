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

  const initBlock: BlockData[] = useMemo(()=>
    state.blockList.filter(block => block.position.length === 1), [state.blockList]);

  const getChildrenBlock = ( position: string ): BlockData[] =>
    state.blockList.filter(block => block.position.slice(0, -2) === position);

  return { 
    state
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;