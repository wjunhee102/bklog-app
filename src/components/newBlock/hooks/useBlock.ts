import { useCallback, useMemo, useReducer } from 'react';
import { testDB } from '../db';
import blockReducer, {BlockState} from '../reducer';
import { initBlock, orderingBlock, sortBlock } from '../reducer/utils/ordering';
import { BlockData, RawBlockData } from '../types';

interface TypesAcc {
  root: any[],
  children: any
}

const convertArg = (arg: any[]) => {
  return arg.reduce((acc, cur) =>  !acc? `${cur}` : `${acc}-${cur}`);
}

/**
 * accutator type;
  {
    root: [],
    children: [
      {
        "1": [],
        "2": []
      },
      {
        "10": []
      }
    ]
  }

*/
const reducer2 = (acc: TypesAcc, cur: RawBlockData) => {
  const position = cur.position.split(/-/);
  let length = position.length;

  if(length === 1) {
    acc.root.push(cur);
  } else {
    position.pop();
    const parentPosition = convertArg(position);

    if(!acc.children.hasOwnProperty([parentPosition])) {
      acc.children[parentPosition] = [];
    }

    acc.children[parentPosition].push(cur);
  }

  return acc;
}

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