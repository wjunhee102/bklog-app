import { useCallback, useMemo, useReducer, useState } from 'react';
import { testDB } from '../db';
import blockReducer from '../reducer';
import { BlockState, addToStage, StagedBlock, initBlock, SetBlockDataList, setBlockList, addBlock, commitBlock } from '../reducer/utils';
import { BlockData, RawBlockData } from '../types';

const initialState: BlockState = {
  blockList: initBlock(testDB).blockList,
  modifyData: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}

function useBlock() {
  const [ editedBlockId, setEditedId ] = useState<string | null>(null);
  const [ stage, setStage ]            = useState<StagedBlock[]>([]);

  const [ state, dispatch ] = useReducer(blockReducer, initialState);

  const initBlock: SetBlockDataList = useMemo(()=>
    setBlockList(state.blockList), [state.blockList]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  const updateContentsOfStage = useCallback((blockId: string, blockIndex: number, contents: string) => {
    setStage(addToStage(stage, blockId, blockIndex, contents));
  }, [stage]);

  const changeEditedBlockId = (index: number, blockId?: string) => {
    if(blockId) {
      setEditedId(blockId);
    } else {
      if(index >= blockLength - 1) {
        setEditedId(null);
      } else {
        setEditedId(state.blockList[index].id);
      }
    }
  }

  const onAddBlock = useCallback((blockList: BlockData[], targetPosition: string, index: number) => {
    dispatch(addBlock(blockList, targetPosition, index));
  },[dispatch]);

  const onCommitBlock = useCallback(() => {
    dispatch(commitBlock(stage));
  },[dispatch]);

  return { 
    state,
    initBlock,
    blockLength,
    updateContentsOfStage,
    changeEditedBlockId,
    onAddBlock,
    onCommitBlock
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;