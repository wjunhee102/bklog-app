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
      const payload = yield call(promiseCreator, action.payload);
      
      yield put({ type: SUCCESS, payload });

    } catch(error) {
      if(error.type === "AUTH" && error.code === "001") {
        yield put({ type: REISSUETOKEN, payload: action });
      } else {
        yield put({ type: RESET_AUTH });
        yield put({ type: SERVER_DISCONNECTED, payload: {
          error: error
        }});
      }

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
    yield call(reissueToken);

    if(action.payload) {
      yield put({ type: action.payload.type, payload: action.payload.payload });
    }


  } catch(error) {
    yield put({ type: SIGNINUSER_ERROR, payload: {
      userInfo: null,
      error: null
    }});

    if(action.payload) {
      yield put({ type: `${action.action.type}_ERROR`, payload: error });
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