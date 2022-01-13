import { useCallback, useMemo, useReducer, useRef } from 'react';
import { BlockTypes, ModifyBlockDataType } from '../types';
import blockReducer, { initialBlockState } from '../reducer';
import { 
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
  changeEditorState,
  changeTargetPosition,
  setTempClip,
  resetEditorState,
  changeStyleType,
  changeFetchState,
  initBlockState,
  updateBlock,
  changeBlockContents,
  deleteTextBlock,
  addTextBlock,
  StagedBlock,
  editPageTitle,
  initPageTitle,
  EditorStateType,
  ClearStateType,
  clearStateItem,
  StagedPage,
  editPageInfo,
  commitPage,
  createPageTitleBlockData,
  PreBlockInfo,
  setPreBlockInfo,
  changeBlockType
} from '../reducer/utils';
import { BlockData, ContentType, ModifyData, RawBlockData } from '../types';

interface CursorType {
  start: number;
  end: number;
}

// state 값을 전부 useReducer로 통합할 것.
function useBlock() {

  const cursor = useRef<CursorType>({ start: 0, end: 0 });

  const setCursorStart = useCallback((point: number) => { 
    cursor.current.start = point 
  }, [cursor.current]);

  const setCursorEnd = useCallback((point: number) => { 
    cursor.current.end = point 
  }, [cursor.current]);

  // state
  const [ state, dispatch ] = useReducer(blockReducer, initialBlockState);

  const initBlock: SetBlockDataList | null = useMemo(()=> setBlockList(state.blockList), [state.blockList]);

  const titleBlock: BlockData | null = useMemo(() => state.pageInfo.title? createPageTitleBlockData(state.pageInfo.title) : null, [state.pageInfo.title]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  // dispatch
  const onInitBlockState = useCallback((rawBlockData: RawBlockData[]) => {
    dispatch(initBlockState(rawBlockData));
  }, [dispatch]);

  const onChangeEditorState = useCallback((type: EditorStateType, toggle: boolean) => {
    dispatch(changeEditorState(type, toggle));
  }, [dispatch]);

  const onChangeEditingId = useCallback((nextEditInfo?: string | number) => {
    dispatch(changeEditingId(nextEditInfo));
  }, [dispatch]);

  const onEditBlock = useCallback((blockId: string, blockIndex: number, contents: string) => {
    dispatch(editBlock(blockId, blockIndex, contents));
  }, [dispatch]);

  const onCommitBlock = useCallback(() => {
    dispatch(commitBlock());
  }, [dispatch]);

  const onCommitPage  = useCallback(() => {
    dispatch(commitPage());
  }, [dispatch]);

  const onChangeBlockContents = useCallback((index: number, contents: any) => {
    dispatch(changeBlockContents(index, contents));
  }, [dispatch]);

  const onAddBlock = useCallback((
    blockList: BlockData[], 
    targetPosition: string,
    currentBlockPosition: boolean,
    nextEditInfo?: string | number 
  ) => {
    dispatch(addBlock(blockList, targetPosition, currentBlockPosition, nextEditInfo));
  }, [dispatch]);

  const onAddTextBlock = useCallback((
    index: number,
    innerHTML: string,
    cursorStart: number,
    cursorEnd: number
  ) => {
    dispatch(addTextBlock(index, innerHTML, cursorStart, cursorEnd));
  }, [dispatch])

  const onDeleteBlock = useCallback((
    removedBlockList: BlockData[],
    nextEditInfo?: string | number
  ) => {
    dispatch(deleteBlock(removedBlockList, nextEditInfo));
  }, [dispatch]);

  const onDeleteTextBlock = useCallback((index: number, innerHTML: string, textLength: number) => {
    dispatch(deleteTextBlock(index, innerHTML, textLength));
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

  const onRevertBlock = useCallback((front?: boolean) => {
    dispatch(revertBlock(front));
  }, [dispatch]);

  const onChangeTargetPosition = useCallback((targetPosition?: string) => {
    dispatch(changeTargetPosition(targetPosition));
  }, [dispatch]);

  const onSetTempClip = useCallback((index: number[]) => {
    dispatch(setTempClip(index));
  }, [dispatch]);

  const onResetEditorState = useCallback((isCliping: boolean) => {
    dispatch(resetEditorState(isCliping));
  }, [dispatch]);

  const onChangeStyleType = useCallback((blockInfo: string | number, styleType: string) => {
    dispatch(changeStyleType(blockInfo, styleType));
  }, [dispatch]);

  const onChangeBlockType = useCallback((blockInfo: string | number, type: BlockTypes) => {
    dispatch(changeBlockType(blockInfo, type));
  }, [dispatch]);

  const onChangeFetchState = useCallback((fetchState?: boolean) => {
    dispatch(changeFetchState(fetchState));
  }, [dispatch]);

  const onUpdateBlock = useCallback((modifyData: ModifyBlockDataType) => {
    dispatch(updateBlock(modifyData));
  }, [dispatch]);

  const onSetPreBlockInfo = useCallback((preBlockInfo: PreBlockInfo) => {
    dispatch(setPreBlockInfo(preBlockInfo));
  }, [dispatch]);

  const onInitPageTitle = useCallback((title: string) => {
    dispatch(initPageTitle(title));
  }, [dispatch]);

  const onEditPageTitle = useCallback((title: string) => {
    dispatch(editPageTitle(title));
  }, [dispatch]);

  const onClearStateItem = useCallback((...key: ClearStateType[]) => {
    dispatch(clearStateItem(...key));
  }, [dispatch]);

  const onEditPageInfo = useCallback((stagedPage: StagedPage | null) => {
    dispatch(editPageInfo(stagedPage));
  }, [dispatch]);

  return { 
    cursorStart: cursor.current.start,
    cursorEnd: cursor.current.end,
    setCursorStart,
    setCursorEnd,
    state, 
    initBlock,
    titleBlock,
    onEditBlock,
    blockLength,
    onInitBlockState,
    onChangeEditorState,
    onChangeEditingId,
    onCommitBlock,
    onCommitPage,
    onChangeBlockContents,
    onAddBlock,
    onAddTextBlock,
    onDeleteBlock,
    onDeleteTextBlock,
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock,
    onChangeTargetPosition,
    onSetTempClip,
    onResetEditorState,
    onChangeStyleType,
    onChangeBlockType,
    onChangeFetchState,
    onUpdateBlock,
    onSetPreBlockInfo,
    onInitPageTitle,
    onEditPageTitle,
    onClearStateItem,
    onEditPageInfo
  };
}

export type UseBlockType = ReturnType<typeof useBlock>;

export default useBlock;