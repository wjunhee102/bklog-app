import { ADD_PUSH_MODIFY_DATA, ReqUpdateBklog, RESET_BKLOG, UPDATE_BKLOG } from ".";
import { ModifyDataType } from "../../../../components/newBlock/types";
import { asyncActions } from "../../../utils";

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

// function updateBklog(reqData: ReqUpdateBklog) {
//   return {
//     type: UPDATE_BKLOG,
//     payload: reqData
//   }
// }

const [
  updateBklog,
  updateBklogSuccess,
  updateBklogError
] = asyncActions<ReqUpdateBklog, { pageVersion: string }>(UPDATE_BKLOG);

export default {
  resetBklog,
  addPushModifyData,
  updateBklog,
  updateBklogSuccess,
  updateBklogError
};