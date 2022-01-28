import { BlockData, ModifyData, ModifyPageInfoType } from "../../types";
import actionBlock from "./actions";
import blockUtils from "./blockUtils";
import converter from "./converter";
import orderingBlockUtils from "./ordering";
import reducerUtils from "./reducerUtils";
import sideStoreUtils from "./sideUtils";

export type ActionHandlers<T> = {
  [P: string]: (state: T, action: any) => T;
}

export const TextContentsTypeList = [
  "text",
  "todo",
  "bulleted",
  "numbered"
];

/**
 * block - state
 */
export type OrderType = 'add' | 'del' | 'color' | 'link';

export type EditorStateType = 'isGrab' | 'isHoldingDown' | 'isCliping' | 'isPress';

export type StateAryType = 'blockList' 
  | 'stageBlock'
  | 'stagePage'
  | 'updatedBlockIdList'
  | 'modifyData'
  | 'tempFront'
  | 'tempBack'
  | 'tempClipData'
  | 'clipBoard'
  | 'modifyPageInfo'
  | 'preBlockInfo'
;

export type StateBolType = 'isFetch' | EditorStateType;

export type StateNulType = 'targetPosition'
  | 'titleBlock'
  | 'editingBlockId'
;

export type ClearStateType = StateAryType | StateBolType | StateNulType;

export interface StagedBlock{
  id: string;
  contents: any;
  blockIndex: number;
}

export type StagedPage = ModifyPageInfoType;

// export interface TempData {
//   type: string;
//   data: any;
// }

export interface ChangeEditorStateProps {
  isGrab?: boolean;
  isHoldingDown?: boolean;
  isCliping?: boolean;
}

export interface BlockStateProps {
  blockList?: BlockData[];
  modifyData?: ModifyData[];
}

export interface SetBlockDataList {
  [type: string]: BlockData[];
}

/** 
 * temp Data
*/
export type TempSet = "block" | "comment"; 

export interface TempData<T = any> {
  blockId: string;
  payload: T;
}

export interface TempDataType {
  editingBlockId?: string;
  preBlockInfo?: PreBlockInfo;
  pageInfo?: PageInfo;
  create?: TempData<BlockData>[];
  update?: TempData[];
  delete?: TempData[];
}

export interface ResBlockUtils {
  blockList: BlockData[];
  modifyData: ModifyData[];
  tempData: TempDataType | undefined;
}

export interface PreTextBlockInfo {
  type: "text",
  payload: [string, any];
}

export type PreBlockInfo = PreTextBlockInfo | { type: string, payload: any } | null;

export type PageInfo = {
  title: string | null;
}

export interface ImageBlockSideInfo {
  order: number;
}

export type BlockSideInfo = ImageBlockSideInfo;
export interface BlockSideInfoGroup {
  [P: string]: BlockSideInfo;
}

export interface BlockState {
  isFetch: boolean;
  isGrab: boolean;
  isPress: boolean;
  isHoldingDown: boolean;
  isCliping: boolean;
  targetPosition: string | null;
  pageInfo: PageInfo;
  blockList: BlockData[];
  blockSideInfoGroup: BlockSideInfoGroup | null;
  editingBlockId: string | null;
  preBlockInfo: PreBlockInfo | null;
  stageBlock: StagedBlock[];
  stagePage: StagedPage | null;
  updatedBlockIdList: string[];
  modifyData: ModifyData[];
  modifyPageInfo: ModifyPageInfoType | null;
  tempFront: TempDataType[];
  tempBack: TempDataType[];
  tempClipData: number[];
  clipBoard: BlockData[];
}

