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

// block

export type CreateModifyBlockGenericType<T extends BlockGenericTypes = BlockGenericTypes> = ModifyGenericType<typeof COMMAND_CREATE, typeof SET_BLOCK, RawBlockData<T>>;

export type UpdateModifyBlockGenericType<T extends BlockGenericTypes = BlockGenericTypes> = ModifyGenericType<typeof COMMAND_UPDATE, typeof SET_BLOCK, RawBlockDataProps<T>>;

export type DeleteModifyBlockGenericType = ModifyGenericType<typeof COMMAND_DELETE, typeof SET_BLOCK, null>;

export type ModifyBlockGenericType<T extends BlockGenericTypes = BlockGenericTypes> = CreateModifyBlockGenericType<T> | UpdateModifyBlockGenericType<T> | DeleteModifyBlockGenericType;

// page

export type ModifyPageGenericType = ModifyGenericType<ModifyUpdateCommand, typeof SET_PAGE, PageInfoProps>;

// types

export type ModifyGenericTypes = ModifyBlockGenericType<any> | ModifyPageGenericType;


// RawModifyData 
export interface RawModifyData<T extends ModifyGenericTypes = ModifyGenericTypes> {
  id: string;
  set: T["set"];
  payload: T["payload"];
}

export type CreateRawModifyBlockData<T extends BlockGenericTypes = BlockGenericTypes> = RawModifyData<CreateModifyBlockGenericType<T>>;

export type UpdateRawModifyBlockData<T extends BlockGenericTypes = BlockGenericTypes> = RawModifyData<UpdateModifyBlockGenericType<T>>;

export type DeleteRawModifyBlockData = RawModifyData<DeleteModifyBlockGenericType>;

export type RawModifyBlockData<T extends BlockGenericTypes = BlockGenericTypes> = CreateRawModifyBlockData<T> | UpdateRawModifyBlockData<T> | DeleteRawModifyBlockData;

// ModifyData
export interface ModifyData<T extends ModifyGenericTypes> extends RawModifyData<T> {
  command: T["command"];
}

export interface UpdateModifyBlockData<T extends BlockGenericTypes = BlockGenericTypes> {
  id: string;
  command: typeof COMMAND_UPDATE;
  payload: RawBlockDataProps<T>;
}

export interface DeleteModifyBlockData {
  id: string;
}

export interface ModifyBlockDataProps<T extends BlockGenericTypes = BlockGenericTypes> {
  id: string;
  command: ModifyBlockGenericType<T>["command"];
  payload: ModifyBlockGenericType<T>["payload"];
}

export interface ModifyPageDataProps {
  id: string;
  payload: ModifyPageGenericType["payload"];
}

export type ModifyDataTokens = ModifyPageDataToken | ModifyBlockDataToken;