import { initialState } from ".";
import { updateObject } from "../../utils";
import { addPushModifyData, ADD_PUSH_MODIFY_DATA, BklogState, BklogStateProps, getPageError, getPageSuccess, GET_PAGE_ERROR, GET_PAGE_SUCCESS, PageInfoProps, PageInfoType, resetBklog, RESET_BKLOG, updateBklog, updateBklogError, updateBklogSuccess, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS } from "./utils";

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

export default {
  [RESET_BKLOG]          : resetBlockHandler,
  [GET_PAGE_SUCCESS]     : getPageSuccessHandler,
  [GET_PAGE_ERROR]       : getPageErrorHandler,
  [ADD_PUSH_MODIFY_DATA] : addPushModifyDataHandler,
  [UPDATE_BKLOG]         : updateBklogHandler,
  [UPDATE_BKLOG_SUCCESS] : updateBklogSuccessHandler,
  [UPDATE_BKLOG_ERROR]   : updateBklogErrorHandler
};