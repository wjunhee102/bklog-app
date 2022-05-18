import { combineReducers } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';

import base  from './base';
import bklog from './bklog';
import auth  from './auth';
import page  from './page';

import { allResetSaga, ALL_RESET } from '../utils';
import authSaga from './auth/authSaga';
import bklogSaga from './bklog/saga';
import pageSaga from './page/saga';

const rootReducer = combineReducers({
  base,
  auth,
  bklog,
  page
});

function* commonSaga() {
  yield takeEvery(ALL_RESET, allResetSaga);
}

export function* rootSaga() {
  yield all([
    commonSaga(), 
    authSaga(),
    bklogSaga(),
    pageSaga()
  ]); 
}


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;