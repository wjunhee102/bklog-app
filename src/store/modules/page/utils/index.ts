import { ModifyPageInfoType } from "../../../../components/block/types";
import { ApiErrorType } from "../../../../utils/api-utils";
import { UserProfile } from "../../auth/utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

export interface ReqCreatePage {
  title: string;
  disclosureScope: number;
}

export interface ReqUpdatePageInfo {
  pageId: string;
  data: ModifyPageInfoType
}

export type GetPageListReqType = "penname" | "id";

export interface GetPageListQuery {
  id?: string;
  skip?: number;
  take?: number;
}

export interface GetPageListPayload {
  type: GetPageListReqType;
  userInfo: string;
  query?: GetPageListQuery;
}

export interface ResGetPageList {
  pageInfoList: Page[];
  userProfile: UserProfile;
}

export interface Page {
  id: string;
  title: string;
  disclosureScope: number;
}

export interface PageState {
  toggle: boolean;
  editToggle: boolean;
  loading: boolean;
  pageEditor: UserProfile;
  pageEditable: boolean;
  pageList: Page[];
  tempPageInfo: { title: string; disclosureScope: number } | null;
  updatingPageId: string | null;
  updatedVersion: [string, string] | null;
  error: ApiErrorType | null;
}

export interface PageStateProps {
  toggle?: boolean;
  editToggle?: boolean;
  loading?: boolean;
  pageEditor?: UserProfile;
  pageEditable?: boolean;
  pageList?: Page[];
  tempPageInfo?: { title: string; disclosureScope: number } | null;
  updatingPageId?: string | null;
  updatedVersion?: [string, string] | null;
  error?: ApiErrorType | null;
}

export interface ReqDeletePage {
  pageId: string;
}

export type ClearPageStateType = 'toggle'
  | 'editToggle'
  | 'loading'
  | 'pageEditor'
  | 'pageEditable'
  | 'pageList'
  | 'tempPageInfo'
  | 'updatingPageId'
  | 'updatedVersion'
  | 'error';

// actions
export const RESET_PAGE                = 'page/RESET_PAGE' as const;
export const CLEAR_PAGE_STATE          = 'page/CLEAR_PAGE_STATE' as const;
export const CHANGE_PAGE_TITLE         = 'page/CHANGE_PAGE_TITLE' as const;
export const CHANGE_PAGE_TITLE_SUCCESS = 'page/CHANGE_PAGE_TITLE_SUCCESS' as const;
export const CHANGE_PAGE_TITLE_ERROR   = 'page/CHANGE_PAGE_TITLE_ERROR' as const;
export const CHANGE_TOGGLE             = 'page/CHANGE_TOGGLE' as const;    
export const CREATE_PAGE               = 'page/CREATE_PAGE' as const;
export const CREATE_PAGE_SUCCESS       = 'page/CREATE_PAGE_SUCCESS' as const;
export const CREATE_PAGE_ERROR         = 'page/CREATE_PAGE_ERROR' as const;
export const GET_USER_PROFILE          = 'page/GET_USER_RPOFILE' as const;
export const GET_USER_PROFILE_SUCCESS  = 'page/GET_USER_RPOFILE_SUCCESS' as const;
export const GET_USER_RPOFILE_ERROR    = 'page/GET_USER_RPOFILE_ERROR' as const;
export const GET_PAGE_LIST             = 'page/GET_PAGE_LIST' as const;
export const GET_PAGE_LIST_SUCCESS     = 'page/GET_PAGE_LIST_SUCCESS' as const;
export const GET_PAGE_LIST_ERROR       = 'page/GET_PAGE_LIST_ERROR' as const;
export const UPDATE_PAGE_INFO          = 'page/UPDATE_PAGE_INFO' as const;
export const UPDATE_PAGE_INFO_SUCCESS  = 'page/UPDATE_PAGE_INFO_SUCCESS' as const;
export const UPDATE_PAGE_INFO_ERROR    = 'page/UPDATE_PAGE_INFO_ERROR' as const;
export const DELETE_PAGE               = 'page/DELETE_PAGE' as const;
export const DELETE_PAGE_SUCCESS       = 'page/DELETE_PAGE_SUCCESS' as const;
export const DELETE_PAGE_ERROR         = 'page/DELETE_PAGE_ERROR' as const;  

export const resetPage              = actions.resetPage;
export const clearPageState         = actions.clearPageState;
export const changeToggle           = actions.changeToggle;
export const changePageTitle        = actions.changePageTitle;
export const changePageTitleSuccess = actions.changePageTitleSuccess;
export const changePageTitleError   = actions.changePageTitleError;
export const createPage             = actions.createPage;
export const createPageSuccess      = actions.createPageSuccess;
export const createPageError        = actions.createPageError;
export const getUserProfile         = actions.getUserProfile;
export const getUserProfileSuccess  = actions.getUserProfileSuccess;
export const getUserProfileError    = actions.getUserProfileError;
export const getPageList            = actions.getPageList;
export const getPageListSuccess     = actions.getPageListSuccess;
export const getPageListError       = actions.getPageListError;
export const updatePageInfo         = actions.updatePageInfo;
export const updatePageInfoSuccess  = actions.updatePageInfoSuccess;
export const updatePageInfoError    = actions.updatePageInfoError;
export const deletePage             = actions.deletePage;
export const deletePageSuccess      = actions.deletePageSuccess;
export const deletePageError        = actions.deletePageError;

export type PageActions = ReturnType<typeof resetPage>
  | ReturnType<typeof clearPageState>
  | ReturnType<typeof changeToggle>
  | ReturnType<typeof changePageTitle>
  | ReturnType<typeof changePageTitleError>
  | ReturnType<typeof changePageTitleSuccess>
  | ReturnType<typeof createPage>
  | ReturnType<typeof createPageSuccess>
  | ReturnType<typeof createPageError>
  | ReturnType<typeof getUserProfile>
  | ReturnType<typeof getUserProfileSuccess>
  | ReturnType<typeof getUserProfileError>
  | ReturnType<typeof getPageList>
  | ReturnType<typeof getPageListSuccess>
  | ReturnType<typeof getPageListError>
  | ReturnType<typeof updatePageInfo>
  | ReturnType<typeof updatePageInfoSuccess>
  | ReturnType<typeof updatePageInfoError>
  | ReturnType<typeof deletePage>
  | ReturnType<typeof deletePageSuccess>
  | ReturnType<typeof deletePageError>
;

// api
export const pageFetchGet  = apiUtils.pageFetchGet;
export const pageFetchPost = apiUtils.pageFetchPost;
