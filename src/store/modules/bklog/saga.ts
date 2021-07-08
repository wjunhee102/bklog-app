import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost, GET_PAGE, ReqUpdateBklog, UPDATE_BKLOG, UPDATE_VERSION } from "./utils";

function updateBklog(data: ReqUpdateBklog) {
  return bklogFetchPost("t-modify", data);
}

function getPage(pageId: string) {
  return bklogFetchGet("t-getpage", {
    id: pageId
  });
}

function updateVersion(versions: { id: string, preId: string } ) {
  return bklogFetchGet("getmodifydata", versions);
}

const getPageSaga       = createPromiseSaga(GET_PAGE, getPage);
const updateBklogSaga   = createPromiseSaga(UPDATE_BKLOG, updateBklog);
const updateVersionSaga = createPromiseSaga(UPDATE_VERSION, updateVersion);

export default function* bklogSaga() {
  yield takeEvery(GET_PAGE, getPageSaga);
  yield takeEvery(UPDATE_BKLOG, updateBklogSaga);
  yield takeEvery(UPDATE_VERSION, updateVersionSaga);
}