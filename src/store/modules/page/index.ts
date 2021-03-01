import { CHANGE_PAGE_TITLE, PageState } from "./utils";

export function changePageTitle(pageId: string, title: string) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload: {
      title,
      pageId
    }
  }
}

type PageActions = ReturnType<typeof changePageTitle>

const initialState: PageState = {
  pageEditor: "admin",
  pageList: [
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      pageTitle: "test1"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
      pageTitle: "test2"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e63",
      pageTitle: "test3"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e64",
      pageTitle: "test4"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e65",
      pageTitle: "test5"
    }
  ]
};

export default function page(state: PageState = initialState, action: PageActions) {

  switch(action.type) {
    case CHANGE_PAGE_TITLE:
      const { title, pageId } = action.payload;

      return Object.assign({}, state, {
        pageList: state.pageList.map(page => {
          if(page.pageId === pageId) {
            return Object.assign({}, page, {
              pageTitle: title
            });
          } else {
            return page
          }
        })
      });

    default: 
      console.log(state);
      return state;
  }

}