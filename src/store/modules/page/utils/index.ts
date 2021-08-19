import { ApiErrorType } from "../../../../utils/api-utils";
import { UserProfile } from "../../auth/utils";
import actions from "./actions";
import apiUtils from "./apiUtils";

export interface ReqCreatePage {
  profileId: string;
  title: string;
  disclosureScope: number;
}

export type GetPageListReqType = "penname" | "id";

export interface GetPageListQuery {
  reqProfileId?: string;
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
export const CHANGE_PAGE_TITLE         = "page/CHANGE_PAGE_TITLE" as const;
export const CHANGE_TOGGLE             = "page/CHANGE_TOGGLE" as const;    
export const CREATE_PAGE               = "page/CREATE_PAGE" as const;
export const CREATE_PAGE_SUCCESS       = "page/CREATE_PAGE_SUCCESS" as const;
export const CREATE_PAGE_ERROR         = "page/CREATE_PAGE_ERROR" as const;
export const GET_USER_PROFILE          = "page/GET_USER_RPOFILE" as const;
export const GET_USER_PROFILE_SUCCCESS = "page/GET_USER_RPOFILE_SUCCESS" as const;
export const GET_USER_RPOFILE_ERROR    = "page/GET_USER_RPOFILE_ERROR" as const;
export const GET_PAGE_LIST             = "page/GET_PAGE_LIST" as const;
export const GET_PAGE_LIST_SUCCESS     = "page/GET_PAGE_LIST_SUCCESS" as const;
export const GET_PAGE_LIST_ERROR       = "page/GET_PAGE_LIST_ERROR" as const;

export const changeToggle          = actions.changeToggle;
export const changePageTitle       = actions.changePageTitle;
export const createPage            = actions.createPage;
export const createPageSuccess     = actions.createPageSuccess;
export const createPageError       = actions.createPageError;
export const getUserProfile        = actions.getUserProfile;
export const getUserProfileSuccess = actions.getUserProfileSuccess;
export const getUserProfileError   = actions.getUserProfileError;
export const getPageList           = actions.getPageList;
export const getPageListSuccess    = actions.getPageListSuccess;
export const getPageListError      = actions.getPageListError;

export type pageActions = ReturnType<typeof changeToggle>
| ReturnType<typeof changePageTitle>
| ReturnType<typeof createPage>;

// api
export const pageFetchGet  = apiUtils.pageFetchGet;
export const pageFetchPost = apiUtils.pageFetchPost;
