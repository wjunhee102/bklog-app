import { call, put } from 'redux-saga/effects'; 
import { REISSUETOKEN } from '../modules/auth/utils';

function createPromiseSaga(type: string, promiseCreator: any) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: any) {
    try {
      console.log("action", action);
      const { data } = yield call(promiseCreator, action.payload);

      const payload = Object.assign({}, data);

      console.log("payload", payload, data);

      delete payload.success;

      if(data.success) {
        console.log("success");
        yield put({ type: SUCCESS, payload });
      } else {

        if(data.error.accessTokken) {
          console.log(action);
          yield put({ type: REISSUETOKEN, payload: action });
        } else {
          console.log("false");
          yield put({ type: ERROR, payload });
        }
  
      }
    } catch(e) {
      console.log(e);
      yield put({ type: ERROR, payload: {
        error: e
      }})
    }
  }
}

const acyncUtils = {
  createPromiseSaga
}

export default acyncUtils;