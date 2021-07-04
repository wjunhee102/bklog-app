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
  RESET_AUTH,
} from './utils';

const initialState = ((): AuthState  => {
  return {
    loading: false,
    user: null,
    error: {
      signInUser: null,
      signUpUser: {
        emailValid: false,
        passwordValid: false,
        penNameValid: false,
        emailUsed: false,
        penNameUsed: false
      },
      signOutUser: null
    }
  }
})();

const initialError = ()=> {
  return  {
    signInUser: null,
    signUpUser: {
      emailValid: false,
      passwordValid: false,
      penNameValid: false,
      emailUsed: false,
      penNameUsed: false
    },
    signOutUser: null
  }
};


//server와 연결이 끊겼을 때 error 핸들링 필요.
export default function auth(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNUPUSER:
      return Object.assign({}, initialState, { loading: true, 
        error: initialError()
      });
    case SIGNUPUSER_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case SIGNUPUSER_ERROR: 
      return Object.assign({}, state, { 
        loading: false,
        error: Object.assign({}, state.error, {
          signUpUser: action.payload.error
        })
       });

    case SIGNINUSER:
    case RESIGNINUSER:
      console.log("SIGN-IN")
      return Object.assign({}, initialState, { loading: true,
        user: null, 
        error: initialError()
      });

    case SIGNINUSER_SUCCESS:
    case SIGNINUSER_ERROR:
    case RESIGNINUSER_SUCCESS:
    case RESIGNINUSER_ERROR:
      console.log("aaa", action);
      const { userInfo, error } = action.payload;
      return Object.assign({}, state, {loading: false, 
        user: action.payload, 
        error: Object.assign({}, state.error, {
          signInUser: error
        })
      });

    case SIGNOUTUSER:
      return initialState;

    case SIGNOUTUSER_SUCCESS:
      return Object.assign({}, state, { loading: false });
      
    case SIGNOUTUSER_ERROR: 
      return Object.assign({}, state, { loading: false, 
        error: Object.assign({}, state.error, {
          signOut: "서버와 통신이 불안정합니다."
        })
      });

    case RESET_AUTH:
      return initialState;
  
    default:
      console.log(state);
      return state;
  }
}