import { v4 as uuidv4 } from 'uuid';
import { Token } from '../utils/token';

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof Token.getUUID>

/**
 * block types
 */

export type BlockTypes = "text" 
  | "todo"
  | "title"
  | "numbered" 
  | "bulleted" 
  | "container"
; 

/**
 * text block types
 */
export type ContentType = ["b"] 
  | ["i"] 
  | ["_"] 
  | ["a", string] 
  | ["fc", string] 
  | ["bc", string];

export type TextContents = [string] | [string, ContentType[]];


/**
 * block data
 */
export interface RawBlockData<T = any, P = any> {
  position: string; // 1,  1-1,  1-2-1
  id: string;
  type: BlockTypes;
  styleType: string;
  styles: T;
  contents: P;
}

export interface BlockData<T = any, P = any> extends RawBlockData<T, P> {
  index: number;
  parentId: string;
}

export interface RawBlockDataProps<T = any, P = any> {
  position?: string; // 1,  1-1,  1-2-1
  id?: string;
  type?: BlockTypes;
  styleType?: string;
  styles?: T;
  contents?: P;
}

export interface BlockDataProps<T = any, P = any> extends RawBlockDataProps<T, P> {
  index?: number;
  parentId?: string;
}

export type OrderType = "add" | "del" | "color" | "link";

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

export interface ModifyBlockDataType {
  create?: ParamCreateModifyBlock[];
  update?: ParamModifyBlock[];
  delete?: ParamDeleteModity;
}

export interface ModifyPageInfoType {
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  title?: string;
  coverImage?: string;
  coverColor?: string;
  lastAccessDate?: Date;
  views?: number;
  disclosureScope?: number;
  version?: string;
  profileId?: string;
  editable?: boolean;
}

export interface ModifyBklogDataType {
  modifyPageInfo?: ModifyPageInfoType;
  modifyBlockData?: ModifyBlockType;
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