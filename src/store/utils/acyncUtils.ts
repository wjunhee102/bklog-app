import { call, put } from 'redux-saga/effects'; 
import { REISSUETOKEN } from '../modules/auth/utils';

function createPromiseSaga(type: string, promiseCreator: any) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: any) {
    try {
      console.log("action", action);
      const response = yield call(promiseCreator, action.payload);

      const payload = response.data? response.data : null;
      const success = response.data? response.data.success : false;
      const error = response.data? 
        response.data.error? 
        response.data.error 
        : null 
        : response.error;

      if(payload) {
        payload.success = undefined;
      }
      console.log(response, payload);
      
      if(success) {
        console.log("success");
        yield put({ type: SUCCESS, payload });
      } else {

        if(error.accessTokken) {
          console.log(action);
          yield put({ type: REISSUETOKEN, payload: action });
        } else {
          if(payload) {
            console.log("false");
            yield put({ type: ERROR, payload });
          } else {
            yield put({ type: ERROR, payload: { error }});
          }
          
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