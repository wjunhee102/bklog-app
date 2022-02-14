import { UnionBlockGenericType, RawBlockData, RawBlockDataProps, BlockData, BlockDataProps } from "../../block/type";
import { HistoryBlockToken } from "../block/HistoryBlockToken";
import { ModifyBlockToken } from "../block/ModifyBlockToken";
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


export interface PageInfo {
  createdDate: Date;
  updatedDate: Date;
  id: string;
  title: string;
  coverImage: string;
  coverColor: string;
  lastAccessDate: Date;
  views: number;
  disclosureScope: number;
  version: string;
  profileId: string;
  editable: boolean;
}  

export type PageInfoProps = {
  [Property in keyof PageInfo]?: PageInfo[Property];
}

type ModifyPayload = RawBlockDataProps<UnionBlockGenericType> | PageInfoProps;

interface ModifyGenericType<T extends ModifyALLCommand, Y extends ModifySet, P extends ModifyPayload> {
  command: T;
  set: Y;
  payload: P;
}

/*
* block
*/

// modify
export type CreateModifyBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = ModifyGenericType<typeof COMMAND_CREATE, typeof SET_BLOCK, RawBlockData<T>>;

export type UpdateModifyBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = ModifyGenericType<typeof COMMAND_UPDATE, typeof SET_BLOCK, RawBlockDataProps<T>>;

export type DeleteModifyBlockGenericType = ModifyGenericType<typeof COMMAND_DELETE, typeof SET_BLOCK, RawBlockDataProps<UnionBlockGenericType>>;

export type ModifyBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = CreateModifyBlockGenericType<T> | UpdateModifyBlockGenericType<T> | DeleteModifyBlockGenericType;

// history
export type CreateHistoryBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = ModifyGenericType<typeof COMMAND_CREATE, typeof SET_BLOCK, BlockData<T>>;

export type UpdateHistoryBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = ModifyGenericType<typeof COMMAND_UPDATE, typeof SET_BLOCK, BlockDataProps<T>>;

export type DeleteHistoryBlockGenericType = ModifyGenericType<typeof COMMAND_DELETE, typeof SET_BLOCK, RawBlockDataProps<UnionBlockGenericType>>;

export type HistoryBlockGenericType<T extends UnionBlockGenericType = UnionBlockGenericType> = CreateHistoryBlockGenericType<T> | UpdateHistoryBlockGenericType<T> | DeleteHistoryBlockGenericType;

/**/

// page

export type ModifyPageGenericType = ModifyGenericType<ModifyUpdateCommand, typeof SET_PAGE, PageInfoProps>;

// types

export type UnionModifyGenericType = ModifyBlockGenericType<UnionBlockGenericType> 
  | HistoryBlockGenericType<UnionBlockGenericType> 
  | ModifyPageGenericType;


/*
* RawModifyData 
*/ 
export interface RawModifyData<T extends UnionModifyGenericType = UnionModifyGenericType> {
  id: string;
  payload: T["payload"];
}

// ModifyData
export interface ModifyData<T extends UnionModifyGenericType> extends RawModifyData<T> {
  set: T["set"];
  command: T["command"];
}

export interface UpdateModifyBlockData<T extends UnionBlockGenericType = UnionBlockGenericType> {
  id: string;
  command: typeof COMMAND_UPDATE;
  payload: RawBlockDataProps<T>;
}

export interface DeleteModifyBlockData {
  id: string;
}

export interface ModifyBlockDataProps<T extends UnionBlockGenericType = UnionBlockGenericType> {
  id: string;
  command: ModifyBlockGenericType<T>['command'];
  payload: ModifyBlockGenericType<T>['payload'];
}

export interface HistoryBlockDataProps<T extends UnionBlockGenericType = UnionBlockGenericType> {
  id: string;
  command: HistoryBlockGenericType<T>['command'];
  payload: HistoryBlockGenericType<T>['payload'];
}

export interface ModifyPageDataProps {
  id: string;
  payload: ModifyPageGenericType['payload'];
}

// Union
export type UnionModifyBlockToken = ModifyBlockToken | HistoryBlockToken;

export type UnionModifyDataToken = ModifyPageDataToken | UnionModifyBlockToken;