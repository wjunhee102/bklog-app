import { takeEvery, call, put } from 'redux-saga/effects';
import { 
  authFetchGet, 
  authFetchPost, 
  SIGNINUSER, 
  SIGNOUTUSER, 
  UserAuthInfo, 
  User,
  RequiredUserInfo,
  ResSignUpUser,
  SIGNUPUSER,
  RESIGNINUSER,
  REISSUETOKEN,
  SIGNINUSER_ERROR,
  RESET_AUTH
} from './utils/index';
import { ResType } from '../../../utils/api-utils';
import { SERVER_DISCONNECTED } from '../base/utils';

function createPromiseSateAuth(type: string, promiseCreator: any) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: any) {
    try {
      const response = yield call(promiseCreator, action.payload);

      const payload = response.data? response.data : null;
      const success = response.data? response.data.success : false;
      const error = response.data? 
        response.data.error? 
        response.data.error 
        : null 
        : response.error;

      if(payload) {
        payload.success = undefined;
      }
      
      if(success) {
        yield put({ type: SUCCESS, payload });
      } else {

        if(error.accessTokken) {
          yield put({ type: REISSUETOKEN, payload: action });
        } else {
          if(payload) {
            yield put({ type: ERROR, payload });
          } else {
            yield put({ type: ERROR, payload: { error }});
          }
          
        }
  
      }
    } catch(e) {
      yield put({ type: RESET_AUTH });
      yield put({ type: SERVER_DISCONNECTED, payload: {
        error: e
      }});

    }
  }
}


async function signInUser(userAuthInfo: UserAuthInfo): Promise<ResType<User>> {
  return await authFetchPost("sign-in", userAuthInfo);
}

async function signOutUser(): Promise<ResType> {
  return await authFetchGet("sign-out");
}

async function signUpUser(requiredUserInfo: RequiredUserInfo): Promise<ResType<ResSignUpUser>> {
  return await authFetchPost("sign-up", requiredUserInfo);
}

async function reSignInUser(): Promise<ResType<User>> {
  return await authFetchGet("resign-in");
}

async function validationAccessToken(): Promise<ResType> {
  return await authFetchGet("check-token");
}

async function reissueToken(): Promise<ResType> {
  return await authFetchGet("reissue-token");
}


function* reissueTokenSaga(action: any) {
  try {
    console.log(action);
    const response = yield call(reissueToken);
    const data = response.data? response.data : null;
    const success = response.data? response.data.success : null;

    if(success) {
      console.log("success", action, data);
      if(action.payload) {
        yield put({ type: action.payload.type, payload: action.payload.payload });
      }
      
    } else {
      console.log("error1", action);
      yield put({ type: SIGNINUSER_ERROR, payload: {
        userInfo: null,
        error: null
      }});

      if(action.payload) {
        yield put({ type: `${action.action.type}_ERROR`, payload: {
          error: {
            auth: true
          }
        }});
      }
    }

  } catch(e) {
    console.log("error2", e);
    yield put({ type: SERVER_DISCONNECTED, payload: {
      error: e
    }})
    if(action.payload) {
      yield put({ type: `${action.payload.type}_ERROR`, payload: {
        error: e
      }});
    }    
  }
}

const signInUserSaga = createPromiseSateAuth(SIGNINUSER, signInUser);
const signOutUserSaga = createPromiseSateAuth(SIGNOUTUSER, signOutUser);
const signUpUserSaga = createPromiseSateAuth(SIGNUPUSER, signUpUser);
const reSignInUserSaga = createPromiseSateAuth(RESIGNINUSER, reSignInUser);

export default function* authSaga() {
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
  yield takeEvery(REISSUETOKEN, reissueTokenSaga);
}