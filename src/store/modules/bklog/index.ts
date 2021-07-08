import { createReducer, updateObject } from "../../utils";
import handler from "./handler";
import { BklogState } from "./utils";

export const initialState: BklogState = {
  isLoading: false,
  isFetching: false,
  isRefresh: false,
  isUpdated: false,
  pageInfo: null,
  version: null,
  pageStar: null,
  pageComments: null,
  blockList: null,
  blockComments: null,
  pullModifyData: null,
  pushModifyData: null,
  error: null
};

const bklog = createReducer(initialState, handler);

export default bklog;