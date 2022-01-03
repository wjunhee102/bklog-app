import { initialPageState } from ".";
import { updateObject } from "../../utils";
import { 
  CHANGE_PAGE_TITLE, 
  CHANGE_TOGGLE, 
  CREATE_PAGE, 
  CREATE_PAGE_ERROR, 
  CREATE_PAGE_SUCCESS, 
  PageState, 
  PageStateProps,
  createPage, 
  createPageSuccess,
  createPageError,
  changeToggle,
  changePageTitle,
  getPageList,
  getPageListSuccess,
  getPageListError,
  GET_PAGE_LIST,
  GET_PAGE_LIST_SUCCESS,
  GET_PAGE_LIST_ERROR,
  getUserProfile,
  resetPage,
  RESET_PAGE,
  clearPageState,
  CLEAR_PAGE_STATE,
  updatePageInfo,
  updatePageInfoSuccess,
  updatePageInfoError,
  UPDATE_PAGE_INFO,
  UPDATE_PAGE_INFO_SUCCESS,
  UPDATE_PAGE_INFO_ERROR,
  deletePage,
  deletePageSuccess,
  deletePageError,
  DELETE_PAGE,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_ERROR,
  getUserProfileSuccess,
  getUserProfileError,
  GET_USER_PROFILE
} from "./utils";

function resetPageHandler(
  state: PageState, 
  { type }: ReturnType<typeof resetPage>
) {
  return updateObject<PageState, PageStateProps>(state, initialPageState);  
}

function clearPageStateHandler(
  state: PageState,
  { payload }: ReturnType<typeof clearPageState>
) {
  if(initialPageState.hasOwnProperty(payload)) {
    return updateObject<PageState, PageStateProps>(state, { [payload]: initialPageState[payload]});
  } else {
    return state;
  }
}

function changeToggleHandler(
  state: PageState,
  { payload: { toggle } }: ReturnType<typeof changeToggle>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    toggle: toggle !== undefined? toggle : !state.toggle
  });
}

function changePageTitleHandler(
  state: PageState,
  { payload: { title, id } }: ReturnType<typeof changePageTitle>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    pageList: state.pageList.map(page => {
      if(page.id === id) {
        return updateObject(page, { title });
      } else {
        return page;
      }
    }) 
  });
}

function createPageHandler(
  state: PageState,
  { payload: { title, disclosureScope } }: ReturnType<typeof createPage>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: true,
    tempPageInfo: {
      title, 
      disclosureScope
    }
  });
}

function createPageSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof createPageSuccess>
): PageState {
  const pageList = state.pageList;
  
  pageList.push({
    id: payload,
    title: state.tempPageInfo.title,
    disclosureScope: state.tempPageInfo.disclosureScope
  });
  
  // disclosureScope;
  pageList.sort((a, b) => a.disclosureScope - b.disclosureScope);

  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    pageList
  });
}

function createPageErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof createPageError>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

function getUserProfileHandler(
  state: PageState,
  actions: ReturnType<typeof getUserProfile>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: true,
    error: null
  });
}

function getUserProfileSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof getUserProfileSuccess>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    pageEditor: payload
  })
}

function getUserProfileErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof getUserProfileError>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

function getPageListHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageList>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: true
  });
}

function getPageListSuccessHandler(
  state: PageState,
  { payload: { pageInfoList, userProfile } }: ReturnType<typeof getPageListSuccess>
): PageState {

  console.log("getPageList", pageInfoList, userProfile);

  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    pageList: pageInfoList,
    pageEditor: userProfile
  });
}

function getPageListErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListError>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

function updatePageInfoHandler(
  state: PageState,
  { payload }: ReturnType<typeof updatePageInfo>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    updatingPageId: payload.pageId,
    updatedVersion: null
  });
}

function updatePageInfoSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof updatePageInfoSuccess>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    updatedVersion: [state.updatingPageId, payload.pageVersion],
    updatingPageId: null
  });
}

function updatePageInfoErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof updatePageInfoError>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    updatedVersion: null,
    updatingPageId: null,
    error: payload
  });
}

function deletePageHandler(
  state: PageState,
  { payload }: ReturnType<typeof deletePage>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    error: null,
    updatingPageId: payload.pageId
  });
}

function deletePageSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof deletePageSuccess>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    pageList: state.pageList.filter((page => page.id !== state.updatingPageId)),
    updatingPageId: null
  });
}

function deletePageErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof deletePageError>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    error: payload,
    updatingPageId: null
  });
}

export default {
  [RESET_PAGE]               : resetPageHandler,
  [CLEAR_PAGE_STATE]         : clearPageStateHandler,
  [CHANGE_TOGGLE]            : changeToggleHandler,
  [CHANGE_PAGE_TITLE]        : changePageTitleHandler,
  [CREATE_PAGE]              : createPageHandler,
  [CREATE_PAGE_SUCCESS]      : createPageSuccessHandler,
  [CREATE_PAGE_ERROR]        : createPageErrorHandler,
  [GET_USER_PROFILE]         : getUserProfileHandler,
  [GET_PAGE_LIST_SUCCESS]    : getUserProfileSuccessHandler,
  [GET_PAGE_LIST_ERROR]      : getUserProfileErrorHandler,
  [GET_PAGE_LIST]            : getPageListHandler,
  [GET_PAGE_LIST_SUCCESS]    : getPageListSuccessHandler,
  [GET_PAGE_LIST_ERROR]      : getPageListErrorHandler,
  [UPDATE_PAGE_INFO]         : updatePageInfoHandler,
  [UPDATE_PAGE_INFO_SUCCESS] : updatePageInfoSuccessHandler,
  [UPDATE_PAGE_INFO_ERROR]   : updatePageInfoErrorHandler,
  [DELETE_PAGE]              : deletePageHandler,
  [DELETE_PAGE_SUCCESS]      : deletePageSuccessHandler,
  [DELETE_PAGE_ERROR]        : deletePageErrorHandler
}
