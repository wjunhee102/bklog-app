import { createReducer } from '../../utils';
import handlers from './handlers';
import { AuthState } from './utils';

export const initialAuthState: AuthState = {
  loading: false,
  user: null,
  error: null,
  signUpState: {
    penNameUsed: false,
    emailUsed: true
  },
  signUpSuccess: null,
  waitingCount: 0,
  errorToggle: false
}

const auth = createReducer(initialAuthState, handlers);

export default auth;