import { ADD_PUSH_MODIFY_DATA, RESET_BKLOG } from ".";
import { ModifyDataType } from "../../../../components/newBlock/types";

function resetBklog() {
  return {
    type: RESET_BKLOG
  };
}

function addPushModifyData(modifyData: ModifyDataType) {
  return {
    type: ADD_PUSH_MODIFY_DATA,
    payload: modifyData
  };
}

export default {
  resetBklog,
  addPushModifyData
};