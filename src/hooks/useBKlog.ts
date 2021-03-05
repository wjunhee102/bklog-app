import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import {
  addBlock, 
  editAble,
  editBlock,
  commitBlock,
  deleteBlock,
  changeTextStyle,
  switchBlock,
  revertBlock
} from '../store/modules/bklog';
import { BklogState, OrderType } from '../store/modules/bklog/utils';
import {
  UUID,
  ContentType,
  BlockData
} from '../types/bklog';

function useBklog() {
  
  const state:BklogState = useSelector((state: RootState) => state.bklog);


  // 이거가 메로리가 2중으로드는 거 같음... 아닌가? referance를 가지고 있으니까 상관없나.
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