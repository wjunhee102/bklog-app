import { ADD_PUSH_MODIFY_DATA, GET_PAGE, GET_PAGE_ERROR, GET_PAGE_SUCCESS, ReqUpdateBklog, RESET_BKLOG, ResGetPage, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS } from ".";
import { ModifyDataType } from "../../../../components/newBlock/types";
import { ApiErrorType } from "../../../../utils/api-utils";

function resetBklog() {
  return {
    type: RESET_BKLOG
  };
}

function getPage(pageId: string) {
  return {
    type: GET_PAGE,
    payload: pageId
  };
}

function getPageSuccess(data: ResGetPage) {
  return {
    type: GET_PAGE_SUCCESS,
    payload: data
  };
}

function getPageError(error: ApiErrorType) {
  return {
    type: GET_PAGE_ERROR,
    payload: error
  };
}

function addPushModifyData(modifyData: ModifyDataType) {
  return {
    type: ADD_PUSH_MODIFY_DATA,
    payload: modifyData
  };
}

function updateBklog(reqData: ReqUpdateBklog) {
  return {
    type: UPDATE_BKLOG,
    payload: reqData
  }
}

function updateBklogSuccess(payload: { pageVersion: string }) {
  return {
    type: UPDATE_BKLOG_SUCCESS,
    payload
  }
}

function updateBklogError(error: ApiErrorType) {
  return {
    type: UPDATE_BKLOG_ERROR,
    payload: error
  }
}


export default {
  resetBklog,
  getPage,
  getPageSuccess,
  getPageError,
  addPushModifyData,
  updateBklog,
  updateBklogSuccess,
  updateBklogError
};