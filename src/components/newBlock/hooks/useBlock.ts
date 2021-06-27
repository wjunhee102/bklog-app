import { useCallback, useMemo, useReducer, useState } from 'react';
import { testDB } from '../db';
import blockReducer from '../reducer';
import { 
  BlockState, 
  initBlock, 
  SetBlockDataList, 
  setBlockList, 
  addBlock, 
  commitBlock, 
  deleteBlock, 
  changeTextStyle, 
  OrderType, 
  switchBlock, 
  revertBlock, 
  editBlock, 
  changeEditingId,
  ChangeEditorStateProps,
  changeEditorState
} from '../reducer/utils';
import { BlockData, ContentType } from '../types';

const initialState: BlockState = {
  graping: false,
  pressing: false,
  cliping: false,
  blockList: initBlock(testDB).blockList,
  editingBlockId: null,
  stage: [],
  modifyData: [],
  tempBack: [],
  tempFront: [],
  tempClipData: [],
  clipBoard: []
}


// state 값을 전부 useReducer로 통합할 것.
function useBlock() {
  const [ state, dispatch ] = useReducer(blockReducer, initialState);

  // state
  const initBlock: SetBlockDataList = useMemo(()=>
    setBlockList(state.blockList), [state.blockList]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  const editingBlockId: string | null = useMemo(() => state.editingBlockId, [state.editingBlockId]);

  const graping: boolean = useMemo(() => state.graping, [state.graping]);

  const cliping: boolean = useMemo(() => state.cliping, [state.cliping]);
  
  const pressing: boolean = useMemo(() => state.pressing, [state.pressing]);

  // dispatch
  const onChangeEditorState = useCallback((payload: ChangeEditorStateProps) => {
    dispatch(changeEditorState(payload));
  }, [dispatch]);

  const onChangeEditingId = useCallback((nextEditInfo) => {
    dispatch(changeEditingId(nextEditInfo));
  }, [dispatch]);

  const onEditBlock = useCallback((blockId: string, blockIndex: number, contents: string) => {
    dispatch(editBlock(blockId, blockIndex, contents));
  }, [dispatch]);

  const onCommitBlock = useCallback(() => {
    dispatch(commitBlock());
  }, [dispatch]);

  const onAddBlock = useCallback((
    blockList: BlockData[], 
    targetPosition: string,
    nextEditInfo?: string | number
  ) => {
    dispatch(addBlock(blockList, targetPosition, nextEditInfo));
  }, [dispatch]);

  const onDeleteBlock = useCallback((
    removedBlockList: BlockData[],
    nextEditInfo?: string | number
  ) => {
    dispatch(deleteBlock(removedBlockList, nextEditInfo));
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
    editingBlockId,
    graping,
    pressing,
    cliping,
    onEditBlock,
    initBlock,
    blockLength,
    onChangeEditorState,
    onChangeEditingId,
    onCommitBlock,
    onAddBlock,
    onDeleteBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock
  };
}

export type UseBlockType = ReturnType<typeof useBlock>;

export default useBlock;