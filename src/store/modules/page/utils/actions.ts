import { ApiErrorType } from "../../../../utils/api-utils";
import { 
  Page, 
  CHANGE_PAGE_TITLE, 
  CHANGE_TOGGLE, 
  CREATE_PAGE, 
  CREATE_PAGE_ERROR, 
  CREATE_PAGE_SUCCESS, 
  GET_PAGE_LIST_ID, 
  GET_PAGE_LIST_ID_ERROR, 
  GET_PAGE_LIST_ID_SUCCESS, 
  GET_PAGE_LIST_PENNAME, 
  GET_PAGE_LIST_PENNAME_ERROR, 
  GET_PAGE_LIST_PENNAME_SUCCESS, 
  ReqGetPageList 
} from ".";


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

function getPageListPenName(penName: string, reqGetPageListData: ReqGetPageList) {
  return {
    type: GET_PAGE_LIST_PENNAME,
    payload: {
      penName,
      reqGetPageListData
    }
  }
}

function getPageListPenNameSuccess(pageList: Page[]) {
  return {
    type: GET_PAGE_LIST_PENNAME_SUCCESS,
    payload: pageList
  }
}

function getPageListPenNameError(error: ApiErrorType) {
  return {
    type: GET_PAGE_LIST_PENNAME_ERROR,
    payload: error
  }
}

function getPageListId(id: string, reqGetPageListData: ReqGetPageList) {
  return {
    type: GET_PAGE_LIST_ID,
    payload: {
      id,
      reqGetPageListData
    }
  }
}

function getPageListIdSuccess(pageList: Page[]) {
  return {
    type: GET_PAGE_LIST_ID_SUCCESS,
    payload: pageList
  }
}

function getPageListIdError(error: ApiErrorType) {
  return {
    type: GET_PAGE_LIST_ID_ERROR,
    payload: error
  }
}

export default {
  changePageTitle,
  changeToggle,
  createPage,
  createPageSuccess,
  createPageError,
  getPageListId,
  getPageListIdSuccess,
  getPageListIdError,
  getPageListPenName,
  getPageListPenNameSuccess,
  getPageListPenNameError
}