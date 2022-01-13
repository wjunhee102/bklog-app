import { RawBlockData, ModifyBlockDataType, ModifyBklogDataType, ModifyPageInfoType } from "../../../../components/block/types";
import { ApiErrorType } from "../../../../utils/api-utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

export interface PageInfoType {
  createdDate: Date;
  updatedDate: Date;
  id: string;
  parentId: string | null;
  title: string;
  emoji: string | null;
  coverImage: string | null;
  coverColor: string | null;
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
  parentId?: string | null;
  title?: string;
  emoji?: string;
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

export interface PageEditor {
  id: string;
  penName: string;
  photo: string;
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
  isUpdating: boolean;
  pageInfo: PageInfoType | null;
  version: string | null;
  pageStar: PageStarType | null;
  pageComments: PageCommentsType[] | null;
  pageEditorList: PageEditor[] | null ;
  blockList: RawBlockData[] | null;
  blockComments: BlockCommentsType[] | null; 
  pushModifyBlockData: ModifyBlockDataType | null;
  pushModifyPageInfo: ModifyPageInfoType | null;
  pullModifyBlockData: ModifyBlockDataType | null;
  editingUserList: EditingUserInfo[] | null;
  error: ApiErrorType | null;
}

// pushModifyData에 pageInfo도 넣어서 보내기 pageTitle 변경햇을 때 여기로 집어넣게 하고 한번에 보내면 됨;

export interface BklogStateProps {
  isLoading?: boolean;
  isFetching?: boolean;
  isRefresh?: boolean;
  isUpdated?: boolean;
  isUpdating?: boolean;
  pageInfo?: PageInfoType | null;
  version?: string | null;
  pageStar?: PageStarType | null;
  pageComments?: PageCommentsType[] | null;
  pageEditorList?: PageEditor[] | null ;
  blockList?: RawBlockData[] | null;
  blockComments?: BlockCommentsType[] | null; 
  pushModifyBlockData?: ModifyBlockDataType | null;
  pushModifyPageInfo?: ModifyPageInfoType | null;
  pullModifyBlockData?: ModifyBlockDataType | null;
  editingUserList?: EditingUserInfo[] | null;
  error?: ApiErrorType | null;
}

// request type
export interface UpdateBklogPayload {
  pageId: string;
  pageVersions: {
    current: string;
    next: string;
  };
  data: ModifyBklogDataType;
}

// response type
export interface ResGetPage {
  pageInfo: PageInfoType;
  blockList: RawBlockData[];
  version: string;
}

export interface ReqEditPageEditor {
  pageId: string;
  profileId: string;
  targetProfileId: string;
}

export type ClearBklogStateType = 'isLoading'
  | 'isFetching'
  | 'isRefresh'
  | 'isUpdated'
  | 'isUpdating'
  | 'pageInfo' 
  | 'blockList'
  | 'version'
  | 'pageStar'
  | 'pageComments'
  | 'pageEditorList'
  | 'blockComments'
  | 'pushModifyBlockData'
  | 'pushModifyPageInfo'
  | 'pullModifyBlockData'
  | 'error';

// actions
export const RESET_BKLOG                 = 'bklog/RESET_BKLOG' as const;
export const BKLOG_ERROR                 = 'bklog/BKLOG_ERROR' as const;
export const CLEAR_BKLOG_STATE           = 'bklog/CLEAR_BKLOG_STATE' as const;
export const GET_PAGE                    = 'bklog/GET_PAGE' as const;
export const GET_PAGE_SUCCESS            = 'bklog/GET_PAGE_SUCCESS' as const;
export const GET_PAGE_ERROR              = 'bklog/GET_PAGE_ERROR' as const;
export const ADD_PUSH_MODIFY_BLOCK_DATA  = 'bklog/ADD_PUSH_MODIFY_BLOCK_DATA' as const;
export const CHANGE_PAGE_INFO            = 'bklog/CHANGE_PAGE_INFO' as const;
export const UPDATE_BKLOG                = 'bklog/UPDATE_BKLOG' as const;
export const UPDATE_BKLOG_SUCCESS        = 'bklog/UPDATE_BKLOG_SUCCESS' as const;
export const UPDATE_BKLOG_ERROR          = 'bklog/UPDATE_BKLOG_ERROR' as const;
export const UPDATE_VERSION              = 'bklog/UPDATE_VERSION' as const;
export const UPDATE_VERSION_SUCCESS      = 'bklog/UPDATE_VERSION_SUCCESS' as const;
export const UPDATE_VERSION_ERROR        = 'bklog/UPDATE_VERSION_ERROR' as const;
export const CLEAR_MODIFY_DATA           = 'bklog/CLEAR_MODIFY_DATA' as const;
export const CHANGE_UPDATED_STATE        = 'bklog/CHANGE_UPDATED_STATE' as const;
export const CHANGE_UPDATING_STATE       = 'bklog/CHANGE_UPDATING_STATE' as const;
export const RELEASE_UPDATING            = 'bklog/RELEASE_UPDATING' as const;
export const RELEASE_UPDATING_SUCCESS    = 'bklog/RELEASE_UPDATING_SUCCESS' as const;
export const RELEASE_UPDATING_ERROR      = 'bklog/RELEASE_UPDATING_ERROR' as const;
export const ADD_PAGE_EDITOR             = 'bklog/ADD_PAGE_EDITOR' as const;
export const ADD_PAGE_EDITOR_SUCCESS     = 'bklog/ADD_PAGE_EDITOR_SUCCESS' as const;
export const ADD_PAGE_EDITOR_ERROR       = 'bklog/ADD_PAGE_EDITOR_ERROR' as const;
export const EXCLUDE_PAGE_EDITOR         = 'bklog/EXCLUDE_PAGE_EDITOR' as const;
export const EXCLUDE_PAGE_EDITOR_SUCCESS = 'bklog/EXCLUDE_PAGE_EDITOR_SUCCESS' as const;
export const EXCLUDE_PAGE_EDITOR_ERROR   = 'bklog/EXCLUDE_PAGE_EDITOR_ERROR' as const;

export const resetBklog               = actions.resetBklog;
export const clearBklogState          = actions.clearBklogState;
export const getPage                  = actions.getPage;
export const getPageSuccess           = actions.getPageSuccess;
export const getPageError             = actions.getPageError;
export const addPushModifyBlockData   = actions.addPushModifyBlockData;
export const changePageInfo           = actions.changePageInfo;
export const updateBklog              = actions.updateBklog;
export const updateBklogSuccess       = actions.updateBklogSuccess;
export const updateBklogError         = actions.updateBklogError;
export const updateVersion            = actions.updateVersion;
export const updateVersionSuccess     = actions.updateVersionSuccess;
export const updateVersionError       = actions.updateVersionError;
export const changeUpdatedState       = actions.changeUpdatedState;
export const changeUpdatingState      = actions.changeUpdatingState;
export const releaseUpdating          = actions.releaseUpdating;
export const releaseUpdatingSuccess   = actions.releaseUpdatingSuccess;
export const releaseUpdatingError     = actions.releaseUpdatingError;
export const addPageEditor            = actions.addPageEditor;
export const addPageEditorSuccess     = actions.addPageEditorSuccess;
export const addPageEditorError       = actions.addPageEditorError;
export const excludePageEditor        = actions.excludePageEditor;
export const excludePageEditorSuccess = actions.excludePageEditorSuccess;
export const excludePageEditorError   = actions.excludePageEditorError;

// api
export const bklogFetchGet    = apiUtils.bklogFetchGet;
export const bklogFetchPost   = apiUtils.bklogFetchPost;
export const bklogFetchDelete = apiUtils.bklogFetchDelete;