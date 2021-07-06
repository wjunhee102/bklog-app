import { useCallback, useMemo, useReducer } from 'react';
import { ModifyBlockData, ModifyDataType } from '../types';
import { testDB } from '../db';
import blockReducer, { initialBlockState } from '../reducer';
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
  changeEditorState,
  changeTargetPosition,
  setTempClip,
  clearClipboard,
  resetEditorState,
  changeBlockStyleType,
  changeStyleType,
  changeFetchState,
  clearModifyData,
  initBlockState,
  updateBlock
} from '../reducer/utils';
import { BlockData, ContentType, ModifyData, RawBlockData } from '../types';

// state 값을 전부 useReducer로 통합할 것.
function useBlock() {
  const [ state, dispatch ] = useReducer(blockReducer, initialBlockState);

  // state
  const initBlock: SetBlockDataList | null = useMemo(()=>
    setBlockList(state.blockList), [state.blockList]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  const editingBlockId: string | null = useMemo(() => state.editingBlockId, [state.editingBlockId]);

  const isGrab: boolean = useMemo(() => state.isGrab, [state.isGrab]);

  const isCliping: boolean = useMemo(() => state.isCliping, [state.isCliping]);
  
  const isHoldingDown: boolean = useMemo(() => state.isHoldingDown, [state.isHoldingDown]);

  const isFetch: boolean = useMemo(() => state.isFetch, [state.isFetch]);

  const tempClipData: number[] = useMemo(() => state.tempClipData, [state.tempClipData]);

  const targetPosition: string | null = useMemo(() => state.targetPosition, [state.targetPosition]);

  const modifyData: ModifyData[] = useMemo(() => state.modifyData, [state.modifyData]);

  // dispatch
  const onInitBlockState = useCallback((rawBlockData: RawBlockData[]) => {
    dispatch(initBlockState(rawBlockData));
  }, [dispatch]);

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
    container?: boolean
  ) => {
    dispatch(switchBlock(changedBlockIdList, container))
  }, [dispatch]);

  const onRevertBlock = useCallback((back: boolean) => {
    dispatch(revertBlock(back));
  }, [dispatch]);

  const onChangeTargetPosition = useCallback((targetPosition?: string) => {
    dispatch(changeTargetPosition(targetPosition));
  }, [dispatch]);

  const onSetTempClip = useCallback((index: number[]) => {
    dispatch(setTempClip(index));
  }, [dispatch]);

  const onClearTempClip = useCallback(() => {
    dispatch(clearClipboard());
  }, [dispatch]);

  const onResetEditorState = useCallback((isCliping: boolean) => {
    dispatch(resetEditorState(isCliping));
  }, [dispatch]);

  const onChangeStyleType = useCallback((blockInfo: string | number, styleType: string) => {
    dispatch(changeStyleType(blockInfo, styleType));
  }, [dispatch]);

  const onChangeFetchState = useCallback((fetchState?: boolean) => {
    dispatch(changeFetchState(fetchState));
  }, [dispatch]);

  const onClearModifyData = useCallback(() => {
    dispatch(clearModifyData());
  }, [dispatch]);

  const onUpdateBlock = useCallback((modifyData: ModifyDataType) => {
    dispatch(updateBlock(modifyData));
  }, [dispatch]);

  return { 
    state, 
    editingBlockId,
    isGrab,
    isHoldingDown,
    isCliping,
    isFetch,
    tempClipData,
    targetPosition,
    modifyData,
    onEditBlock,
    initBlock,
    blockLength,
    onInitBlockState,
    onChangeEditorState,
    onChangeEditingId,
    onCommitBlock,
    onAddBlock,
    onDeleteBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock,
    onChangeTargetPosition,
    onSetTempClip,
    onClearTempClip,
    onResetEditorState,
    onChangeStyleType,
    onChangeFetchState,
    onClearModifyData,
    onUpdateBlock
  };
}

export type UseBlockType = ReturnType<typeof useBlock>;

export default useBlock;