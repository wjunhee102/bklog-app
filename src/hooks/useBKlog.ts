import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import {
  addBlock, 
  editAble,
  editBlock,
  commitBlock,
  deleteBlock,
  changeTextStyle
} from '../store/modules/bklog';
import { BklogState, OrderType } from '../store/modules/bklog/utils';
import {
  UUID,
  ContentType,
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
  const onAddBlock = useCallback((
      blockId?: UUID, 
      type?: string, 
      blockData?: BlockData<any>
    ) => dispatch(addBlock(blockId, type, blockData)), [dispatch]);

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

  const onChangeTextStyle = useCallback((
    index: number, 
    style: ContentType,
    startPoint: number,
    endPoint: number,
    order: OrderType
    ) => 
      dispatch(changeTextStyle(index, style, startPoint, endPoint, order))
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
    onDeleteBlock,
    onChangeTextStyle
  };
}

export default useBklog;