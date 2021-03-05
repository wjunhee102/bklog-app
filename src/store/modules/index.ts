import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import base  from './base';
import bklog from './bklog';
import auth  from './auth';
import page  from './page';

import authSaga from './auth/authSaga';

const rootReducer = combineReducers({
  base,
  auth,
  bklog,
  page
});

export function* rootSage() {
  yield all([authSaga()]); 
}


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;