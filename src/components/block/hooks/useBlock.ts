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
  revertBlock,
  initialState,
  setClipboard,
  clearClipboard,
  setTempClip,
  clearTempClip,
  addBlockList,
  testClipAdd
} from '../reducer/utils';
import { BlockState, OrderType } from '../reducer/utils';
import orderingBlock from '../reducer/utils/ordering';
import {
  UUID,
  ContentType,
  BlockData
} from '../types';

/**
 * 임시
 */
import { page } from '../../../data/db.json';
//

export const initialState2: BlockState = (() => {
  return {
    blocks: orderingBlock(page.blocks),
    editingId: null,
    stage: [],
    rightToEdit: true,
    tempBack: [],
    tempFront: [],
    tempClip: [],
    clipboard: [],
    test: null
  };
})();

function useBlock() {
  
  const [ state, dispatch ] = useReducer(blockState, initialState2);

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

  const getTempClip = state.tempClip;

  const getClipboard = state.clipboard;

  const getTest = state.test;

  const getBlocksContents = (): any[] => state
    .tempClip
    .sort((a, b) => a - b)
    .map((idx) => state.blocks[idx - 1].type === "text"? state.blocks[idx - 1].property.contents : null)
    .filter((content) => content !== null);


  // Block 추가
  const onAddBlock = useCallback((
      blockId?: UUID, 
      type?: string, 
      blockData?: BlockData<any>
    ) => dispatch(addBlock(blockId, type, blockData)), [dispatch]);

  const onAddBlockList = useCallback((preBlockId: string, blockList: BlockData[]) => 
    dispatch(addBlockList(preBlockId, blockList)), [dispatch]);

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

  const onRevertBlock = useCallback(() => 
    dispatch(revertBlock()), [dispatch]);

  const onSetTempClip = useCallback((index: number) => 
    dispatch(setTempClip(index)), [dispatch]);

  const onClearTempClip = useCallback(() => 
    dispatch(clearTempClip()), [dispatch]);

  const onSetClipboard = useCallback(() => 
    dispatch(setClipboard()), [dispatch]);

  const onClearClipboard = useCallback(() => 
    dispatch(clearClipboard()), [dispatch]);

  const onTestClipAdd = useCallback((dom: any) => 
    dispatch(testClipAdd(dom)), [dispatch]);

  return { 
    state, 
    initBlock,
    getRightToEdit,
    getChilrenBlock,
    getBlockState,
    getStagedBlocks,
    getStagedBlock,
    getEditAbleId, 
    getTempClip,
    getClipboard,
    getBlocksContents,
    onAddBlock,
    onAddBlockList,
    onEditAble, 
    onEditBlock, 
    onCommitBlock, 
    onDeleteBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock,
    onSetTempClip,
    onClearTempClip,
    onSetClipboard,
    onClearClipboard,
    onTestClipAdd,
    getTest
  };
}

export type UseBlockTypes = ReturnType<typeof useBlock>;

export default useBlock;