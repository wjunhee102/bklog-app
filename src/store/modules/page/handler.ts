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
  getPageListPenName,
  getPageListPenNameSuccess,
  getPageListPenNameError,
  GET_PAGE_LIST_PENNAME,
  GET_PAGE_LIST_PENNAME_SUCCESS,
  GET_PAGE_LIST_PENNAME_ERROR,
  getPageListId,
  getPageListIdSuccess,
  getPageListIdError,
  GET_PAGE_LIST_ID,
  GET_PAGE_LIST_ID_SUCCESS,
  GET_PAGE_LIST_ID_ERROR,
  changeToggle,
  changePageTitle
} from "./utils";


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

function getPageListPenNameHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListPenName>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: true
  });
}

function getPageListPenNameSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListPenNameSuccess>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    pageList: payload
  });
}

function getPageListPenNameErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListPenNameError>
) {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

function getPageListIdHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListId>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: true
  });
}

function getPageListIdSuccessHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListIdSuccess>
): PageState {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    pageList: payload
  });
}

function getPageListIdErrorHandler(
  state: PageState,
  { payload }: ReturnType<typeof getPageListIdError>
) {
  return updateObject<PageState, PageStateProps>(state, {
    loading: false,
    error: payload
  });
}

export default {
  [CHANGE_TOGGLE]                 : changeToggleHandler,
  [CHANGE_PAGE_TITLE]             : changePageTitleHandler,
  [CREATE_PAGE]                   : createPageHandler,
  [CREATE_PAGE_SUCCESS]           : createPageSuccessHandler,
  [CREATE_PAGE_ERROR]             : createPageErrorHandler,
  [GET_PAGE_LIST_PENNAME]         : getPageListPenNameHandler,
  [GET_PAGE_LIST_PENNAME_SUCCESS] : getPageListPenNameSuccessHandler,
  [GET_PAGE_LIST_PENNAME_ERROR]   : getPageListPenNameErrorHandler,
  [GET_PAGE_LIST_ID]              : getPageListIdHandler,
  [GET_PAGE_LIST_ID_SUCCESS]      : getPageListIdSuccessHandler,
  [GET_PAGE_LIST_ID_ERROR]        : getPageListIdErrorHandler
}