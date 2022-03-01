import { UnionRawBlockData } from "../../../../components/block/entities/block/type";
import { ModifyBlockToken } from "../../../../components/block/entities/modify/block/ModifyBlockToken";
import { ModifyPageDataToken } from "../../../../components/block/entities/modify/page/ ModifyPageDataToken";
import { PageInfo } from "../../../../components/block/entities/modify/type";
import { ModifyBklogData, ModifyBlockData } from "../../../../components/block/service/modify/type";
import { ApiErrorType } from "../../../../utils/api-utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

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
  pageInfo: PageInfo | null;
  version: string | null;
  pageStar: PageStarType | null;
  pageComments: PageCommentsType[] | null;
  pageEditorList: PageEditor[] | null ;
  blockList: UnionRawBlockData[] | null;
  blockComments: BlockCommentsType[] | null; 
  pushModifyBlockTokenList: ModifyBlockToken[] | null;
  pushModifyPageTokenList: ModifyPageDataToken[] | null;
  pullModifyBlockData: ModifyBlockData | null;
  editingUserList: EditingUserInfo[] | null;
  error: ApiErrorType | null;
}

// pushModifyData에 pageInfo도 넣어서 보내기 pageTitle 변경햇을 때 여기로 집어넣게 하고 한번에 보내면 됨;

export type BklogStateProps = {
  [Property in keyof BklogState]?: BklogState[Property];
}

// request type
export interface UpdateBklogPayload {
  pageId: string;
  pageVersions: {
    current: string;
    next: string;
  };
  data: ModifyBklogData;
}

// response type
export interface ResGetPage {
  pageInfo: PageInfo;
  blockList: UnionRawBlockData[];
  version: string;
}

export interface ReqEditPageEditor {
  pageId: string;
  profileId: string;
  targetProfileId: string;
}

export type ClearBklogStateType = keyof BklogState;

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

export const resetBklog                  = actions.resetBklog;
export const clearBklogState             = actions.clearBklogState;
export const getPage                     = actions.getPage;
export const getPageSuccess              = actions.getPageSuccess;
export const getPageError                = actions.getPageError;
export const addPushModifyBlockTokenList = actions.addPushModifyBlockTokenList;
export const changePageInfo              = actions.changePageInfo;
export const updateBklog                 = actions.updateBklog;
export const updateBklogSuccess          = actions.updateBklogSuccess;
export const updateBklogError            = actions.updateBklogError;
export const updateVersion               = actions.updateVersion;
export const updateVersionSuccess        = actions.updateVersionSuccess;
export const updateVersionError          = actions.updateVersionError;
export const changeUpdatedState          = actions.changeUpdatedState;
export const changeUpdatingState         = actions.changeUpdatingState;
export const releaseUpdating             = actions.releaseUpdating;
export const releaseUpdatingSuccess      = actions.releaseUpdatingSuccess;
export const releaseUpdatingError        = actions.releaseUpdatingError;
export const addPageEditor               = actions.addPageEditor;
export const addPageEditorSuccess        = actions.addPageEditorSuccess;
export const addPageEditorError          = actions.addPageEditorError;
export const excludePageEditor           = actions.excludePageEditor;
export const excludePageEditorSuccess    = actions.excludePageEditorSuccess;
export const excludePageEditorError      = actions.excludePageEditorError;

// api
export const bklogFetchGet    = apiUtils.getFetch;
export const bklogFetchPost   = apiUtils.patchFetch;
export const bklogFetchPut    = apiUtils.putFetch;
export const bklogFetchPatch  = apiUtils.patchFetch;
export const bklogFetchDelete = apiUtils.deleteFetch;