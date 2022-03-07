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
  CHECK_EMAIL_USED,
  CHECK_PENNAME_USED,
  RESIGNINUSER_ERROR
} from './utils/index';
import { ALL_RESET, createPromiseSaga } from '../../utils';
import { ApiError, ApiErrorType } from '../../../utils/api-utils';
import { getCountOfReissueToken, setCountOfReissueToken } from '../../..';

function checkEmailUsed(email: string) {
  return authFetchGet("check-email", { email });
}

function checkPenNameUsed(penName: string) {
  return authFetchGet("check-penname", { penname: penName });
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
    if(getCountOfReissueToken() > 5) { 

      yield put({ type: ALL_RESET });
      
      setCountOfReissueToken(0);

      return;
    };

    yield call(reissueToken);

    if(payload) {
      yield put({ type: payload.type, payload: payload.payload? payload.payload : undefined });
    }

  } catch(error: any) {
    
    if(error && error.type !== "System") {
      yield put({ type: ALL_RESET });
    } else {
      yield put({ type: RESIGNINUSER_ERROR, payload: new ApiError(error).get });
  
      if(payload) {
        yield put({ type: `${payload.type}_ERROR`, error: new ApiError(error).get });
      }  
    }

  }
}

const checkEmailUsedSaga   = createPromiseSaga(CHECK_EMAIL_USED, checkEmailUsed);
const checkPenNameUsedSaga = createPromiseSaga(CHECK_PENNAME_USED, checkPenNameUsed);
const signInUserSaga       = createPromiseSaga(SIGNINUSER, signInUser);
const signOutUserSaga      = createPromiseSaga(SIGNOUTUSER, signOutUser);
const signUpUserSaga       = createPromiseSaga(SIGNUPUSER, signUpUser);
const reSignInUserSaga     = createPromiseSaga(RESIGNINUSER, reSignInUser);

export default function* authSaga() {
  yield takeEvery(CHECK_EMAIL_USED, checkEmailUsedSaga);
  yield takeEvery(CHECK_PENNAME_USED, checkPenNameUsedSaga);
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
  yield takeEvery(REISSUETOKEN, reissueTokenSaga);
}