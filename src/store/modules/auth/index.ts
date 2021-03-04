import { 
  AuthState, 
  AuthActions,
  SIGNINUSER, 
  SIGNOUTUSER, 
  SIGNINUSER_SUCCESS,
  SIGNINUSER_ERROR,
  SIGNOUTUSER_SUCCESS,
  SIGNOUTUSER_ERROR,
  RESIGNINUSER,
  RESIGNINUSER_SUCCESS,
  RESIGNINUSER_ERROR,
  SIGNUPUSER,
  SIGNUPUSER_SUCCESS,
  SIGNUPUSER_ERROR,
} from './utils';

const initialState: AuthState = (() => {
  return {
    loading: false,
    user: {
      userInfo: null,
      error: {
        signIn: null,
        signUp: null,
        signOut: null
      }
    }
  }
})();

export default function auth(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNUPUSER:
      return Object.assign({}, state, { loading: true });
    case SIGNUPUSER_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case SIGNUPUSER_ERROR: 
      return Object.assign({}, state, { 
        loading: false, 
        user: Object.assign({}, state.user, {error: action.payload.error})
      });

    case SIGNINUSER:
    case RESIGNINUSER:
      return Object.assign({}, state, { loading: true, user: {
        userInfo: null
      } });

    case SIGNINUSER_SUCCESS:
    case SIGNINUSER_ERROR:
    case RESIGNINUSER_SUCCESS:
    case RESIGNINUSER_ERROR:
      const { userInfo, error } = action.payload;
      return Object.assign({}, state, {loading: false, user: {userInfo: userInfo, error: Object.assign({}, state.user.error, {
        signIn: error
      })}});

    case SIGNOUTUSER:
      return Object.assign({}, state, { loading: true, user: {
        userInfo: null,
        error: null
      } });

    case SIGNOUTUSER_SUCCESS:
      return Object.assign({}, state, { loading: false });
      
    case SIGNOUTUSER_ERROR: 
      return Object.assign({}, state, { loading: false, user: {
        userInfo: null,
        erorr: "서버와 통신이 불안정합니다."
      }});
  
    default:
      console.log(state);
      return state;
  }
}