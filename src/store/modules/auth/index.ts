import { createReducer } from '../../utils';
import handlers from './handlers';
import { AuthState } from './utils';

export const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  signUpState: {
    penNameUsed: false,
    emailUsed: true
  },
  signUpSuccess: null,
  waitingCount: 0
}

const auth = createReducer(initialState, handlers);

export default auth;