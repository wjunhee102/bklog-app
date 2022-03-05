import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { TitleBlock } from '../entities/block/title/TitleBlock';
import { BlockType, UnionBlock, UnionBlockDataProps, UnionRawBlockData } from '../entities/block/type';
import { OrderType, TextContentStyleType } from '../entities/block/type/types/text';
import blockReducer, { initialBlockState } from '../reducer';
import { 
  setBlockList, 
  addBlock, 
  commitTextBlock, 
  deleteBlock, 
  changeTextStyle, 
  switchBlock, 
  revertBlock, 
  editTextBlock, 
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
  editPageTitle,
  initPageTitle,
  EditorStateType,
  ClearStateType,
  clearStateItem,
  editPageInfo,
  commitPage,
  PreBlockInfo,
  setPreBlockInfo,
  changeBlockType,
  addTitleBlock,
  deleteTitleBlock,
  editBlock,
  editBlockSideInfo,
  SetBlockList,
  StagedPageTitle
} from '../reducer/utils';
import { BlockIdMap } from '../service/block/utils';
import { ModifyBlockData } from '../service/modify/type';

interface CursorType {
  start: number;
  end: number;
}

// state 값을 전부 useReducer로 통합할 것.
function useBlock() {

  // ref
  const cursor = useRef<CursorType>({ start: 0, end: 0 });

  const setCursorStart = useCallback((point: number) => { 
    cursor.current.start = point; 
  }, [cursor.current]);

  const setCursorEnd = useCallback((point: number) => { 
    cursor.current.end = point; 
  }, [cursor.current]);

  // state
  const [ currentDropDirection, setDropDirection ] = useState<string | null>(null);

  // store
  const [ state, dispatch ] = useReducer(blockReducer, initialBlockState);

  const initBlock: SetBlockList | null = useMemo(()=> setBlockList(state.blockList), [state.blockList]);

  const titleBlock: TitleBlock | null = useMemo(() => state.pageTitle? new TitleBlock(TitleBlock.createBlockData(state.pageTitle)) : null, [state.pageTitle]);

  const blockLength: number = useMemo(() => state.blockList.length, [state.blockList]);

  // dispatch
  const onInitBlockState = useCallback((rawBlockData: UnionRawBlockData[]) => {
    dispatch(initBlockState(rawBlockData));
  }, [dispatch]);

  const onChangeEditorState = useCallback((type: EditorStateType, toggle: boolean) => {
    dispatch(changeEditorState(type, toggle));
  }, [dispatch]);

  const onChangeEditingId = useCallback((nextEditInfo?: string | number) => {
    dispatch(changeEditingId(nextEditInfo));
  }, [dispatch]);

  const onEditBlock = useCallback((blockInfo: string | number, blockDataProps: UnionBlockDataProps) => {
    dispatch(editBlock(blockInfo, blockDataProps));
  }, [dispatch]);

  const onEditTextBlock = useCallback((blockId: string, blockIndex: number, contents: string) => {
    dispatch(editTextBlock(blockId, blockIndex, contents));
  }, [dispatch]);

  const onCommitTextBlock = useCallback(() => {
    dispatch(commitTextBlock());
  }, [dispatch]);

  const onCommitPage  = useCallback(() => {
    dispatch(commitPage());
  }, [dispatch]);

  const onChangeBlockContents = useCallback((index: number, contents: any) => {
    dispatch(changeBlockContents(index, contents));
  }, [dispatch]);

  const onAddBlock = useCallback((
    blockList: UnionBlock[], 
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
  }, [dispatch]);

  const onAddTitleBlock = useCallback((
    text: string,
    cursorStart: number,
    cursorEnd: number
  ) => {
    dispatch(addTitleBlock(text, cursorStart, cursorEnd));
  }, [dispatch]);

  const onDeleteBlock = useCallback((
    removedBlockList: UnionBlock[],
    nextEditInfo?: string | number
  ) => {
    dispatch(deleteBlock(removedBlockList, nextEditInfo));
  }, [dispatch]);

  const onDeleteTextBlock = useCallback((index: number, innerHTML: string, textLength: number) => {
    dispatch(deleteTextBlock(index, innerHTML, textLength));
  }, [dispatch]);

  const onDeleleTitleBlock = useCallback((innerText: string) => {
    dispatch(deleteTitleBlock(innerText));
  }, [dispatch]);

  const onChangeTextStyle = useCallback((
    index: number, 
    styleType: TextContentStyleType, 
    startPoint: number,
    endPoint: number,
    order: OrderType
  ) => {
    dispatch(changeTextStyle(index, styleType, startPoint, endPoint, order));
  }, [dispatch]);

  const onSwitchBlock = useCallback((
    changedBlockIdMap: BlockIdMap,
    container?: boolean
  ) => {
    dispatch(switchBlock(changedBlockIdMap, container))
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

  const onChangeBlockType = useCallback((blockInfo: string | number, type: BlockType) => {
    dispatch(changeBlockType(blockInfo, type));
  }, [dispatch]);

  const onChangeFetchState = useCallback((fetchState?: boolean) => {
    dispatch(changeFetchState(fetchState));
  }, [dispatch]);

  const onUpdateBlock = useCallback((modifyData: ModifyBlockData) => {
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

  const onEditPageInfo = useCallback((stagedPage: StagedPageTitle | null) => {
    dispatch(editPageInfo(stagedPage));
  }, [dispatch]);

  const onEditBlockSideInfo = useCallback((blockId: string, info?: any) => {
    dispatch(editBlockSideInfo(blockId, info));
  }, [dispatch]);

  return { 
    cursorStart: cursor.current.start,
    cursorEnd: cursor.current.end,
    setCursorStart,
    setCursorEnd,
    currentDropDirection,
    setDropDirection,
    state, 
    initBlock,
    titleBlock,
    blockLength,
    onEditBlock,
    onEditTextBlock,
    onInitBlockState,
    onChangeEditorState,
    onChangeEditingId,
    onCommitTextBlock,
    onCommitPage,
    onChangeBlockContents,
    onAddBlock,
    onAddTextBlock,
    onAddTitleBlock,
    onDeleteBlock,
    onDeleteTextBlock,
    onDeleleTitleBlock,
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
    onEditPageInfo,
    onEditBlockSideInfo
  }
}

export type UseBlockType = ReturnType<typeof useBlock>;

export default useBlock;