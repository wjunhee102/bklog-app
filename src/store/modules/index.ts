import { combineReducers } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';

import base  from './base';
import bklog from './bklog';
import auth  from './auth';
import page  from './page';

import authSaga from './auth/authSaga';
import { allResetSaga, ALL_RESET } from '../utils';

const rootReducer = combineReducers({
  base,
  auth,
  bklog,
  page
});

function* commonSaga() {
  yield takeEvery(ALL_RESET, allResetSaga);
}

export function* rootSage() {
  yield all([
    commonSaga(), 
    authSaga()
  ]); 
}


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;