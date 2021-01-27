import {
  ContentType,
  TextContents,
  TextProps,
  BlockData,
  UUID
} from '../../../../types/bklog';
import converter from './converter';
import * as ordering  from './ordering';
import blocksUtils from './blocksUtils';
import tempStoreUtils from './tempStoreUtils';

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
export interface BklogState {
  pageId: UUID;
  userId: string;
  editingId: string | null;
  blocks: BlockData<any>[];
  stage: StagedBlock[];
  rightToEdit: boolean;
  tempBack: TempData[];
  tempFront: TempData[];
}
export type OrderType = "add" | "del" | "color" | "link";

/**
 * action Type
 */
export const ADD_BLOCK    = 'bklog/ADD_BLOCK' as const;
export const EDITABLE     = 'bklog/EDITABLE' as const; 
export const EDIT_BLOCK   = 'bklog/EDIT_BLOCK' as const; // 임시 데이터로 이동
export const COMMIT_BLOCK = 'bklog/COMMIT_BLOCK' as const;
export const DELETE_BLOCK = 'bklog/DELETE_BLOCK' as const;
export const UPDATE_BLOCK = 'bklog/UPDATE_BLOCK' as const; // DB에 업데이트할 때
export const SWITCH_BLOCK = 'bklog/SWITCH_BLOCK' as const;
export const REVERT_BLOCK = 'bklog/REVERT_BLOKC' as const;
export const CHANGE_TEXT_STYLE = 'bklog/CHANGE_TEXT_STYLE' as const;

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
export const createBlockData = blocksUtils.createBlockData;
export const copyBlockData   = blocksUtils.copyBlockData;
export const insertBlock     = blocksUtils.insertBlock;
export const insertChild     = blocksUtils.insertChild;
export const updateContents  = blocksUtils.updateContents;
export const excludeBlock    = blocksUtils.excludeBlock;

/**
 * tempStoreUtils
 */
export const tempDataPush           = tempStoreUtils.tempDataPush;
export const getContentsToBeChanged = tempStoreUtils.getContentsToBeChanged;