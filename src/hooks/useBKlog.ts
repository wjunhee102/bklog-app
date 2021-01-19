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

  const initBlock: BlockData<any>[] = useMemo(()=> 
    state.blocks.filter(block => block.parentId === null), [state.blocks]);

  const getEditAbleId = useMemo(() => state.editingId, [state.editingId]);

  const getStagedBlocks = state.stage;

  const getChilrenBlock = (blockId: UUID):BlockData<any>[] => 
    state.blocks.filter(block => block.parentId === blockId); 

  const getBlockState = (blockId: UUID): BlockData<any>  => 
    state.blocks.filter(blockState => blockState.id === blockId)[0];
  
  const getStagedBlock = (blockId: UUID) =>
    state.stage.filter(statedBlock => statedBlock.id === blockId)[0];

  const getRigthToEdit = useMemo(() => state.rightToEdit,[]);
  
  const dispatch = useDispatch();

  // Block 추가
  const onAddBlock = useCallback((blockIndex?: number, type?: string) => 
      dispatch(addBlock(blockIndex, type))
    , [dispatch]);

  // edit중인 block focus
  const onEditAble = useCallback((blockId: UUID | null, index?:number) =>
      dispatch(editAble(blockId, index))
    ,[dispatch]);

  const onEditBlock = useCallback((blockId: UUID, blockIndex: number,content: string) =>
      dispatch(editBlock({blockId, blockIndex, text: content}))
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
    getRigthToEdit,
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