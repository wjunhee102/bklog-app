import { CHANGE_PAGE_TITLE, PageState, CHANGE_TOGGLE } from "./utils";

export function changeToggle() {
  return {
    type: CHANGE_TOGGLE
  }
}

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
  | ReturnType<typeof changeToggle>;

const initialState: PageState = {
  toggle: true,
  loading: false,
  pageEditor: {
    penName: "Junhee",
    profileId: "4c382a569f1f4ea7841b25bd2efe78d8",
    bio: "프론트엔드 개발자",
    userPhoto: "https://avatars.githubusercontent.com/u/59816563?v=4"
  },
  pageList: [
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      pageTitle: "관리자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
      pageTitle: "사용자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e63",
      pageTitle: "사용자 이용 문의 방법"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e64",
      pageTitle: "감사합니다."
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e65",
      pageTitle: "test5"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      pageTitle: "관리자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
      pageTitle: "사용자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e63",
      pageTitle: "사용자 이용 문의 방법"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e64",
      pageTitle: "감사합니다."
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e65",
      pageTitle: "test5"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      pageTitle: "관리자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
      pageTitle: "사용자 사용 설명서"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e63",
      pageTitle: "사용자 이용 문의 방법"
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e64",
      pageTitle: "감사합니다."
    },
    {
      pageId: "d5cc2725-97ec-494b-bc80-c16f96379e65",
      pageTitle: "test5"
    }
  ]
};

export default function page(state: PageState = initialState, action: PageActions) {

  switch(action.type) {
    case CHANGE_TOGGLE:
      return Object.assign({}, state, {
        toggle: !state.toggle
      });

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