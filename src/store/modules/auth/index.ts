import { AuthState, SIGNIN, SIGNIN_ASYNC, SIGNOUT_ASYNC, REFRESH_TOKEN } from './utils';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
 
async function getUserInfo() {
  try {
    const response = await axios({
      method: "post",
      url: 'http://localhost:4500/v2/auth/sign-in',
      data: {
        email: "admin@admin.com",
        password: "admin12!"
      },
      withCredentials: true
    });

    console.log(response);

    const userInfo: {
      email: string,
      name: string
    } = {
      email: response.data.data.userInfo.email,
      name: response.data.data.userInfo.name
    }

    console.log("userInfo",userInfo);

    return userInfo;
  } catch(e) {
    console.log(e);
    return null
  }
  
}

async function refreshToken() {
  try {
    const response = await axios({
      method: "get",
      url: 'http://localhost:4500/v2/auth/reissue-token',
      withCredentials: true
    });

    console.log("userInfo", response);

    return response.data;
  } catch(e) {
    console.log(e);
    return null
  }
  
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
    const data = yield call(refreshToken);
    console.log("success", data);
  } catch(e) {
    console.log(e);
  }
}

function* signOutUserSaga() {
  try {
    const data = yield call(signOutUser);
    console.log("success", data);

    yield put(signInUser({
      email: "",
      name: ""
    }))

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
      yield put(signInUser({
        email: "asdasd",
        name: "sdadad"
      }))
      return 
    }
    yield put(signInUser({
      email: data.email,
      name: data.name
    }));
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

type UserInfo = {
  email: string;
  name: string;
}

export function signInUser(userInfo: UserInfo) {
  return {
    type: SIGNIN,
    payload: {
      email: userInfo.email,
      name: userInfo.name
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
    email: "test@naver.com",
    name: "test"
  }
})();

export default function auth(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN:
      console.log(action);
      return Object.assign({}, state, {
        email: action.payload.email,
        name: action.payload.name
      });
  
    default:
      return state;
  }
}