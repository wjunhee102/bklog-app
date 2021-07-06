import { initialState } from ".";
import { updateObject } from "../../utils";
import { addPushModifyData, ADD_PUSH_MODIFY_DATA, BklogState, BklogStateProps, getPageError, getPageSuccess, GET_PAGE_ERROR, GET_PAGE_SUCCESS, PageInfoProps, PageInfoType, resetBklog, RESET_BKLOG, updateBklog, updateBklogError, updateBklogSuccess, updateVersion, updateVersionError, updateVersionSuccess, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS, UPDATE_VERSION, UPDATE_VERSION_ERROR, UPDATE_VERSION_SUCCESS } from "./utils";

function resetBlockHandler(
  state: BklogState, 
  action: ReturnType<typeof resetBklog>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, initialState);
}

function getPageSuccessHandler(
  state: BklogState, 
  { payload: { pageInfo, blockList } }: ReturnType<typeof getPageSuccess> 
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    pageInfo,
    blockList
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
    pushModifyData: null,
    pageInfo: updateObject<PageInfoType, PageInfoProps>(state.pageInfo, {
      version: pageVersion
    })
  });
}

function updateBklogErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateBklogError>
) {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: false,
    isLoading: true,
    error: payload
  });
}

function updateVersionHandler(
  state: BklogState,
  action: ReturnType<typeof updateVersion>
) {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: true
  });
}

function updateVersionSuccessHandler(
  state: BklogState,
  { payload: { id, data } }: ReturnType<typeof updateVersionSuccess>
) {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: false,
    pageInfo: updateObject<PageInfoType, PageInfoProps>(state.pageInfo, {
      id
    }),
    pullModifyData: data
  });
}

function updateVersionErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateVersionError>
) {
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

export default {
  [RESET_BKLOG]            : resetBlockHandler,
  [GET_PAGE_SUCCESS]       : getPageSuccessHandler,
  [GET_PAGE_ERROR]         : getPageErrorHandler,
  [ADD_PUSH_MODIFY_DATA]   : addPushModifyDataHandler,
  [UPDATE_BKLOG]           : updateBklogHandler,
  [UPDATE_BKLOG_SUCCESS]   : updateBklogSuccessHandler,
  [UPDATE_BKLOG_ERROR]     : updateBklogErrorHandler,
  [UPDATE_VERSION]         : updateVersionHandler,
  [UPDATE_VERSION_SUCCESS] : updateVersionSuccessHandler,
  [UPDATE_VERSION_ERROR]   : updateVersionErrorHandler
};