export interface BlockStateProps {
  isFetch?: boolean;
  isGrab?: boolean;
  isPress?: boolean;
  isHoldingDown?: boolean;
  isCliping?: boolean;
  targetPosition?: string | null;
  pageInfo?: { title: string | null};
  blockList?: BlockData[];
  blockSideInfoGroup?: BlockSideInfoGroup | null;
  editingBlockId?: string | null;
  preBlockInfo?: PreBlockInfo;
  stageBlock?: StagedBlock[];
  stagePage?: StagedPage | null;
  updatedBlockIdList?: string[];
  modifyData?: ModifyData[];
  modifyPageInfo?: ModifyPageInfoType | null;
  tempFront?: TempDataType[];
  tempBack?: TempDataType[];
  tempClipData?: number[];
  clipBoard?: BlockData[];
}

/**
 * action type
 */
export const INIT_BLOCK_STATE       = 'INIT_BLOCK_STATE' as const;
export const RESET_BLOCK            = 'RESET_BLOCK' as const;
export const CHANGE_EDITING_ID      = 'CHANGE_EDITING_ID' as const;
export const ADD_BLOCK              = 'ADD_BLOCK' as const;
export const ADD_TEXT_BLOCK         = 'ADD_TEXT_BLOCK' as const;
export const ADD_TITLE_BLOCK        = 'ADD_TITLE_BLOCK' as const;
export const EDIT_BLOCK             = 'EDIT_BLOCK' as const;
export const EDIT_TEXT_BLOCK        = 'EDIT_TEXT_BLOCK' as const;
export const COMMIT_TEXT_BLOCK      = 'COMMIT_TEXT_BLOCK' as const;
export const COMMIT_PAGE            = 'COMMIT_PAGE' as const;
export const CHANGE_BLOCK_CONTENTS  = 'CHANGE_BLOCK_CONTENTS' as const;
export const DELETE_BLOCK           = 'DELETE_BLOCK' as const;
export const DELETE_TEXT_BLOCK      = 'DELETE_TEXT_BLOCK' as const;
export const DELETE_TITLE_BLOCK     = 'DELETE_TITLE_BLOCK' as const;
export const UPDATE_BLOCK           = 'UPDATE_BLOCK' as const; // DB에 업데이트할 때
export const SWITCH_BLOCK           = 'SWITCH_BLOCK' as const;
export const REVERT_BLOCK           = 'REVERT_BLOCK' as const;
export const CHANGE_TEXT_STYLE      = 'CHANGE_TEXT_STYLE' as const;
export const SET_CLIPBOARD          = 'SET_CLIPBOARD' as const;
export const SET_TEMPCLIP           = 'SET_TEMPCLIP' as const;
export const CHANGE_EDITOR_STATE    = 'CHANGE_EDITOR_STATE' as const;
export const CHANGE_TARGET_POSITION = 'CHANGE_TARGET_POSITION' as const;
export const EDITOR_STATE_RESET     = 'EDITOR_STATE_RESET' as const;
export const CHANGE_FETCH_STATE     = 'CHANGE_FETCH_STATE' as const;
export const CHANGE_STYLE_TYPE      = 'CHANGE_STYLE_TYPE' as const;
export const CHANGE_BLOCK_TYPE      = 'CHANGE_BLOCK_TYPE' as const;
export const SET_PREBLOCKINFO       = 'SET_PREBLOCKINFO' as const;
export const INIT_PAGE_TITLE        = 'INIT_PAGE_TITLE' as const;
export const EDIT_PAGE_TITLE        = 'EDIT_PAGE_TITLE' as const;
export const CLEAR_STATE_ITEM       = 'CLEAR_STATE_ITEM' as const;
export const EDIT_PAGE_INFO         = 'EDIT_PAGE_INFO' as const;
export const EDIT_BLOCK_SIDE_INFO   = 'EDIT_BLOCK_SIDE_INFO' as const;

export const TEST_CLIPBOARD    = 'TEST_CLIPBOARD' as const;

