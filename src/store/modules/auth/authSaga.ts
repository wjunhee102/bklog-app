import { takeEvery } from 'redux-saga/effects';
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
  RESIGNINUSER
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

const signInUserSaga = createPromiseSaga(SIGNINUSER, signInUser);
const signOutUserSaga = createPromiseSaga(SIGNOUTUSER, signOutUser);
const signUpUserSaga = createPromiseSaga(SIGNUPUSER, signUpUser);
const reSignInUserSaga = createPromiseSaga(RESIGNINUSER, reSignInUser);

export default function* authSaga() {
  yield takeEvery(SIGNINUSER, signInUserSaga);
  yield takeEvery(SIGNOUTUSER, signOutUserSaga);
  yield takeEvery(SIGNUPUSER, signUpUserSaga);
  yield takeEvery(RESIGNINUSER, reSignInUserSaga);
}