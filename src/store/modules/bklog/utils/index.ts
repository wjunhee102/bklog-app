import { RawBlockData, ModifyDataType } from "../../../../components/newBlock/types";
import { ApiErrorType } from "../../../../utils/api-utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

export interface PageInfoType {
  createdDate: Date;
  updatedDate: Date;
  id: string;
  title: string;
  coverImage: string;
  coverColor: string;
  lastAccessDate: Date;
  views: number;
  disclosureScope: number;
  profileId: string;
  editable: boolean;
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
  profileId?: string;
  editable?: boolean;
}

interface Comments {
  id: string;
  profileId: string;
  comments: any;
  penName: string;
  photo: string;
}

export interface PageCommentsType extends Comments {}

export interface BlockCommentsType extends Comments {
  blockId: string;
}

export interface PageStarType {
  selected: boolean;
  count: number;
}

export interface PageModifyDateType {
  pageInfo?: {
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
  };
  modifyData?: ModifyDataType;
}

export interface EditingUserInfo {
  penName: string;
  editingId: string | null;
}

export interface BklogState {
  isLoading: boolean;
  isFetching: boolean; 
  isRefresh: boolean;
  isUpdated: boolean;
  pageInfo: PageInfoType | null;
  version: string | null;
  pageStar: PageStarType | null;
  pageComments: PageCommentsType[] | null;
  blockList: RawBlockData[] | null;
  blockComments: BlockCommentsType[] | null; 
  pushModifyData: ModifyDataType | null;
  pullModifyData: ModifyDataType | null;
  editingUserList: EditingUserInfo[] | null;
  error: ApiErrorType | null;
}

export interface BklogStateProps {
  isLoading?: boolean;
  isFetching?: boolean;
  isRefresh?: boolean;
  isUpdated?: boolean;
  pageInfo?: PageInfoType | null;
  version?: string | null;
  pageStar?: PageStarType | null;
  pageComments?: PageCommentsType[] | null;
  blockList?: RawBlockData[] | null;
  blockComments?: BlockCommentsType[] | null; 
  pushModifyData?: ModifyDataType | null;
  pullModifyData?: ModifyDataType | null;
  editingUserList?: EditingUserInfo[] | null;
  error?: ApiErrorType | null;
}

// request type
export interface ReqUpdateBklog {
  pageId: string;
  pageVersions: {
    current: string;
    next: string;
  };
  data: ModifyDataType;
}

// response type
export interface ResGetPage {
  pageInfo: PageInfoType;
  blockList: RawBlockData[];
  version: string;
}

export type ClearBklogStateType = "pageInfo" 
  | "blockList"
  | "version"
  | "pageStar"
  | "pageComments"
  | "blockComments"
  | "pushModifyData"
  | "pullModifyData"
  | "error"

// actions
export const RESET_BKLOG            = 'bklog/RESET_BKLOG' as const;
export const BKLOG_ERROR            = 'bklog/BKLOG_ERROR' as const;
export const CLEAR_BKLOG_STATE      = 'bklog/CLEAR_BKLOG_STATE' as const;
export const GET_PAGE               = 'bklog/GET_PAGE' as const;
export const GET_PAGE_SUCCESS       = 'bklog/GET_PAGE_SUCCESS' as const;
export const GET_PAGE_ERROR         = 'bklog/GET_PAGE_ERROR' as const;
export const ADD_PUSH_MODIFY_DATA   = 'bklog/ADD_PUSH_MODIFY_DATA' as const;
export const UPDATE_BKLOG           = 'bklog/UPDATE_BKLOG' as const;
export const UPDATE_BKLOG_SUCCESS   = 'bklog/UPDATE_BKLOG_SUCCESS' as const;
export const UPDATE_BKLOG_ERROR     = 'bklog/UPDATE_BKLOG_ERROR' as const;
export const UPDATE_VERSION         = 'bklog/UPDATE_VERSION' as const;
export const UPDATE_VERSION_SUCCESS = 'bklog/UPDATE_VERSION_SUCCESS' as const;
export const UPDATE_VERSION_ERROR   = 'bklog/UPDATE_VERSION_ERROR' as const;
export const CLEAR_MODIFY_DATA      = 'bklog/CLEAR_MODIFY_DATA' as const;
export const CHANGE_UPDATE_STATE    = 'bklog/CHANGE_UPDATE_STATE' as const;

export const resetBklog           = actions.resetBklog;
export const clearBklogState      = actions.clearBklogState;
export const getPage              = actions.getPage;
export const getPageSuccess       = actions.getPageSuccess;
export const getPageError         = actions.getPageError;
export const addPushModifyData    = actions.addPushModifyData;
export const updateBklog          = actions.updateBklog;
export const updateBklogSuccess   = actions.updateBklogSuccess;
export const updateBklogError     = actions.updateBklogError;
export const updateVersion        = actions.updateVersion;
export const updateVersionSuccess = actions.updateVersionSuccess;
export const updateVersionError   = actions.updateVersionError;
export const changeUpdateState    = actions.changeUpdateState;

// api
export const bklogFetchGet  = apiUtils.bklogFetchGet;
export const bklogFetchPost = apiUtils.bklogFetchPost;