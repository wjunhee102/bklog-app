import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import {
  addBlock, 
  editAble,
  editBlock,
  commitBlock,
  deleteBlock,
  BklogState
} from '../store/modules/bklog';

import {
  UUID,
  BlockData
} from '../types/bklog';

function useBklog() {
  
  const state:BklogState = useSelector((state: RootState) => state.bklog);

  const initBlock: BlockData[] = useMemo(()=> 
    state.blocks.filter(block => block.parentId === null), [state.blocks]);

  const getEditAbleId = useMemo(() => state.editingId, [state.editingId]);

  const getStagedBlocks = state.stage;

  const getChilrenBlock = (blockId: UUID):BlockData[] => 
    state.blocks.filter(block => block.parentId === blockId); 

  const getBlockState = (blockId: UUID): BlockData  => 
    state.blocks.filter(blockState => blockState.id === blockId)[0];
  
  const getStagedBlock = (blockId: UUID) =>
    state.stage.filter(statedBlock => statedBlock.id === blockId)[0];
  
  const dispatch = useDispatch();

  // Block 추가
  const onAddBlock = useCallback((preId?: UUID, type?: string) => 
      dispatch(addBlock(preId, type))
    , [dispatch]);

  // edit중인 block focus
  const onEditAble = useCallback((blockId: UUID) =>
      dispatch(editAble(blockId))
    ,[dispatch]);

  const onEditBlock = useCallback((blockId: UUID, content: string) =>
      dispatch(editBlock({blockId, text: content}))
    ,[dispatch]);

  const onCommitBlock = useCallback(()=>
      dispatch(commitBlock())
    ,[dispatch]);

  const onDeleteBlock = useCallback((blockId: UUID) =>
      dispatch(deleteBlock(blockId))
    , [dispatch]);

  return { 
    state, 
    initBlock,
    getChilrenBlock,
    getBlockState,
    getStagedBlocks,
    getStagedBlock,
    getEditAbleId, 
    onAddBlock, 
    onEditAble, 
    onEditBlock, 
    onCommitBlock, 
    onDeleteBlock
  };
}

export default useBklog;