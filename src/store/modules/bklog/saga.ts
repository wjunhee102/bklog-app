import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost, GET_PAGE, RELEASE_UPDATING, UpdateBklogPayload, UPDATE_BKLOG, UPDATE_VERSION } from "./utils";

function updateBklog(data: UpdateBklogPayload) {
  return bklogFetchPost(`page/${data.pageId}`, data);
}

function getPage(pageId: string) {
  return bklogFetchGet(`page/${pageId}`);
}

function getModifyData({ id, preId }: { id: string, preId: string } ) {
  return bklogFetchGet(`modifydata/${id}`, { preId });
}

function releaseUpdating(pageId: string) {
  return bklogFetchGet(`release-updating/${pageId}`);
}

const getPageSaga         = createPromiseSaga(GET_PAGE, getPage);
const updateBklogSaga     = createPromiseSaga(UPDATE_BKLOG, updateBklog);
const updateVersionSaga   = createPromiseSaga(UPDATE_VERSION, getModifyData);
const releaseUpdatingSaga = createPromiseSaga(RELEASE_UPDATING, releaseUpdating);

export default function* bklogSaga() {
  yield takeEvery(GET_PAGE, getPageSaga);
  yield takeEvery(UPDATE_BKLOG, updateBklogSaga);
  yield takeEvery(UPDATE_VERSION, updateVersionSaga);
  yield takeEvery(RELEASE_UPDATING, releaseUpdatingSaga);
}