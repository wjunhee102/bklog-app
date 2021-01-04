import { combineReducers } from 'redux';

import counter  from './counter';
import todos    from './todos';
import blocklog from './blocklog';
import bklog    from './bklog';

const rootReducer = combineReducers({
  counter,
  todos,
  blocklog,
  bklog
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;