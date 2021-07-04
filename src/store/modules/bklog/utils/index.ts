import { RawBlockData, ModifyDataType } from "../../../../components/newBlock/types";
import { ApiErrorType } from "../../../../utils/api-utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

interface PageInfoType {
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

interface PageInfoProps {
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

interface Comments {
  id: string;
  profileId: string;
  comments: any;
  penName: string;
  photo: string;
}

interface PageCommentsType extends Comments {}

interface BlockCommentsType extends Comments {
  blockId: string;
}

interface PageStarType {
  selected: boolean;
  count: number;
}

export interface BklogState {
  isLoading: boolean;
  pageInfo: PageInfoType | null;
  pageStar: PageStarType | null;
  pageComments: PageCommentsType[] | null;
  blockList: RawBlockData[] | null;
  blockComments: BlockCommentsType[] | null; 
  pushModifyData: ModifyDataType | null;
  pullModifyData: ModifyDataType | null;
  error: ApiErrorType | null;
}

export interface BklogStateProps {
  isLoading?: boolean;
  pageInfo?: PageInfoType | null;
  pageStar?: PageStarType | null;
  pageComments?: PageCommentsType[] | null;
  blockList?: RawBlockData[] | null;
  blockComments?: BlockCommentsType[] | null; 
  pushModifyData?: ModifyDataType | null;
  pullModifyData?: ModifyDataType | null;
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

// actions
export const RESET_BKLOG      = 'bklog/RESET_BKLOG' as const;
export const BKLOG_ERROR      = 'bklog/BKLOG_ERROR' as const;

export const GET_PAGE         = 'bklog/GET_PAGE' as const;
export const GET_PAGE_SUCCESS = 'bklog/GET_PAGE_SUCCESS' as const;
export const GET_PAGE_ERROR   = 'bklog/GET_PAGE_ERROR' as const;

export const ADD_PUSH_MODIFY_DATA  = 'bklog/ADD_PUSH_MODIFY_DATA' as const;

export const UPDATE_BKLOG         = 'bklog/UPDATE_BKLOG' as const;
export const UPDATE_BKLOG_SUCCESS = 'bklog/UPDATE_BKLOG_SUCCESS' as const;
export const UPDATE_BKLOG_ERROR   = 'bklog/UPDATE_BKLOG_ERROR' as const;

export const resetBklog         = actions.resetBklog;
export const addPushModifyData  = actions.addPushModifyData;
export const updateBklog        = actions.updateBklog;
export const updataBklogSuccess = actions.updateBklogSuccess;
export const updateBklogError   = actions.updateBklogError;

// api
export const bklogFetchGet  = apiUtils.bklogFetchGet;
export const bklogFetchPost = apiUtils.bklogFetchPost;