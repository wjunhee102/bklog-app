import { createReducer } from "../../utils";
import handler from "./handler";
import { PageState } from "./utils";

export const initialPageState: PageState = {
  toggle: false,
  loading: false,
  tempPageInfo: null,
  pageEditor: {
    penName: null,
    id: null,
    photo: null,
    coverImage: null,
    coverColor: null,
    bio: null
  },
  pageEditable: false,
  pageList: [],
  error: null
}

const page = createReducer(initialPageState, handler);

export default page;
