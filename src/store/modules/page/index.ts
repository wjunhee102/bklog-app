import { createReducer } from "../../utils";
import handler from "./handler";
import { PageActions, PageState } from "./utils";

export const initialPageState: PageState = {
  toggle: false,
  editToggle: false,
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
  updatingPageId: null,
  updatedVersion: null,
  error: null
}

const page = createReducer<PageState, PageActions>(initialPageState, handler);

export default page;
