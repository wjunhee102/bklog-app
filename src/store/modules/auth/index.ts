import { 
  AuthState, 
  SIGNINUSER, 
  UserAuthInfo, 
  SIGNOUTUSER, 
  SIGNINUSER_SUCCESS,
  User,
  SIGNINUSER_ERROR,
  SIGNOUTUSER_SUCCESS,
  SIGNOUTUSER_ERROR,
  RESIGNINUSER,
  RESIGNINUSER_SUCCESS,
  RESIGNINUSER_ERROR
} from './utils';
 
export function signInUser( userAuthInfo: UserAuthInfo ) {
  return {
    type: SIGNINUSER,
    payload: userAuthInfo
  }
}

export function signOutUser() {
  return {
    type: SIGNOUTUSER
  }
}

export const reSignInUser = () => {
  return {
    type: RESIGNINUSER
  }
}

const signInUserSuccess = (payload: User) => {
  return {
    type: SIGNINUSER_SUCCESS,
    payload
  }
};

const signInUserError = (payload: User) => {
  return {
    type: SIGNINUSER_ERROR,
    payload
  }
}

const signOutUserSuccess = () => {
  return {
    type: SIGNOUTUSER_SUCCESS
  }
}

const signOutUserError = () => {
  return {
    type: SIGNOUTUSER_ERROR
  }
};

const reSignInUserSuccess = (payload: User) => {
  return {
    type: RESIGNINUSER_SUCCESS,
    payload
  }
};

const reSignInUserError = (payload: User) => {
  return {
    type: RESIGNINUSER_ERROR,
    payload
  }
};


export type AuthActions = 
  ReturnType<typeof signInUser>
  | ReturnType<typeof signOutUser>
  | ReturnType<typeof signInUserSuccess>
  | ReturnType<typeof signInUserError>
  | ReturnType<typeof signOutUserSuccess>
  | ReturnType<typeof signOutUserError>
  | ReturnType<typeof reSignInUser>
  | ReturnType<typeof reSignInUserSuccess>
  | ReturnType<typeof reSignInUserError>
;

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