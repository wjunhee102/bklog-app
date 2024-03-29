import {
  BlockData,
  UUID
} from "../../types";
import converter from './converter';
import * as ordering  from './ordering';
import blocksUtils from './blocksUtils';
import sideStoreUtils from './sideUtils';
import actionBlock from './actionTypes';

/**
 * types
 */
export interface EditedBlock {
  blockId: UUID;
  blockIndex: number;
  text: string;
}
export interface StagedBlock{
  id: UUID;
  contents: any;
  blockIndex: number;
}
export interface TempData {
  type: string;
  data: any;
}
export type ModifyCommand = "update" | "create" | "delete";
export type ModifySet = "block" | "property" | "comment"; 

export interface ParamModifyBlock {
  blockId: string;
  set: ModifySet;
  payload: any;
}

export interface ParamCreateBlock {
  blockId: string;
  set: "block";
  payload: BlockData;
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

export interface ModifyBlockData<T = any> {
  id?: UUID | string;
  type?: string;
  parentBlockId?: UUID | string | null;
  preBlockId?: UUID | string | null;
  nextBlockId?: UUID | string | null;
  // 수정할 것.
  property?: T;
  children?: UUID[];
}

export interface ModifyData<T = any> {
  command: ModifyCommand;
  blockId: string;
  set: ModifySet;
  payload: T;
}

export interface BlockState {
  editingId: string | null;
  blocks: BlockData<any>[];
  stage: StagedBlock[];
  rightToEdit: boolean;
  tempBack: TempData[];
  tempFront: TempData[];
  tempClip: number[];
  clipboard: BlockData<any>[];
  test: any;
  modifyData: ModifyData[];
}

export interface BlockStateProps {
  editingId?: string | null;
  blocks?: BlockData<any>[];
  stage?: StagedBlock[];
  rightToEdit?: boolean;
  tempBack?: TempData[];
  tempFront?: TempData[];
  tempClip?: number[];
  clipboard?: BlockData<any>[];
  test?: any;
  modifyData?: ModifyData[];
}

export type OrderType = "add" | "del" | "color" | "link";

/**
 * action Type
 */
export const RESET_BLOCK       = 'RESET_BLOCK' as const;
export const ADD_BLOCK         = 'ADD_BLOCK' as const;
export const ADD_BLOCKLIST     = 'ADD_BLOCKLIST' as const;
export const EDITABLE          = 'EDITABLE' as const; 
export const EDIT_BLOCK        = 'EDIT_BLOCK' as const; // 임시 데이터로 이동
export const COMMIT_BLOCK      = 'COMMIT_BLOCK' as const;
export const DELETE_BLOCK      = 'DELETE_BLOCK' as const;
export const UPDATE_BLOCK      = 'UPDATE_BLOCK' as const; // DB에 업데이트할 때
export const SWITCH_BLOCK      = 'SWITCH_BLOCK' as const;
export const REVERT_BLOCK      = 'REVERT_BLOKC' as const;
export const CHANGE_TEXT_STYLE = 'CHANGE_TEXT_STYLE' as const;
export const SET_CLIPBOARD     = 'SET_CLIPBOARD' as const;
export const CLEAR_CLIPBOARD   = 'CLEAR_CLIPBOARD' as const;
export const SET_TEMPCLIP      = 'SET_TEMPCLIP' as const;
export const CLEAR_TEMPCLIP    = 'CLEAR_TEMPCLIP' as const;

export const TEST_CLIPBOARD    = 'TEST_CLIPBOARD' as const;


export const resetBlock      = actionBlock.resetBlock;
export const addBlock        = actionBlock.addBlock;
export const addBlockList    = actionBlock.addBlockList;
export const editAble        = actionBlock.editAble;
export const editBlock       = actionBlock.editBlock;
export const commitBlock     = actionBlock.commitBlock;
export const deleteBlock     = actionBlock.deleteBlock;
export const updateBlock     = actionBlock.updateBlock;
export const changeTextStyle = actionBlock.changeTextStyle;
export const revertBlock     = actionBlock.revertBlock;
export const switchBlock     = actionBlock.switchBlock;
export const setClipboard    = actionBlock.setClipboard;
export const clearClipboard  = actionBlock.clearClipboard;
export const setTempClip     = actionBlock.setTempClip;
export const clearTempClip   = actionBlock.clearTempClip;

export const testClipAdd     = actionBlock.testClipAdd;

export type BlockActions = ReturnType<typeof resetBlock>
  | ReturnType<typeof addBlock>
  | ReturnType<typeof addBlockList>
  | ReturnType<typeof editAble>
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
  | ReturnType<typeof testClipAdd>
;

/**
 * converter
 */
export const parseHtmlContents       = converter.parseHtmlContents;
export const addContentsStyle        = converter.addContentsStyle;
export const deleteContentsStyle     = converter.deleteContentsStyle;
export const changeStyleTextContents = converter.changeStyleTextContents;

/**
 * ordering
 */
export const orderingBlock = ordering.default;

/**
 * blocksUtils
 */
export const createBlockData   = blocksUtils.createBlockData;
export const copyBlockData     = blocksUtils.copyBlockData;
export const copyBlockDataList = blocksUtils.copyBlockDataList;
export const insertBlock       = blocksUtils.insertBlock;
export const insertChild       = blocksUtils.insertChild;
export const updateContents    = blocksUtils.updateContents;
export const excludeBlock      = blocksUtils.excludeBlock;
export const excludeBlockList  = blocksUtils.excludeBlockList;
export const switchingBlock    = blocksUtils.switchingBlock;
export const restoreBlock      = blocksUtils.restoreBlock;

/**
 * tempStoreUtils
 */
export const tempDataPush           = sideStoreUtils.tempDataPush;
export const getContentsToBeChanged = sideStoreUtils.getContentsToBeChanged;
export const updateModifyData       = sideStoreUtils.updateModifyData;

export function updateObject<T = any, P = any>(oldObject: T, newValues: P): T {
  return Object.assign({}, oldObject, newValues);
};

export const initialState:BlockState = (() => {
  return {
    blocks: [],
    editingId: null,
    stage: [],
    rightToEdit: false,
    tempBack: [],
    tempFront: [],
    tempClip: [],
    clipboard: [],
    test: null,
    modifyData: []
  };
})();