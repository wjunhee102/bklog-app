import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost } from "../bklog/utils";
import { CREATE_PAGE, GET_PAGE_LIST, ReqCreatePage, GetPageListPayload } from "./utils";

function createPage(data: ReqCreatePage) {
  return bklogFetchPost("create-page", data);
}

function getPageList({ type, userInfo, query }: GetPageListPayload) {
  return bklogFetchGet(`list/${type}/${userInfo}`, query);
}

const createPageSaga  = createPromiseSaga(CREATE_PAGE, createPage);
const getPageListSaga = createPromiseSaga(GET_PAGE_LIST, getPageList);

export default function* pageSaga() {
  yield takeEvery(CREATE_PAGE, createPageSaga);
  yield takeEvery(GET_PAGE_LIST, getPageListSaga);
}
