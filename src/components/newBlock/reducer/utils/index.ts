import { BlockData, RawBlockData } from "../../types";
import actionBlock from "./actionTypes";
import blockUtils from "./blockUtils";
import converter from "./converter";
import orderingBlockUtils from "./ordering";
import sideStoreUtils from "./sideUtils";

/**
 * block - state
 */
export type OrderType = "add" | "del" | "color" | "link";

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
  graping?: boolean;
  holdingDown?: boolean;
  cliping?: boolean;
}

export interface BlockStateProps {
  blockList?: BlockData[];
  modifyData?: ModifyData[];
}

export type SetBlockDataList = {
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
  create?: TempData<BlockData>[];
  update?: TempData[];
  delete?: TempData[];
}

/**
 * Modify Data
 */
export type ModifyCommand = "update" | "create" | "delete";
export type ModifySet = "block" | "comment"; 

export interface ParamModifyBlock {
  blockId: string;
  set: ModifySet;
  payload: any;
}

export interface ParamCreateBlock {
  blockId: string;
  set: "block";
  payload: RawBlockData;
}

export interface ParamCreateComment {
  blockId: string;
  set: "comment";
  payload: any;
}

export type ParamCreateModifyBlock = ParamCreateBlock | ParamCreateComment;

export class ParamDeleteModity {
  blockIdList?: string[];
  commentIdList?: string[];
}

export interface ModifyBlockType {
  create?: ParamCreateModifyBlock[];
  update?: ParamModifyBlock[];
  delete?: ParamDeleteModity;
}

export interface ModifyBlockData<T = any, P = any> {
  position?: string;
  id?: string;
  type?: string;
  styleType?: string;
  styles?: T;
  contents?: P;
}

export interface ModifyData<T = any> {
  command: ModifyCommand;
  blockId: string;
  set: ModifySet;
  payload: T;
}

export interface ResBlockUtils {
  blockList: BlockData[];
  modifyData: ModifyData[];
  tempData: TempDataType;
}

export interface BlockState {
  graping: boolean;
  holdingDown: boolean;
  cliping: boolean;
  targetPosition: string | null;
  blockList: BlockData[];
  editingBlockId: string | null;
  stage: StagedBlock[];
  modifyData: ModifyData[];
  tempFront: TempDataType[];
  tempBack: TempDataType[];
  tempClipData: number[];
  clipBoard: BlockData[];
}

export interface BlockStateProps {
  graping?: boolean;
  holdingDown?: boolean;
  cliping?: boolean;
  targetPosition?: string | null;
  blockList?: BlockData[];
  editingBlockId?: string | null;
  stage?: StagedBlock[];
  modifyData?: ModifyData[];
  tempFront?: TempDataType[];
  tempBack?: TempDataType[];
  tempClipData?: number[];
  clipBoard?: BlockData[];
}

/**
 * action type
 */
export const RESET_BLOCK            = 'RESET_BLOCK' as const;
export const CHANGE_EDITING_ID      = 'CHANGE_EDITING_ID' as const;
export const ADD_BLOCK              = 'ADD_BLOCK' as const;
export const EDIT_BLOCK             = 'EDIT_BLOCK' as const;
export const COMMIT_BLOCK           = 'COMMIT_BLOCK' as const;
export const DELETE_BLOCK           = 'DELETE_BLOCK' as const;
export const UPDATE_BLOCK           = 'UPDATE_BLOCK' as const; // DB에 업데이트할 때
export const SWITCH_BLOCK           = 'SWITCH_BLOCK' as const;
export const REVERT_BLOCK           = 'REVERT_BLOKC' as const;
export const CHANGE_TEXT_STYLE      = 'CHANGE_TEXT_STYLE' as const;
export const SET_CLIPBOARD          = 'SET_CLIPBOARD' as const;
export const CLEAR_CLIPBOARD        = 'CLEAR_CLIPBOARD' as const;
export const SET_TEMPCLIP           = 'SET_TEMPCLIP' as const;
export const CLEAR_TEMPCLIP         = 'CLEAR_TEMPCLIP' as const;
export const CHANGE_EDITOR_STATE    = 'CHANGE_EDITOR_STATE' as const;
export const CHANGE_TARGET_POSITION = 'CHANGE_TARGET_POSITION' as const;

export const TEST_CLIPBOARD    = 'TEST_CLIPBOARD' as const;

export type BLOCK_ACTION_TYPES = 
  typeof RESET_BLOCK 
  | typeof ADD_BLOCK
  | typeof EDIT_BLOCK
  | typeof COMMIT_BLOCK
  | typeof DELETE_BLOCK
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
;

/**
 * Actions
 */
export const resetBlock           = actionBlock.resetBlock;
export const addBlock             = actionBlock.addBlock;
export const changeEditingId      = actionBlock.changeEditingId;
export const editBlock            = actionBlock.editBlock;
export const commitBlock          = actionBlock.commitBlock;
export const deleteBlock          = actionBlock.deleteBlock;
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

export const testClipAdd     = actionBlock.testClipAdd;

export type BlockActions = ReturnType<typeof resetBlock>
  | ReturnType<typeof addBlock>
  | ReturnType<typeof changeEditingId>
  | ReturnType<typeof editBlock>
  | ReturnType<typeof commitBlock>
  | ReturnType<typeof deleteBlock>
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
;

//converter
export const addContentsStyle        = converter.addContentsStyle;
export const changeStyleTextContents = converter.changeStyleTextContents;
export const deleteContentsStyle     = converter.deleteContentsStyle;
export const parseHtmlContents       = converter.parseHtmlContents;

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
export const changeBlockPosition   = blockUtils.changeBlockPosition;
export const switchBlockList       = blockUtils.switchBlockList;
export const restoreBlock          = blockUtils.restoreBlock;

// side utils 
export const tempDataPush           = sideStoreUtils.tempDataPush;
export const getContentsToBeChanged = sideStoreUtils.getContentsToBeChanged;
export const createTempData         = sideStoreUtils.createTempData;
export const createModifyData       = sideStoreUtils.createModifyData;
export const updateModifyData       = sideStoreUtils.updateModifyData;
export const setCreateModifyDataOfBlock = sideStoreUtils.setCreateModifyDataOfBlock;
export const setUpdateModifyDataOfBlock = sideStoreUtils.setUpdateModifyDataOfBlock;
export const setDeleteModifyDataOfBlock = sideStoreUtils.setDeleteModifyDataOfBlock;