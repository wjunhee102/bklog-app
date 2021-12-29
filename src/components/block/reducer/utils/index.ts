import { BlockData, ModifyData } from "../../types";
import actionBlock from "./actions";
import blockUtils from "./blockUtils";
import converter from "./converter";
import orderingBlockUtils from "./ordering";
import sideStoreUtils from "./sideUtils";

/**
 * block - state
 */
export type OrderType = 'add' | 'del' | 'color' | 'link';

export type EditorStateType = 'isGrab' | 'isHoldingDown' | 'isCliping' | 'isPress';

export type StateAryType = 'blockList' 
  | 'stage'
  | 'updatedBlockIdList'
  | 'modifyData'
  | 'tempFront'
  | 'tempBack'
  | 'tempClipData'
  | 'clipBoard'
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
  nextBlockInfo?: NextBlockInfo;
  pageTitle?: string;
  create?: TempData<BlockData>[];
  update?: TempData[];
  delete?: TempData[];
}

export interface ResBlockUtils {
  blockList: BlockData[];
  modifyData: ModifyData[];
  tempData: TempDataType;
}

export interface NextTextBlockInfo {
  type: "text",
  payload: [string, any];
}

export type NextBlockInfo = NextTextBlockInfo | { type: string, payload: any } | null;

export interface BlockState {
  isFetch: boolean;
  isGrab: boolean;
  isPress: boolean;
  isHoldingDown: boolean;
  isCliping: boolean;
  targetPosition: string | null;
  titleBlock: BlockData;
  blockList: BlockData[];
  editingBlockId: string | null;
  nextBlockInfo: NextBlockInfo;
  stage: StagedBlock[];
  updatedBlockIdList: string[];
  modifyData: ModifyData[];
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
  titleBlock?: BlockData | null;
  blockList?: BlockData[];
  editingBlockId?: string | null;
  nextBlockInfo?: NextBlockInfo;
  stage?: StagedBlock[];
  updatedBlockIdList?: string[];
  modifyData?: ModifyData[];
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
export const EDIT_BLOCK             = 'EDIT_BLOCK' as const;
export const COMMIT_BLOCK           = 'COMMIT_BLOCK' as const;
export const CHANGE_BLOCK_CONTENTS  = 'CHANGE_BLOCK_CONTENTS' as const;
export const DELETE_BLOCK           = 'DELETE_BLOCK' as const;
export const DELETE_TEXT_BLOCK      = 'DELETE_TEXT_BLOCK' as const;
export const UPDATE_BLOCK           = 'UPDATE_BLOCK' as const; // DB에 업데이트할 때
export const SWITCH_BLOCK           = 'SWITCH_BLOCK' as const;
export const REVERT_BLOCK           = 'REVERT_BLOCK' as const;
export const CHANGE_TEXT_STYLE      = 'CHANGE_TEXT_STYLE' as const;
export const SET_CLIPBOARD          = 'SET_CLIPBOARD' as const;
export const CLEAR_CLIPBOARD        = 'CLEAR_CLIPBOARD' as const;
export const SET_TEMPCLIP           = 'SET_TEMPCLIP' as const;
export const CLEAR_TEMPCLIP         = 'CLEAR_TEMPCLIP' as const;
export const CHANGE_EDITOR_STATE    = 'CHANGE_EDITOR_STATE' as const;
export const CHANGE_TARGET_POSITION = 'CHANGE_TARGET_POSITION' as const;
export const EDITOR_STATE_RESET     = 'EDITOR_STATE_RESET' as const;
export const CHANGE_FETCH_STATE     = 'CHANGE_FETCH_STATE' as const;
export const CHANGE_STYLE_TYPE      = 'CHANGE_STYLE_TYPE' as const;
export const CLEAR_MODIFYDATA       = 'CLEAR_MODIFYDATA' as const;
export const CLEAR_NEXTBLOCKINFO    = 'CLEAR_NEXTBLOCKINFO' as const;
export const SET_NEXTBLOCKINFO      = 'CLEAR_NEXTBLOCKINFO' as const;
export const INIT_PAGE_TITLE        = 'INIT_PAGE_TITLE' as const;
export const EDIT_PAGE_TITLE        = 'EDIT_PAGE_TITLE' as const;
export const CLEAR_STATE_ITEM       = 'CLEAR_STATE_ITEM' as const;

export const TEST_CLIPBOARD    = 'TEST_CLIPBOARD' as const;

export type BLOCK_ACTION_TYPES = 
  typeof INIT_BLOCK_STATE
  | typeof RESET_BLOCK 
  | typeof ADD_BLOCK
  | typeof ADD_TEXT_BLOCK
  | typeof EDIT_BLOCK
  | typeof COMMIT_BLOCK
  | typeof CHANGE_BLOCK_CONTENTS
  | typeof DELETE_BLOCK
  | typeof DELETE_TEXT_BLOCK
  | typeof UPDATE_BLOCK
  | typeof SWITCH_BLOCK
  | typeof REVERT_BLOCK
  | typeof CHANGE_TEXT_STYLE
  | typeof SET_CLIPBOARD
  | typeof CLEAR_CLIPBOARD
  | typeof SET_CLIPBOARD
  | typeof CLEAR_TEMPCLIP
  | typeof CHANGE_EDITOR_STATE
  | typeof CHANGE_TARGET_POSITION
  | typeof TEST_CLIPBOARD
  | typeof CHANGE_STYLE_TYPE
  | typeof CHANGE_FETCH_STATE
  | typeof CLEAR_MODIFYDATA
  | typeof SET_NEXTBLOCKINFO
  | typeof CLEAR_NEXTBLOCKINFO
  | typeof SET_NEXTBLOCKINFO 
  | typeof INIT_PAGE_TITLE 
  | typeof EDIT_PAGE_TITLE
  | typeof CLEAR_STATE_ITEM
;

/**
 * Actions
 */
export const initBlockState       = actionBlock.initBlockState;
export const resetBlock           = actionBlock.resetBlock;
export const addBlock             = actionBlock.addBlock;
export const addTextBlock         = actionBlock.addTextBlock;
export const changeEditingId      = actionBlock.changeEditingId;
export const editBlock            = actionBlock.editBlock;
export const commitBlock          = actionBlock.commitBlock;
export const changeBlockContents  = actionBlock.changeBlockContents;
export const deleteBlock          = actionBlock.deleteBlock;
export const deleteTextBlock      = actionBlock.deleteTextBlock;
export const updateBlock          = actionBlock.updateBlock;
export const changeTextStyle      = actionBlock.changeTextStyle;
export const revertBlock          = actionBlock.revertBlock;
export const switchBlock          = actionBlock.switchBlock;
export const setClipboard         = actionBlock.setClipboard;
export const clearClipboard       = actionBlock.clearClipboard;
export const setTempClip          = actionBlock.setTempClip;
export const clearTempClip        = actionBlock.clearTempClip;
export const changeEditorState    = actionBlock.chageEditorState;
export const changeTargetPosition = actionBlock.changeTargetPosition;
export const resetEditorState     = actionBlock.resetEditorState;
export const changeFetchState     = actionBlock.changeFetchState;
export const changeStyleType      = actionBlock.changeStyleType;
export const clearModifyData      = actionBlock.clearModifyData;
export const clearNextBlockInfo   = actionBlock.clearNextBlockInfo;
export const setNextBlockInfo     = actionBlock.setNextBlockInfo;
export const initPageTitle        = actionBlock.initPageTitle;
export const editPageTitle        = actionBlock.editPageTitle;
export const clearStateItem       = actionBlock.clearStateItem;

export const testClipAdd     = actionBlock.testClipAdd;

export type BlockActions = ReturnType<typeof initBlockState>
  | ReturnType<typeof resetBlock>
  | ReturnType<typeof addBlock>
  | ReturnType<typeof addTextBlock>
  | ReturnType<typeof changeEditingId>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof changeBlockContents>
  | ReturnType<typeof deleteBlock>
  | ReturnType<typeof deleteTextBlock>
  | ReturnType<typeof updateBlock>
  | ReturnType<typeof changeTextStyle>
  | ReturnType<typeof revertBlock>
  | ReturnType<typeof switchBlock>
  | ReturnType<typeof setClipboard>
  | ReturnType<typeof clearClipboard>
  | ReturnType<typeof setTempClip>
  | ReturnType<typeof clearTempClip>
  | ReturnType<typeof changeEditorState>
  | ReturnType<typeof changeTargetPosition>
  | ReturnType<typeof testClipAdd>
  | ReturnType<typeof resetEditorState>
  | ReturnType<typeof changeFetchState>
  | ReturnType<typeof changeStyleType>
  | ReturnType<typeof clearModifyData>
  | ReturnType<typeof clearNextBlockInfo>
  | ReturnType<typeof setNextBlockInfo>
  | ReturnType<typeof initPageTitle>
  | ReturnType<typeof editPageTitle>
  | ReturnType<typeof clearStateItem>
;

//converter
export const addContentsStyle        = converter.addContentsStyle;
export const changeStyleTextContents = converter.changeStyleTextContents;
export const deleteContentsStyle     = converter.deleteContentsStyle;
export const parseHtmlContents       = converter.parseHtmlContents;
export const sliceTextContents       = converter.sliceTextContents;
export const mergeTextContents       = converter.mergeTextContents;

// block order utils;
export const sortBlock     = orderingBlockUtils.sortBlock;
export const orderingBlock = orderingBlockUtils.orderingBlock;
export const initBlock     = orderingBlockUtils.initBlock;
export const setBlockList  = orderingBlockUtils.setBlockList;

// block utils
export const copyToNewObjectArray  = blockUtils.copyToNewObjectArray;
export const createBlockData       = blockUtils.createBlockData;
export const resetToTargetPosition = blockUtils.resetToTargetPosition;
export const reissueBlockId        = blockUtils.reissueBlockId;
export const updateBlockContents   = blockUtils.updateBlockContents;
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