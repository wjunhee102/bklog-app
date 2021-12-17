import { createReducer } from "../../utils";
import handler from "./handler";
import { BklogState } from "./utils";

export const initialState: BklogState = {
  isLoading: false,
  isFetching: false,
  isRefresh: false,
  isUpdated: false,
  isUpdating: false,
  pageInfo: null,
  version: null,
  pageStar: null,
  pageComments: null,
  pageEditorList: null,
  blockList: null,
  blockComments: null,
  pushModifyBlockData: null,
  pushModifyPageInfo: null,
  pullModifyBlockData: null,
  editingUserList: [],
  error: null
};

const bklog = createReducer(initialState, handler);

export default bklog;