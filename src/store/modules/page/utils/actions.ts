import { ApiErrorType } from "../../../../utils/api-utils";
import { 
  Page, 
  CHANGE_PAGE_TITLE, 
  CHANGE_TOGGLE, 
  CREATE_PAGE, 
  CREATE_PAGE_ERROR, 
  CREATE_PAGE_SUCCESS,
  GET_PAGE_LIST,
  GET_PAGE_LIST_SUCCESS,
  GET_PAGE_LIST_ERROR,
  GetPageListReqType,
  GetPageListQuery,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_RPOFILE_ERROR,
  ResGetPageList,
  RESET_PAGE,
  CHANGE_PAGE_TITLE_SUCCESS,
  CHANGE_PAGE_TITLE_ERROR
} from ".";
import { UserProfile } from "../../auth/utils";

function resetPage() {
  return {
    type: RESET_PAGE
  }
}

function changeToggle(toggle?: boolean) {
  return {
    type: CHANGE_TOGGLE,
    payload: {
      toggle
    }
  }
}

function changePageTitle(id: string, title: string) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload: {
      title,
      id
    }
  }
}

function changePageTitleSuccess(pageId: string) {
  return {
    type: CHANGE_PAGE_TITLE_SUCCESS,
    payload: pageId
  }
}

function changePageTitleError(error: ApiErrorType) {
  return {
    type: CHANGE_PAGE_TITLE_ERROR,
    payload: error
  }
}

function createPage(profileId: string, title: string, disclosureScope: number = 5) {
  return {
    type: CREATE_PAGE,
    payload: {
      profileId,
      title,
      disclosureScope
    }
  }
}

function createPageSuccess(pageId: string) {
  return {
    type: CREATE_PAGE_SUCCESS,
    payload: pageId
  }
}

function createPageError(error: ApiErrorType) {
  return {
    type: CREATE_PAGE_ERROR,
    payload: error
  }
}

function getUserProfile(type: GetPageListReqType, userInfo: string) {
  return {
    type: GET_USER_PROFILE,
    payload: {
      type,
      userInfo
    }
  }
}

function getUserProfileSuccess(userProfile: UserProfile) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: userProfile
  }
}

function getUserProfileError(error: ApiErrorType) {
  return {
    type: GET_USER_RPOFILE_ERROR,
    payload: error
  }
}

function getPageList(type: GetPageListReqType, userInfo: string, query?: GetPageListQuery) {
  return {
    type: GET_PAGE_LIST,
    payload: {
      type,
      userInfo,
      query
    }
  }
}

function getPageListSuccess(data: ResGetPageList) {
  return {
    type: GET_PAGE_LIST_SUCCESS,
    payload: data
  }
}

function getPageListError(error: ApiErrorType) {
  return {
    type: GET_PAGE_LIST_ERROR,
    payload: error
  }
}

export default {
  resetPage,
  changePageTitle,
  changePageTitleSuccess,
  changePageTitleError,
  changeToggle,
  createPage,
  createPageSuccess,
  createPageError,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileError,
  getPageList,
  getPageListSuccess,
  getPageListError
}
