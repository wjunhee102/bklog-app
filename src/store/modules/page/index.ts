import { createReducer } from "../../utils";
import handler from "./handler";
import { PageState } from "./utils";

const initialState: PageState = {
  toggle: false,
  loading: false,
  tempPageInfo: null,
  pageEditor: {
    penName: "Junhee",
    profileId: "4c382a569f1f4ea7841b25bd2efe78d8",
    userPhoto: null,
    bio: null
  },
  pageList: [
    {
      id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      title: "관리자 사용 설명서",
      disclosureScope: 5
    },
    {
      id: "d5cc2725-97ec-494b-bc80-c16f96379e62",
      title: "사용자 사용 설명서",
      disclosureScope: 5
    },
    {
      id: "d5cc2725-97ec-494b-bc80-c16f96379e63",
      title: "사용자 이용 문의 방법",
      disclosureScope: 5
    }  
  ],
    error: null
}

const page = createReducer(initialState, handler);

export default page;
