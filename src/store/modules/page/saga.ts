import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { bklogFetchGet, bklogFetchPost } from "../bklog/utils";
import { CREATE_PAGE, GET_PAGE_LIST_PENNAME, GET_PAGE_LIST_ID, ReqCreatePage, ReqGetPageList } from "./utils";

function createPage(data: ReqCreatePage) {
  return bklogFetchPost("create-page", data);
}

function getPageListPenName({penName, reqGetPageListData}: { penName: string, reqGetPageListData: ReqGetPageList}) {
  return bklogFetchGet(`list/penname/${penName}`, reqGetPageListData);
}

function getPageListId({id, reqGetPageListData}: { id: string, reqGetPageListData: ReqGetPageList}) {
  return bklogFetchGet(`list/profileId/${id}`, reqGetPageListData);
}

const createPageSaga           = createPromiseSaga(CREATE_PAGE, createPage);
const getPageListPenNameSaga   = createPromiseSaga(GET_PAGE_LIST_PENNAME, getPageListPenName);
const getPageListIdSaga        = createPromiseSaga(GET_PAGE_LIST_ID, getPageListId);

export default function* pageSaga() {
  yield takeEvery(CREATE_PAGE, createPageSaga);
  yield takeEvery(GET_PAGE_LIST_PENNAME, getPageListPenNameSaga);
  yield takeEvery(GET_PAGE_LIST_ID, getPageListIdSaga);
}