export type BLOCK_ACTION_TYPES = 
  typeof INIT_BLOCK_STATE
  | typeof RESET_BLOCK 
  | typeof ADD_BLOCK
  | typeof ADD_TEXT_BLOCK
  | typeof ADD_TITLE_BLOCK
  | typeof EDIT_BLOCK
  | typeof EDIT_TEXT_BLOCK
  | typeof COMMIT_TEXT_BLOCK
  | typeof CHANGE_BLOCK_CONTENTS
  | typeof DELETE_BLOCK
  | typeof DELETE_TEXT_BLOCK
  | typeof DELETE_TITLE_BLOCK
  | typeof UPDATE_BLOCK
  | typeof SWITCH_BLOCK
  | typeof REVERT_BLOCK
  | typeof CHANGE_TEXT_STYLE
  | typeof SET_CLIPBOARD
  | typeof SET_CLIPBOARD
  | typeof CHANGE_EDITOR_STATE
  | typeof CHANGE_TARGET_POSITION
  | typeof TEST_CLIPBOARD
  | typeof CHANGE_STYLE_TYPE
  | typeof CHANGE_FETCH_STATE
  | typeof SET_PREBLOCKINFO
  | typeof INIT_PAGE_TITLE 
  | typeof EDIT_PAGE_TITLE
  | typeof CLEAR_STATE_ITEM
  | typeof EDIT_PAGE_INFO
  | typeof COMMIT_PAGE
  | typeof CHANGE_BLOCK_TYPE
  | typeof EDIT_BLOCK_SIDE_INFO
;

/**
 * Actions
 */
export const initBlockState       = actionBlock.initBlockState;
export const resetBlock           = actionBlock.resetBlock;
export const addBlock             = actionBlock.addBlock;
export const addTextBlock         = actionBlock.addTextBlock;
export const addTitleBlock        = actionBlock.addTitleBlock;
export const changeEditingId      = actionBlock.changeEditingId;
export const editBlock            = actionBlock.editBlock;
export const editTextBlock        = actionBlock.editTextBlock;
export const commitTextBlock      = actionBlock.commitTextBlock;
export const commitPage           = actionBlock.commitPage;
export const changeBlockContents  = actionBlock.changeBlockContents;
export const deleteBlock          = actionBlock.deleteBlock;
export const deleteTextBlock      = actionBlock.deleteTextBlock;
export const deleteTitleBlock     = actionBlock.deleteTitleBlock;
export const updateBlock          = actionBlock.updateBlock;
export const changeTextStyle      = actionBlock.changeTextStyle;
export const revertBlock          = actionBlock.revertBlock;
export const switchBlock          = actionBlock.switchBlock;
export const setClipboard         = actionBlock.setClipboard;
export const setTempClip          = actionBlock.setTempClip;
export const changeEditorState    = actionBlock.chageEditorState;
export const changeTargetPosition = actionBlock.changeTargetPosition;
export const resetEditorState     = actionBlock.resetEditorState;
export const changeFetchState     = actionBlock.changeFetchState;
export const changeStyleType      = actionBlock.changeStyleType;
export const changeBlockType      = actionBlock.changeBlockType;
export const setPreBlockInfo      = actionBlock.setPreBlockInfo;
export const initPageTitle        = actionBlock.initPageTitle;
export const editPageTitle        = actionBlock.editPageTitle;
export const clearStateItem       = actionBlock.clearStateItem;
export const editPageInfo         = actionBlock.editPageInfo;
export const editBlockSideInfo    = actionBlock.editBlockSideInfo;

export const testClipAdd     = actionBlock.testClipAdd;

