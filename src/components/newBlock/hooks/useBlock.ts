import { useCallback, useMemo, useReducer, useState } from 'react';
import { testDB } from '../db';
import blockReducer from '../reducer';
import { BlockState, addToStage, StagedBlock, initBlock, SetBlockDataList, setBlockList, addBlock, commitBlock, deleteBlock, changeTextStyle, OrderType, switchBlock, revertBlock } from '../reducer/utils';
import { BlockData, ContentType, RawBlockData } from '../types';

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


  const onCommitBlock = useCallback(() => {
    dispatch(commitBlock(stage));
  }, [dispatch]);

  const onAddBlock = useCallback((
    blockList: BlockData[], 
    targetPosition: string
  ) => {
    dispatch(addBlock(blockList, targetPosition));
  }, [dispatch]);

  const onDeleteBlock = useCallback((removedBlockList: BlockData[]) => {
    dispatch(deleteBlock(removedBlockList));
  }, [dispatch]);

  const onChangeTextStyle = useCallback((
    index: number, 
    styleType: ContentType, 
    startPoint: number,
    endPoint: number,
    order: OrderType
  ) => {
    dispatch(changeTextStyle(index, styleType, startPoint, endPoint, order));
  }, [dispatch]);

  const onSwitchBlock = useCallback((
    changedBlockIdList: string[],
    targetPosition: string,
    container?: boolean
  ) => {
    dispatch(switchBlock(changedBlockIdList, targetPosition, container))
  }, [dispatch]);

  const onRevertBlock = useCallback((back: boolean) => {
    dispatch(revertBlock(back));
  }, [dispatch]);

  return { 
    state,
    initBlock,
    blockLength,
    updateContentsOfStage,
    changeEditedBlockId,
    onCommitBlock,
    onAddBlock,
    onDeleteBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;