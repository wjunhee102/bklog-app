import { ADD_PUSH_MODIFY_DATA, CHANGE_UPDATE_STATE, ClearBklogStateType, CLEAR_BKLOG_STATE, GET_PAGE, GET_PAGE_ERROR, GET_PAGE_SUCCESS, PageModifyDateType, RELEASE_UPDATING, RELEASE_UPDATING_ERROR, RELEASE_UPDATING_SUCCESS, ReqUpdateBklog, RESET_BKLOG, ResGetPage, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS, UPDATE_VERSION, UPDATE_VERSION_ERROR, UPDATE_VERSION_SUCCESS } from ".";
import { ModifyDataType } from "../../../../components/newBlock/types";
import { ApiErrorType } from "../../../../utils/api-utils";

function resetBklog() {
  return {
    type: RESET_BKLOG
  };
}

function clearBklogState(key: ClearBklogStateType) {
  return {
    type: CLEAR_BKLOG_STATE,
    payload: key
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

function updateVersion(id: string, preId: string) {
  return {
    type: UPDATE_VERSION,
    payload: {
      id,
      preId
    }
  };
}

function updateVersionSuccess(data: {id: string, data: PageModifyDateType}) {
  return {
    type: UPDATE_VERSION_SUCCESS,
    payload: data
  };
}

function updateVersionError(error: ApiErrorType) {
  return {
    type: UPDATE_VERSION_ERROR,
    payload: error
  };
}

function changeUpdateState(isUpdate?: boolean) {
  return {
    type: CHANGE_UPDATE_STATE,
    payload: isUpdate
  };
}

function releaseUpdating(pageId: string) {
  return {
    type: RELEASE_UPDATING,
    payload: pageId
  }
}

function releaseUpdatingSuccess() {
  return {
    type: RELEASE_UPDATING_SUCCESS
  }
}

function releaseUpdatingError(error: ApiErrorType) {
  return {
    type: RELEASE_UPDATING_ERROR,
    payload: error
  }
}

export default {
  resetBklog,
  clearBklogState,
  getPage,
  getPageSuccess,
  getPageError,
  addPushModifyData,
  updateBklog,
  updateBklogSuccess,
  updateBklogError,
  updateVersion,
  updateVersionSuccess,
  updateVersionError,
  changeUpdateState,
  releaseUpdating,
  releaseUpdatingSuccess,
  releaseUpdatingError
};