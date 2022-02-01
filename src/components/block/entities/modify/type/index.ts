import { BlockData, BlockGenericTypes, RawBlockData, RawBlockDataProps, TextGenericType } from "../../block/type";
import { ModifyBlockDataToken } from "../block/ModifyBlockData";
import { ModifyPageDataToken } from "../page/ ModifyPageDataToken";

// command

export const COMMAND_UPDATE = "update" as const;
export const COMMAND_CREATE = "create" as const;
export const COMMAND_DELETE = "delete" as const;

export type ModifyALLCommand = typeof COMMAND_UPDATE 
  | typeof COMMAND_CREATE 
  | typeof COMMAND_DELETE;
export type ModifyUpdateCommand  = typeof COMMAND_UPDATE; 

// set

export const SET_BLOCK   = "block" as const;
export const SET_COMMENT = "comment" as const;
export const SET_PAGE    = "page" as const;

export type ModifySet = typeof SET_BLOCK 
  | typeof SET_COMMENT 
  | typeof SET_PAGE; 


export interface ParamModifyUpdate<T> {
  id: string;
  set: ModifySet;
  payload: any;
}
export interface ParamModifyCreate {
  id: string;
  set: typeof SET_BLOCK;
  payload: RawBlockData<any> | BlockData;
}

export interface ParamModifyDelete<T> {
  id: string;
  set: typeof SET_COMMENT;
  payload: any;
}

export interface PageInfoProps {
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

type ModifyPayload = RawBlockDataProps<any> | PageInfoProps;

interface ModifyGenericType<T extends ModifyALLCommand, Y extends ModifySet, P extends ModifyPayload> {
  command: T;
  set: Y;
  payload: P;
}

export type ModifyBlockGenericType<T extends BlockGenericTypes> = ModifyGenericType<ModifyALLCommand, typeof SET_BLOCK, RawBlockDataProps<T> | BlockData>;

export type ModifyPageGenericType = ModifyGenericType<ModifyUpdateCommand, typeof SET_PAGE, PageInfoProps>;

export type ModifyGenericTypes = ModifyBlockGenericType<any> | ModifyPageGenericType;

export interface ModifyData<T extends ModifyGenericTypes> {
  command: T["command"];
  id: string;
  set: T["set"];
  payload: T["payload"];
}

export interface ModifyBlockDataProps<T extends BlockGenericTypes> {
  id: string;
  command: ModifyBlockGenericType<T>["command"];
  payload: ModifyBlockGenericType<T>["payload"];
}

export interface ModifyPageDataProps {
  id: string;
  payload: ModifyPageGenericType["payload"];
}

export type ModifyDataTokens = ModifyPageDataToken | ModifyBlockDataToken;