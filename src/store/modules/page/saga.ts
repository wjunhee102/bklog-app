import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost } from "../bklog/utils";
import { userFetchGet } from "../user/utils";
import { CREATE_PAGE, GET_PAGE_LIST, ReqCreatePage, GetPageListPayload, GET_USER_PROFILE } from "./utils";

function createPage(data: ReqCreatePage) {
  return bklogFetchPost("create-page", data);
}

function getUserProfile({ type, userInfo }: GetPageListPayload) {
  return userFetchGet(`get-userprofile/${type}/${userInfo}`);
}

function getPageList({ type, userInfo, query }: GetPageListPayload) {
  return bklogFetchGet(`list/${type}/${userInfo}`, query);
}

const createPageSaga     = createPromiseSaga(CREATE_PAGE, createPage);
const getUserProfileSaga = createPromiseSaga(GET_USER_PROFILE, getUserProfile);
const getPageListSaga    = createPromiseSaga(GET_PAGE_LIST, getPageList);

export default function* pageSaga() {
  yield takeEvery(CREATE_PAGE, createPageSaga);
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
  yield takeEvery(GET_PAGE_LIST, getPageListSaga);
}
