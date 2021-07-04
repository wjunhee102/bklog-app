import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchPost, ReqUpdateBklog, UPDATE_BKLOG } from "./utils";

function updateBklog(data: ReqUpdateBklog) {
  return bklogFetchPost("t-modify", data);
}

const updateBklogSaga = createPromiseSaga(UPDATE_BKLOG, updateBklog);

export default function* bklogSaga() {
  yield takeEvery(UPDATE_BKLOG, updateBklogSaga);
}