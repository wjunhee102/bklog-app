import { RawBlockData } from "../../block/type";

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
  payload: RawBlockData<any>;
}

export interface ParamCreateComment {
  blockId: string;
  set: "comment";
  payload: any;
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

export interface ModifyData<T = any> {
  command: ModifyCommand;
  blockId: string;
  set: ModifySet;
  payload: T;
}