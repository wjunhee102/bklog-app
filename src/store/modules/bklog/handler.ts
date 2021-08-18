import { initialState } from ".";
import { ModifyDataType } from "../../../components/block/types";
import { updateObject } from "../../utils";
import { addPushModifyData, ADD_PUSH_MODIFY_DATA, BklogState, BklogStateProps, changeUpdatedState, CHANGE_UPDATED_STATE, CHANGE_UPDATING_STATE, clearBklogState, CLEAR_BKLOG_STATE, getPage, getPageError, getPageSuccess, GET_PAGE_ERROR, GET_PAGE_SUCCESS, PageInfoProps, PageInfoType, releaseUpdatingError, releaseUpdatingSuccess, RELEASE_UPDATING_ERROR, RELEASE_UPDATING_SUCCESS, resetBklog, RESET_BKLOG, updateBklog, updateBklogError, updateBklogSuccess, updateVersion, updateVersionError, updateVersionSuccess, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS, UPDATE_VERSION, UPDATE_VERSION_ERROR, UPDATE_VERSION_SUCCESS } from "./utils";

function resetBklogHandler(
  state: BklogState, 
  action: ReturnType<typeof resetBklog>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, initialState);
}

function clearBklogStateHandler(
  state: BklogState,
  { payload }: ReturnType<typeof clearBklogState>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, { [payload]: null });
}

function getPageHandler(
  state: BklogState,
  { payload }: ReturnType<typeof getPage>
) {
  return updateObject<BklogState, BklogStateProps>(state, {
    isLoading: true,
    isFetching: true
  })
}

function getPageSuccessHandler(
  state: BklogState, 
  { payload: { pageInfo, blockList, version } }: ReturnType<typeof getPageSuccess> 
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    pageInfo,
    blockList,
    version,
    isLoading: false,
    isRefresh: false,
    isFetching: false,
    pushModifyData: null,
    pullModifyData: null
  });
}

function getPageErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof getPageError>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    error: payload
  });
}

function addPushModifyDataHandler(
  state: BklogState, 
  { payload }: ReturnType<typeof addPushModifyData>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    pushModifyData: payload
  });
}

function updateBklogHandler(
  state: BklogState, 
  action: ReturnType<typeof updateBklog>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: true
  });
}

function updateBklogSuccessHandler(
  state: BklogState, 
  { payload: { pageVersion } }: ReturnType<typeof updateBklogSuccess>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: false,
    isUpdated: true,
    pushModifyData: null,
    version: pageVersion
  });
}

function updateBklogErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateBklogError>
): BklogState {
  if(payload.type === "Bklog" && payload.code === "002") {

    if(payload.code === "002") {
      return updateObject<BklogState, BklogStateProps>(state, {
        isLoading: true,
        isRefresh: true
      });
    } else if(payload.code === "003") {
      return updateObject<BklogState, BklogStateProps>(state, {
        isUpdating: true
      });
    }
  } else {
    return updateObject<BklogState, BklogStateProps>(state, {
      isLoading: true,
      error: payload
    });
  }
}

function updateVersionHandler(
  state: BklogState,
  action: ReturnType<typeof updateVersion>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: true
  });
}

function updateVersionSuccessHandler(
  state: BklogState,
  { payload: { id, data: { pageInfo, modifyData } } }: ReturnType<typeof updateVersionSuccess>
): BklogState {

  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: false,
    pageInfo: pageInfo? updateObject<PageInfoType, PageInfoProps>(state.pageInfo, pageInfo) 
    : state.pageInfo,
    version: id,
    pullModifyData: modifyData? modifyData : state.pullModifyData
  });
}

function updateVersionErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateVersionError>
): BklogState {
  console.log(payload);
  if(payload.type === "Bklog" && payload.code === "002") {
    return updateObject<BklogState, BklogStateProps>(state, {
      isLoading: true,
      isRefresh: true
    });
  } else {
    return updateObject<BklogState, BklogStateProps>(state, {
      isLoading: true,
      error: payload
    });
  }
}

function changeUpdatedStateHandler(
  state: BklogState,
  { payload }: ReturnType<typeof changeUpdatedState>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isUpdated: payload? true : false
  });
}

function changeUpdatingStateHandler(
  state: BklogState,
  { payload }: ReturnType<typeof changeUpdatedState>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isUpdating: payload? true : false
  });
}

// isUpdated가 아닌거 같음.
function releaseUpdatingSuccessHandler(
  state: BklogState,
  action: ReturnType<typeof releaseUpdatingSuccess>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isUpdating: false
  });
}

function releaseUpdatingErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof releaseUpdatingError>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    error: payload
  });
}

export default {
  [RESET_BKLOG]              : resetBklogHandler,
  [CLEAR_BKLOG_STATE]        : clearBklogStateHandler,
  [GET_PAGE_SUCCESS]         : getPageSuccessHandler,
  [GET_PAGE_ERROR]           : getPageErrorHandler,
  [ADD_PUSH_MODIFY_DATA]     : addPushModifyDataHandler,
  [UPDATE_BKLOG]             : updateBklogHandler,
  [UPDATE_BKLOG_SUCCESS]     : updateBklogSuccessHandler,
  [UPDATE_BKLOG_ERROR]       : updateBklogErrorHandler,
  [UPDATE_VERSION]           : updateVersionHandler,
  [UPDATE_VERSION_SUCCESS]   : updateVersionSuccessHandler,
  [UPDATE_VERSION_ERROR]     : updateVersionErrorHandler,
  [CHANGE_UPDATED_STATE]     : changeUpdatedStateHandler,
  [CHANGE_UPDATING_STATE]    : changeUpdatingStateHandler,
  [RELEASE_UPDATING_SUCCESS] : releaseUpdatingSuccessHandler,
  [RELEASE_UPDATING_ERROR]   : releaseUpdatingErrorHandler
}