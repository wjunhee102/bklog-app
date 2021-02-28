import { call, put } from 'redux-saga/effects'; 

function createPromiseSaga(type: string, promiseCreator: any) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: any) {
    const data = yield call(promiseCreator, action.payload);

    const payload = Object.assign({}, data);

    delete payload.sucess;

    if(data.sucess) {
      yield put({ type: SUCCESS, payload });
    } else {
      yield put({ type: ERROR, payload });
    }

  }
}

const acyncUtils = {
  createPromiseSaga
}

export default acyncUtils;