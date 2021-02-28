import { AuthState, SIGNIN, SIGNIN_ASYNC, SIGNOUT_ASYNC, REFRESH_TOKEN, User } from './utils';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { baseFetch } from '../../../utils/api-utils/apiUtils';
import { ResType } from '../../../utils/api-utils';
 
async function getUserInfo() {

  const data: ResType<{
    success: boolean;
    userInfo: any;
    error?: any;
  }> = await baseFetch({
    method: "post",
    url: 'auth/sign-in',
    data: {
      email: "admin@admin.com",
      password: "Admin123!"
    },
    withCredentials: true
  })

  console.log("response", data);
  return data.userInfo;
}

async function refreshToken(userId: string) {

  const data = await baseFetch({
    method: "post",
    data: {
      userId
    },
    url: "auth/reissue-token",
    withCredentials: true
  }) 

  console.log("userInfo", data);
  if(!data.success) {
    console.log(data.error);
  }

  return data;
  
}

async function signOutUser() {
  try {
    const response = await axios({
      method: "get",
      url: 'http://localhost:4500/v2/auth/sign-out',
      withCredentials: true
    });

    console.log("userInfo", response);

    return response.data;
  } catch(e) {
    console.log(e);
    return null
  }
  
}

function* refreshTokenSage() {
  try {
    const data = yield call(refreshToken, "4782b042d62467c2a62e1e6dd80701c5");
    console.log("success", data);
  } catch(e) {
    console.log(e);
  }
}

function* signOutUserSaga() {
  try {
    const data = yield call(signOutUser);
    console.log("success", data);

    yield put(signInUser(null))

  } catch(e) {
    console.log(e);
  }
}

//인자로 액션을 받아서 실행하면 될듯? 아닌가?? 흠인자를 두개 받으면 될듯
function* getPostsSaga() {
  try {
    const data = yield call(getUserInfo);
    console.log("data", data);
    if(!data) {
      yield put(signInUser(null))
      return 
    }
    yield put(signInUser(data.userInfo));
  } catch(e) {
    console.log(e);
  }
}

export function* postsSaga() {
  yield takeEvery(SIGNIN_ASYNC, getPostsSaga);
  yield takeEvery(SIGNOUT_ASYNC, signOutUserSaga);
  yield takeEvery(REFRESH_TOKEN, refreshTokenSage);
}

export const signInAsync = () => {
  return { type: SIGNIN_ASYNC }
}

export const signOutAsync = () => {
  return { type: SIGNOUT_ASYNC }
}

export const refreshTokenAsync = () => {
  return { type: REFRESH_TOKEN }
}

export function signInUser(userInfo: User | null) {
  return {
    type: SIGNIN,
    payload: {
      user: userInfo
    }
  }
}

export function signInUserAsync() {
  return {
    type: SIGNIN_ASYNC
  }
}

export type AuthActions = ReturnType<typeof signInUser>
  | ReturnType<typeof signInUserAsync>;

const initialState: AuthState = (() => {
  return {
    user: null
  }
})();

export default function auth(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN:
      const { user } = action.payload;
      console.log(action);
      return Object.assign({}, state, {
        user
      });
  
    default:
      return state;
  }
}