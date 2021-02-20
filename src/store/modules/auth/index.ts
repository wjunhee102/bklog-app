import { AuthState, SIGNIN, SIGNIN_ASYNC } from './utils';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const sleep = (n: number) => new Promise(resolve => resolve);

const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어를 배워봅시다',
    body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.'
  },
  {
    id: 2,
    title: 'redux-thunk를 사용해봅시다',
    body: 'redux-thunk를 사용해서 비동기 작업을 처리해봅시다!'
  },
  {
    id: 3,
    title: 'redux-saga도 사용해봅시다',
    body:
      '나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.'
  }
];

// 포스트 목록을 가져오는 비동기 함수
export const TestPosts = async () => {
  await sleep(500); // 0.5초 쉬고
  return posts; // posts 배열
};

// ID로 포스트를 조회하는 비동기 함수
export const TestPostById = async (id: any) => {
  await sleep(500); // 0.5초 쉬고
  return posts.find(post => post.id === id); // id 로 찾아서 반환
};

export const getPosts = () => async () => {
  try {
    const posts = TestPosts(); // API 호출
    console.log(posts);
    return {
      email: "test@test.com",
      name: "test"
    }
  } catch (e) {
    console.log("test");
  }
};
 
async function getUserInfo() {
  try {
    const response = await axios({
      method: "post",
      url: 'http://localhost:4500/v2/auth/user/login',
      data: {
        email: "test@test.com",
        password: "Password123!"
      },
      withCredentials: true
    });

    console.log(response);

    const userInfo: {
      email: string,
      name: string
    } = {
      email: response.data.data.email,
      name: response.data.data.name
    }

    console.log("userInfo",userInfo);

    return userInfo;
  } catch(e) {
    console.log(e);
    return null
  }
  
}

function* getPostsSaga() {
  try {
    const data = yield call(getUserInfo);
    console.log("data", data);
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
}

export const signInAsync = () => {
  return {type: SIGNIN_ASYNC}
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