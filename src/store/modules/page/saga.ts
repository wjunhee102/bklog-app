import { takeEvery } from "redux-saga/effects";
import { createPromiseSaga } from "../../utils";
import { UserProfile } from "../auth/utils";
import { bklogFetchDelete, bklogFetchGet, bklogFetchPost } from "../bklog/utils";
import { userFetchGet } from "../user/utils";
import { CREATE_PAGE, GET_PAGE_LIST, ReqCreatePage, GetPageListPayload, GET_USER_PROFILE, ReqUpdatePageInfo, UPDATE_PAGE_INFO, ResGetPageList, ReqDeletePage, DELETE_PAGE } from "./utils";

function createPage(data: ReqCreatePage) {
  return bklogFetchPost("create-page", data);
}

function getUserProfile({ type, userInfo }: GetPageListPayload) {
  return userFetchGet(`get-userprofile/${type}/${userInfo}`);
}

function getPageList({ type, userInfo, query }: GetPageListPayload) {
  return bklogFetchGet(`list/${type}/${userInfo}`, query);
}

function updatePageInfo(data: ReqUpdatePageInfo) {
  return bklogFetchPost("updatepageinfo", data);
}

function deletePage(data: ReqDeletePage) {
  return bklogFetchDelete("delete-page", data);
}

const createPageSaga     = createPromiseSaga<string>(CREATE_PAGE, createPage);
const getUserProfileSaga = createPromiseSaga<UserProfile>(GET_USER_PROFILE, getUserProfile);
const getPageListSaga    = createPromiseSaga<ResGetPageList>(GET_PAGE_LIST, getPageList);
const updatePageInfoSage = createPromiseSaga<string>(UPDATE_PAGE_INFO, updatePageInfo);
const deletePageSaga     = createPromiseSaga<string>(DELETE_PAGE, deletePage);

export default function* pageSaga() {
  yield takeEvery(CREATE_PAGE, createPageSaga);
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
  yield takeEvery(GET_PAGE_LIST, getPageListSaga);
  yield takeEvery(UPDATE_PAGE_INFO, updatePageInfoSage);
  yield takeEvery(DELETE_PAGE, deletePageSaga);
}
