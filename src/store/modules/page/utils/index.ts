import { ApiErrorType } from "../../../../utils/api-utils";
import { UserProfile } from "../../auth/utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

export interface ReqCreatePage {
  profileId: string;
  title: string;
  disclosureScope: number;
}

export interface ReqGetPageList {
  id?: string;
  skip?: number;
  take?: number;
}

export interface Page {
  id: string;
  title: string;
  disclosureScope: number;
}

export interface PageState {
  toggle: boolean;
  loading: boolean;
  pageEditor: UserProfile;
  pageList: Page[];
  tempPageInfo: { title: string; disclosureScope: number } | null;
  error: ApiErrorType | null;
}

export interface PageStateProps {
  toggle?: boolean;
  loading?: boolean;
  pageEditor?: UserProfile;
  pageList?: Page[];
  tempPageInfo?: { title: string; disclosureScope: number } | null;
  error?: ApiErrorType | null;
}

// actions
export const CHANGE_PAGE_TITLE             = "page/CHANGE_PAGE_TITLE" as const;
export const CHANGE_TOGGLE                 = "page/CHANGE_TOGGLE" as const;    
export const CREATE_PAGE                   = "page/CREATE_PAGE" as const;
export const CREATE_PAGE_SUCCESS           = "page/CREATE_PAGE_SUCCESS" as const;
export const CREATE_PAGE_ERROR             = "page/CREATE_PAGE_ERROR" as const;
export const GET_PAGE_LIST_PENNAME         = "page/GET_PAGE_LIST_PENNAME" as const;
export const GET_PAGE_LIST_PENNAME_SUCCESS = "page/GET_PAGE_LIST_PENNAME_SUCCESS" as const;
export const GET_PAGE_LIST_PENNAME_ERROR   = "page/GET_PAGE_LIST_PENNAME_ERROR" as const;
export const GET_PAGE_LIST_ID              = "page/GET_PAGE_LIST_ID" as const;
export const GET_PAGE_LIST_ID_SUCCESS      = "page/GET_PAGE_LIST_ID_SUCCESS" as const;
export const GET_PAGE_LIST_ID_ERROR        = "page/GET_PAGE_LIST_ID_ERROR" as const;

export const changeToggle              = actions.changeToggle;
export const changePageTitle           = actions.changePageTitle;
export const createPage                = actions.createPage;
export const createPageSuccess         = actions.createPageSuccess;
export const createPageError           = actions.createPageError;
export const getPageListPenName        = actions.getPageListPenName;
export const getPageListPenNameSuccess = actions.getPageListPenNameSuccess;
export const getPageListPenNameError   = actions.getPageListPenNameError;
export const getPageListId             = actions.getPageListId;
export const getPageListIdSuccess      = actions.getPageListIdSuccess;
export const getPageListIdError        = actions.getPageListIdError;

export type pageActions = ReturnType<typeof changeToggle>
  | ReturnType<typeof changePageTitle>
  | ReturnType<typeof createPage>;

// api
export const pageFetchGet  = apiUtils.pageFetchGet;
export const pageFetchPost = apiUtils.pageFetchPost;