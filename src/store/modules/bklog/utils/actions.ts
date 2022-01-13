import { 
  ADD_PUSH_MODIFY_BLOCK_DATA, 
  CHANGE_UPDATED_STATE, 
  ClearBklogStateType, 
  CLEAR_BKLOG_STATE, 
  GET_PAGE, 
  GET_PAGE_ERROR, 
  GET_PAGE_SUCCESS, 
  RELEASE_UPDATING, 
  RELEASE_UPDATING_ERROR, 
  RELEASE_UPDATING_SUCCESS, 
  UpdateBklogPayload, 
  RESET_BKLOG, 
  ResGetPage, 
  UPDATE_BKLOG, 
  UPDATE_BKLOG_ERROR, 
  UPDATE_BKLOG_SUCCESS, 
  UPDATE_VERSION, 
  UPDATE_VERSION_ERROR, 
  UPDATE_VERSION_SUCCESS, 
  CHANGE_UPDATING_STATE,
  CHANGE_PAGE_INFO,
  ReqEditPageEditor,
  ADD_PAGE_EDITOR,
  EXCLUDE_PAGE_EDITOR,
  ADD_PAGE_EDITOR_SUCCESS,
  ADD_PAGE_EDITOR_ERROR,
  EXCLUDE_PAGE_EDITOR_SUCCESS,
  EXCLUDE_PAGE_EDITOR_ERROR
} from ".";
import { ModifyBklogDataType, ModifyBlockDataType, ModifyPageInfoType } from "../../../../components/block/types";
import { ApiErrorType } from "../../../../utils/api-utils";

function resetBklog() {
  return {
    type: RESET_BKLOG
  };
}

function clearBklogState(...key: ClearBklogStateType[]) {
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

function addPushModifyBlockData(modifyBlockData: ModifyBlockDataType) {
  return {
    type: ADD_PUSH_MODIFY_BLOCK_DATA,
    payload: modifyBlockData
  };
}

function changePageInfo(modifyPageInfo: ModifyPageInfoType) {
  return {
    type: CHANGE_PAGE_INFO,
    payload: modifyPageInfo
  }
}

function updateBklog(payload: UpdateBklogPayload) {
  return {
    type: UPDATE_BKLOG,
    payload
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

function updateVersionSuccess(data: {id: string, data: ModifyBklogDataType}) {
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

function changeUpdatedState(isUpdate?: boolean) {
  return {
    type: CHANGE_UPDATED_STATE,
    payload: isUpdate
  };
}

function changeUpdatingState(isUpdating?: boolean) {
  return {
    type: CHANGE_UPDATING_STATE,
    payload: isUpdating
  }
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

function addPageEditor(data: ReqEditPageEditor) {
  return {
    type: ADD_PAGE_EDITOR
  }
}

function addPageEditorSuccess(payload: string) {
  return {
    type: ADD_PAGE_EDITOR_SUCCESS
  }
}

function addPageEditorError(payload: ApiErrorType) {
  return {
    type: ADD_PAGE_EDITOR_ERROR,
    payload
  }
}

function excludePageEditor(data: ReqEditPageEditor) {
  return {
    type: EXCLUDE_PAGE_EDITOR
  }
}

function excludePageEditorSuccess(data: string) {
  return {
    type: EXCLUDE_PAGE_EDITOR_SUCCESS
  }
}

function excludePageEditorError(payload: ApiErrorType) {
  return {
    type: EXCLUDE_PAGE_EDITOR_ERROR,
    payload
  }
}


export default {
  resetBklog,
  clearBklogState,
  getPage,
  getPageSuccess,
  getPageError,
  addPushModifyBlockData,
  changePageInfo,
  updateBklog,
  updateBklogSuccess,
  updateBklogError,
  updateVersion,
  updateVersionSuccess,
  updateVersionError,
  changeUpdatedState,
  changeUpdatingState,
  releaseUpdating,
  releaseUpdatingSuccess,
  releaseUpdatingError,
  addPageEditor,
  addPageEditorSuccess,
  addPageEditorError,
  excludePageEditor,
  excludePageEditorSuccess,
  excludePageEditorError
};