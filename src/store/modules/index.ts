import { combineReducers } from 'redux';

import counter  from './counter';
import todos    from './todos';
import blocklog from './blocklog';

const rootReducer = combineReducers({
  counter,
  todos,
  blocklog
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;