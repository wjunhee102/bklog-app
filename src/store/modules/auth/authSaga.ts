import { takeEvery, call, put } from 'redux-saga/effects';
import { 
  authFetchGet, 
  authFetchPost, 
  SIGNINUSER, 
  SIGNOUTUSER, 
  UserAuthInfo,
  RequiredUserInfo,
  SIGNUPUSER,
  RESIGNINUSER,
  REISSUETOKEN,
  SIGNINUSER_ERROR,
  CHECK_EMAIL_USED,
  CHECK_PENNAME_USED
} from './utils/index';
import { ALL_RESET, createPromiseSaga } from '../../utils';
import { ApiError } from '../../../utils/api-utils';

function checkEmailUsed(email: string) {
  return authFetchGet("check-email", { email });
}

function checkPenNameUsed(penName: string) {
  return authFetchGet("check-penname", { penName });
}

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
    
    if(error.type !== "System") {
      yield put({ type: ALL_RESET });
    } else {
      yield put({ type: SIGNINUSER_ERROR, payload: new ApiError(error).get });
  
      if(payload) {
        yield put({ type: `${payload.type}_ERROR`, error: new ApiError(error).get });
      }  
    }

  }
}

const AUTH_ERROR = "auth/AUTH_ERROR" as const;

const checkEmailUsedSaga   = createPromiseSaga(CHECK_EMAIL_USED, checkEmailUsed);
const checkPenNameUsedSaga = createPromiseSaga(CHECK_PENNAME_USED, checkPenNameUsed);
const signInUserSaga       = createPromiseSaga(SIGNINUSER, signInUser, AUTH_ERROR);
const signOutUserSaga      = createPromiseSaga(SIGNOUTUSER, signOutUser, AUTH_ERROR);
const signUpUserSaga       = createPromiseSaga(SIGNUPUSER, signUpUser, AUTH_ERROR);
const reSignInUserSaga     = createPromiseSaga(RESIGNINUSER, reSignInUser, AUTH_ERROR);

export default function* authSaga() {
  yield takeEvery(CHECK_EMAIL_USED, checkEmailUsedSaga);
  yield takeEvery(CHECK_PENNAME_USED, checkPenNameUsedSaga);
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
  yield takeEvery(REISSUETOKEN, reissueTokenSaga);
}