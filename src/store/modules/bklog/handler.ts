import { initialState } from ".";
import { updateObject } from "../../utils";
import { addPushModifyData, ADD_PUSH_MODIFY_DATA, BklogState, BklogStateProps, resetBklog, RESET_BKLOG } from "./utils";

function resetBlockHandler(state: BklogState, action: ReturnType<typeof resetBklog>) {
  return updateObject<BklogState, BklogStateProps>(state, initialState);
}

function addPushModifyDataHandler(state: BklogState, { payload }: ReturnType<typeof addPushModifyData>) {
  return updateObject<BklogState, BklogStateProps>(state, {
    pushModifyData: payload
  });
}

export default {
  [RESET_BKLOG]          : resetBlockHandler,
  [ADD_PUSH_MODIFY_DATA] : addPushModifyDataHandler
};