import { useCallback, useMemo, useReducer } from 'react';
import { testDB } from '../db';
import blockReducer, {BlockState} from '../reducer';
import { sortBlock } from '../reducer/utils/ordering';
import { BlockData, RawBlockData } from '../types';

interface TypesAcc {
  root: any[],
  children: any
}

const covertArg = (arg: any[]) => {
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
const reducer = (acc: TypesAcc, cur: RawBlockData) => {
  const position = cur.position.split(/-/);
  let length = position.length;

  if(length === 1) {
    acc.root.push(cur);
  } else {
    position.pop();
    const parentPosition = covertArg(position);

    if(!acc.children.hasOwnProperty([parentPosition])) {
      acc.children[parentPosition] = [];
    }

    acc.children[parentPosition].push(cur);
  }

  return acc;
}

const initialState: BlockState = {
  blockList: sortBlock(testDB)
}

function useBlock() {
  
  const [ state, dispatch ] = useReducer(blockReducer, initialState);

  const initBlock: any = useMemo(()=>
    state.blockList.reduce(reducer, { root: [], children: {} }), [state.blockList]);

  return { 
    state,
    initBlock
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;