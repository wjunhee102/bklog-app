import { useCallback, useMemo, useReducer, useState } from 'react';
import { testDB } from '../db';
import blockReducer from '../reducer';
import { BlockState, addToStage, StagedBlock, initBlock, SetBlockDataList, setBlockList, addBlock, commitBlock, deleteBlock, changeTextStyle, OrderType, switchBlock, revertBlock, editBlock, changeEditingId } from '../reducer/utils';
import { BlockData, ContentType, RawBlockData } from '../types';

const initialState: BlockState = {
  blockList: initBlock(testDB).blockList,
  editingBlockId: null,
  stage: [],
  modifyData: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}

function useBlock() {
  const [ mouseDownOn, setMouseDown ]    = useState<boolean>(false);
  const [ clipDataOn, setClipData ]      = useState<boolean>(false);
  const [ gripOn, setGrip ]              = useState<boolean>(false);
  const [ deleting, setDeleting ]        = useState<boolean>(false);

  const [ state, dispatch ] = useReducer(blockReducer, initialState);

  // state
  const initBlock: SetBlockDataList = useMemo(()=>
    setBlockList(state.blockList), [state.blockList]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  const editingBlockId: string | null = useMemo(() => state.editingBlockId, [state.editingBlockId]);

  // dispatch
  const onChangeEditingId = useCallback((index: number, blockId?: string) => {
    dispatch(changeEditingId(index, blockId));
  }, [dispatch]);

  const onEditBlock = useCallback((blockId: string, blockIndex: number, contents: string) => {
    dispatch(editBlock(blockId, blockIndex, contents));
  }, [dispatch]);

  const onCommitBlock = useCallback(() => {
    dispatch(commitBlock());
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

  const handleKeyUp = () => {
    setDeleting(false);
  }

  return { 
    state, 
    editingBlockId,
    clipDataOn,
    mouseDownOn,
    gripOn,
    deleting,
    setDeleting,
    onEditBlock,
    initBlock,
    blockLength,
    onChangeEditingId,
    onCommitBlock,
    onAddBlock,
    onDeleteBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock,
    handleKeyUp
  };
}

export type UseBlockType = ReturnType<typeof useBlock>;

export default useBlock;