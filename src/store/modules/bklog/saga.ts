import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost, GET_PAGE, ReqUpdateBklog, UPDATE_BKLOG } from "./utils";

function updateBklog(data: ReqUpdateBklog) {
  return bklogFetchPost("t-modify", data);
}

function getPage(pageId: string) {
  return bklogFetchGet("t-getpage", {
    id: pageId
  });
}

const getPageSaga     = createPromiseSaga(GET_PAGE, getPage);
const updateBklogSaga = createPromiseSaga(UPDATE_BKLOG, updateBklog);

export default function* bklogSaga() {
  yield takeEvery(GET_PAGE, getPageSaga);
  yield takeEvery(UPDATE_BKLOG, updateBklogSaga);
}