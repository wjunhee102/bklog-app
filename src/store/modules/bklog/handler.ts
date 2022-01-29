import { initialState } from ".";
import { createClearStatePart, updateObject } from "../../utils";
import { addPushModifyBlockData, changePageInfo, ADD_PUSH_MODIFY_BLOCK_DATA, CHANGE_PAGE_INFO, BklogState, BklogStateProps, changeUpdatedState, CHANGE_UPDATED_STATE, CHANGE_UPDATING_STATE, clearBklogState, CLEAR_BKLOG_STATE, getPage, getPageError, getPageSuccess, GET_PAGE, GET_PAGE_ERROR, GET_PAGE_SUCCESS, PageInfoProps, PageInfoType, releaseUpdatingError, releaseUpdatingSuccess, RELEASE_UPDATING_ERROR, RELEASE_UPDATING_SUCCESS, resetBklog, RESET_BKLOG, updateBklog, updateBklogError, updateBklogSuccess, updateVersion, updateVersionError, updateVersionSuccess, UPDATE_BKLOG, UPDATE_BKLOG_ERROR, UPDATE_BKLOG_SUCCESS, UPDATE_VERSION, UPDATE_VERSION_ERROR, UPDATE_VERSION_SUCCESS, addPageEditor, addPageEditorSuccess, addPageEditorError, ADD_PAGE_EDITOR, ADD_PAGE_EDITOR_SUCCESS, ADD_PAGE_EDITOR_ERROR } from "./utils";

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
  return updateObject<BklogState, BklogStateProps>(state, createClearStatePart<BklogStateProps>(initialState, payload));
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
    pushModifyBlockData: null,
    pullModifyBlockData: null
  });
}

function getPageErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof getPageError>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    error: payload,
    isLoading: false,
    isFetching: false
  });
}

function addPushModifyBlockDataHandler(
  state: BklogState, 
  { payload }: ReturnType<typeof addPushModifyBlockData>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    pushModifyBlockData: payload
  });
}

function changePageInfoHandler(
  state: BklogState,
  { payload }: ReturnType<typeof changePageInfo>
): BklogState {
  const pushModifyPageInfo = state.pushModifyPageInfo? 
    updateObject(state.pushModifyPageInfo, payload)
    : payload

  const pageInfo = updateObject<PageInfoType, PageInfoProps>(state.pageInfo, payload);

  return updateObject<BklogState, BklogStateProps>(state, {
    pageInfo,
    pushModifyPageInfo
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
    pushModifyBlockData: null,
    pushModifyPageInfo: null,
    version: pageVersion
  });
}

function updateBklogErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateBklogError>
): BklogState {
  if(payload.type === "Bklog" && (payload.code === "001" || payload.code === "005")) {

    if(payload.code === "001") {
      return updateObject<BklogState, BklogStateProps>(state, {
        isLoading: false,
        isUpdating: true
      });
    } else {
      return updateObject<BklogState, BklogStateProps>(state, {
        isLoading: true,
        isRefresh: true
      });
    }

  } else {
    return updateObject<BklogState, BklogStateProps>(state, {
      isFetching: false,
      isLoading: true,
      isRefresh: true,
      pushModifyBlockData: null,
      pushModifyPageInfo: null,
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
  { payload: { id, data: { modifyPageInfo, modifyBlockData } } }: ReturnType<typeof updateVersionSuccess>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isFetching: false,
    pageInfo: modifyPageInfo? updateObject<PageInfoType, PageInfoProps>(state.pageInfo, modifyPageInfo) 
    : state.pageInfo,
    version: id,
    pullModifyBlockData: modifyBlockData? modifyBlockData : state.pullModifyBlockData
  });
}

function updateVersionErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof updateVersionError>
): BklogState {
  if(payload.type === "Bklog" && payload.code === "004") {
    return updateObject<BklogState, BklogStateProps>(state, {
      isLoading: true,
      isRefresh: true
    });
  } else {
    return updateObject<BklogState, BklogStateProps>(state, {
      isLoading: true,
      isRefresh: true,
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

function addPageEditorHandler(
  state: BklogState,
  action: ReturnType<typeof addPageEditor>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isLoading: true
  });
}

function addPageEditorSuccessHandler(
  state: BklogState,
  action: ReturnType<typeof addPageEditorSuccess>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isLoading: false
  });
}

function addPageEditorErrorHandler(
  state: BklogState,
  { payload }: ReturnType<typeof addPageEditorError>
): BklogState {
  return updateObject<BklogState, BklogStateProps>(state, {
    isLoading: false,
    error: payload
  });
}

export default {
  [RESET_BKLOG]                : resetBklogHandler,
  [CLEAR_BKLOG_STATE]          : clearBklogStateHandler,
  [GET_PAGE]                   : getPageHandler,
  [GET_PAGE_SUCCESS]           : getPageSuccessHandler,
  [GET_PAGE_ERROR]             : getPageErrorHandler,
  [ADD_PUSH_MODIFY_BLOCK_DATA] : addPushModifyBlockDataHandler,
  [CHANGE_PAGE_INFO]           : changePageInfoHandler,
  [UPDATE_BKLOG]               : updateBklogHandler,
  [UPDATE_BKLOG_SUCCESS]       : updateBklogSuccessHandler,
  [UPDATE_BKLOG_ERROR]         : updateBklogErrorHandler,
  [UPDATE_VERSION]             : updateVersionHandler,
  [UPDATE_VERSION_SUCCESS]     : updateVersionSuccessHandler,
  [UPDATE_VERSION_ERROR]       : updateVersionErrorHandler,
  [CHANGE_UPDATED_STATE]       : changeUpdatedStateHandler,
  [CHANGE_UPDATING_STATE]      : changeUpdatingStateHandler,
  [RELEASE_UPDATING_SUCCESS]   : releaseUpdatingSuccessHandler,
  [RELEASE_UPDATING_ERROR]     : releaseUpdatingErrorHandler,
  [ADD_PAGE_EDITOR]            : addPageEditorHandler,
  [ADD_PAGE_EDITOR_SUCCESS]    : addPageEditorSuccessHandler,
  [ADD_PAGE_EDITOR_ERROR]      : addPageEditorErrorHandler
}