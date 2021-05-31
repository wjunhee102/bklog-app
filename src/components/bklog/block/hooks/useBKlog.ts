import { useCallback, useMemo, useReducer } from 'react';
import blockState from '../reducer';
import {
  addBlock, 
  editAble,
  editBlock,
  commitBlock,
  deleteBlock,
  changeTextStyle,
  switchBlock,
  revertBlock
} from '../reducer/utils';
import { BlockState, OrderType } from '../reducer/utils';
import orderingBlock from '../reducer/utils/ordering';
import {
  UUID,
  ContentType,
  BlockData
} from '../types';

import { page } from '../../../../data/db.json';

const initialState:BlockState = (() => {
  return {
    blocks: orderingBlock(page.blocks),
    editingId: null,
    stage: [],
    rightToEdit: true,
    tempBack: [],
    tempFront: []
  };
})();

function useBklog() {
  
  const [ state, dispatch ] = useReducer(blockState, initialState);

  // 이거가 메모리가 2중으로드는 거 같음... 아닌가? referance 값으로 가지고 있으니까 상관없나?
  const initBlock: BlockData<any>[] = useMemo(()=> 
    state.blocks.filter(block => block.parentBlockId === null ), [state.blocks]);

  // 사파리 커밋 문제를 이걸로 해결하려고 함
  const getEditAbleId = useMemo(() => state.editingId, [state.editingId]);

  const getStagedBlocks = state.stage;

  const getChilrenBlock = (blockId: UUID):BlockData<any>[] => 
    state.blocks.filter(block => block.parentBlockId === blockId); 

  const getBlockState = (blockId: UUID): BlockData<any>  => 
    state.blocks.filter(blockState => blockState.id === blockId)[0];
  
  const getStagedBlock = (blockId: UUID) =>
    state.stage.filter(statedBlock => statedBlock.id === blockId)[0];

  const getRightToEdit = useMemo(() => state.rightToEdit,[]);

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


  // 이거를 각 블럭마다 state값으로 하려고 함.
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
  
  const onSwitchBlock = useCallback((blockId: UUID, preBlockId: UUID, parentType: boolean) => 
    dispatch(switchBlock(blockId, preBlockId, parentType)), [dispatch]);

  const onRevertBlock = useCallback(()=> 
    dispatch(revertBlock()), [dispatch]);

  return { 
    state, 
    initBlock,
    getRightToEdit,
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
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock
  };
}

export default useBklog;