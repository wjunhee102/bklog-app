import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost, GET_PAGE, RELEASE_UPDATING, UpdateBklogPayload, UPDATE_BKLOG, UPDATE_VERSION } from "./utils";

function updateBklog(data: UpdateBklogPayload) {
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

function releaseUpdating(pageId: string) {
  return bklogFetchGet(`t-release-updating/${pageId}`);
}

const getPageSaga         = createPromiseSaga(GET_PAGE, getPage);
const updateBklogSaga     = createPromiseSaga(UPDATE_BKLOG, updateBklog);
const updateVersionSaga   = createPromiseSaga(UPDATE_VERSION, updateVersion);
const releaseUpdatingSaga = createPromiseSaga(RELEASE_UPDATING, releaseUpdating);

export default function* bklogSaga() {
  yield takeEvery(GET_PAGE, getPageSaga);
  yield takeEvery(UPDATE_BKLOG, updateBklogSaga);
  yield takeEvery(UPDATE_VERSION, updateVersionSaga);
  yield takeEvery(RELEASE_UPDATING, releaseUpdatingSaga);
}