export type BlockActions = ReturnType<typeof initBlockState>
  | ReturnType<typeof resetBlock>
  | ReturnType<typeof addBlock>
  | ReturnType<typeof addTextBlock>
  | ReturnType<typeof addTitleBlock>
  | ReturnType<typeof changeEditingId>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof editTextBlock>
  | ReturnType<typeof commitTextBlock>
  | ReturnType<typeof changeBlockContents>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof deleteTextBlock>
  | ReturnType<typeof deleteTitleBlock>
  | ReturnType<typeof updateBlock>
  | ReturnType<typeof changeTextStyle>
  | ReturnType<typeof revertBlock>
  | ReturnType<typeof switchBlock>
  | ReturnType<typeof setClipboard>
  | ReturnType<typeof setTempClip>
  | ReturnType<typeof changeEditorState>
  | ReturnType<typeof changeTargetPosition>
  | ReturnType<typeof testClipAdd>
  | ReturnType<typeof resetEditorState>
  | ReturnType<typeof changeFetchState>
  | ReturnType<typeof changeStyleType>
  | ReturnType<typeof changeBlockType>
  | ReturnType<typeof setPreBlockInfo>
  | ReturnType<typeof initPageTitle>
  | ReturnType<typeof editPageTitle>
  | ReturnType<typeof clearStateItem>
  | ReturnType<typeof editPageInfo>
  | ReturnType<typeof commitPage>
  | ReturnType<typeof editBlockSideInfo>
;

//reducer
export const createReducer        = reducerUtils.createReducer;
export const createClearStatePart = reducerUtils.createClearStatePart;

//converter
export const addContentsStyle        = converter.addContentsStyle;
export const changeStyleTextContents = converter.changeStyleTextContents;
export const deleteContentsStyle     = converter.deleteContentsStyle;
export const parseHtmlContents       = converter.parseHtmlContents;
export const sliceTextContents       = converter.sliceTextContents;
export const sliceText               = converter.sliceText;
export const mergeTextContents       = converter.mergeTextContents;

// block order utils;
export const sortBlock     = orderingBlockUtils.sortBlock;
export const orderingBlock = orderingBlockUtils.orderingBlock;
export const initBlock     = orderingBlockUtils.initBlock;
export const setBlockList  = orderingBlockUtils.setBlockList;

// block utils
export const copyToNewObjectArray  = blockUtils.copyToNewObjectArray;
export const createRawBlockData    = blockUtils.createRawBlockData;
export const createBlockData       = blockUtils.createBlockData;
export const resetToTargetPosition = blockUtils.resetToTargetPosition;
export const reissueBlockId        = blockUtils.reissueBlockId;
export const updateBlockContents   = blockUtils.updateBlockContents;
export const updateBlockDataProps  = blockUtils.updateBlockDataProps;
export const changeBlockTextStyle  = blockUtils.changeBlockTextStyle;
export const addToStage            = blockUtils.addToStage;
export const addBlockInList        = blockUtils.addBlockInList;
export const removeBlockInList     = blockUtils.removeBlockInList;
export const removeTextBlockInList = blockUtils.removeTextBlockInList;
export const changeBlockPosition   = blockUtils.changeBlockPosition;
export const switchBlockList       = blockUtils.switchBlockList;
export const restoreBlock          = blockUtils.restoreBlock;
export const changeBlockStyleType  = blockUtils.changeBlockStyleType;
export const updateBlockData       = blockUtils.updateBlockData;
export const changeBlockDataType   = blockUtils.changeBlockDataType;

// side utils 
export const tempDataPush               = sideStoreUtils.tempDataPush;
export const getContentsToBeChanged     = sideStoreUtils.getContentsToBeChanged;
export const createTempData             = sideStoreUtils.createTempData;
export const createModifyData           = sideStoreUtils.createModifyData;
export const updateModifyData           = sideStoreUtils.updateModifyData;
export const setCreateModifyDataOfBlock = sideStoreUtils.setCreateModifyDataOfBlock;
export const setUpdateModifyDataOfBlock = sideStoreUtils.setUpdateModifyDataOfBlock;
export const setDeleteModifyDataOfBlock = sideStoreUtils.setDeleteModifyDataOfBlock;
export const convertModifyBlockData     = sideStoreUtils.convertModifyBlockData;
export const replaceModifyBlockData     = sideStoreUtils.replaceModifyBlockData;
export const createPageTitleBlockData   = sideStoreUtils.createPageTitleBlockData;
export const revertBlockState           = sideStoreUtils.revertBlockState;