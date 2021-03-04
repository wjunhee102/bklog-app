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
  SIGNINUSER_ERROR
} from './utils/index';
import { ResType } from '../../../utils/api-utils';
import { createPromiseSaga } from '../../utils';


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
    const { data } = yield call(reissueToken);

    if(data.success) {
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
    if(action.payload) {
      yield put({ type: `${action.payload.type}_ERROR`, payload: {
        error: e
      }});
    }    
  }
}

const signInUserSaga = createPromiseSaga(SIGNINUSER, signInUser);
const signOutUserSaga = createPromiseSaga(SIGNOUTUSER, signOutUser);
const signUpUserSaga = createPromiseSaga(SIGNUPUSER, signUpUser);
const reSignInUserSaga = createPromiseSaga(RESIGNINUSER, reSignInUser);

export default function* authSaga() {
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
  yield takeEvery(REISSUETOKEN, reissueTokenSaga);
}