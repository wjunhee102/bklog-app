import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import counter  from './counter';
import todos    from './todos';
import blocklog from './blocklog';
import bklog    from './bklog';
import auth, { postsSaga } from './auth';

const rootReducer = combineReducers({
  counter,
  todos,
  blocklog,
  bklog,
  auth
});
export function* rootSage() {
  yield all([postsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;