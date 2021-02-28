import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import bklog    from './bklog';
import auth, { postsSaga } from './auth';
import page from './page';

const rootReducer = combineReducers({
  auth,
  bklog,
  page
});

export function* rootSage() {
  yield all([postsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;