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
  RESET_PAGE
} from "./utils";

function resetPageHandler(
  state: PageState, 
  { type }: ReturnType<typeof resetPage>
) {
  return updateObject<PageState, PageStateProps>(state, initialPageState);  
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
    loading: true
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
) {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

export default {
  [RESET_PAGE]            : resetPageHandler,
  [CHANGE_TOGGLE]         : changeToggleHandler,
  [CHANGE_PAGE_TITLE]     : changePageTitleHandler,
  [CREATE_PAGE]           : createPageHandler,
  [CREATE_PAGE_SUCCESS]   : createPageSuccessHandler,
  [CREATE_PAGE_ERROR]     : createPageErrorHandler,
  [GET_PAGE_LIST]         : getPageListHandler,
  [GET_PAGE_LIST_SUCCESS] : getPageListSuccessHandler,
  [GET_PAGE_LIST_ERROR]   : getPageListErrorHandler
}
