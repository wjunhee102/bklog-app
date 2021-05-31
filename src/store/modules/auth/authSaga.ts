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
import { createPromiseSaga } from '../../utils';
import { ApiError } from '../../../utils/api-utils';


function signInUser(userAuthInfo: UserAuthInfo) {
  return authFetchPost("sign-in", userAuthInfo);
}

function signOutUser() {
  return authFetchGet("sign-out");
}

function signUpUser(requiredUserInfo: RequiredUserInfo) {
  return authFetchPost("sign-up", requiredUserInfo);
}

function reSignInUser() {
  return authFetchGet("resign-in");
}

function validationAccessToken() {
  return authFetchGet("check-token");
}

function reissueToken() {
  return authFetchGet("reissue-token");
}


function* reissueTokenSaga({ payload }: any) {
  try {
    yield call(reissueToken);

    if(payload) {
      yield put({ type: payload.type, payload: payload.payload? payload.payload : undefined });
    }

  } catch(error) {

    yield put({ type: SIGNINUSER_ERROR, payload: {
      userInfo: null,
      error: null
    }});

    if(payload) {
      yield put({ type: `${payload.type}_ERROR`, error: new ApiError().build(error).get });
    }  

  }
}

const AUTH_ERROR = "auth/AUTH_ERROR" as const;

const signInUserSaga = createPromiseSaga(SIGNINUSER, signInUser, AUTH_ERROR);
const signOutUserSaga = createPromiseSaga(SIGNOUTUSER, signOutUser, AUTH_ERROR);
const signUpUserSaga = createPromiseSaga(SIGNUPUSER, signUpUser, AUTH_ERROR);
const reSignInUserSaga = createPromiseSaga(RESIGNINUSER, reSignInUser, AUTH_ERROR);

export default function* authSaga() {
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
  yield takeEvery(REISSUETOKEN, reissueTokenSaga);
}