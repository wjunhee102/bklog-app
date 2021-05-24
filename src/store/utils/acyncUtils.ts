import { call, put } from 'redux-saga/effects'; 
import { REISSUETOKEN, reissueToken, SIGNINUSER_ERROR } from '../modules/auth/utils';

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

function* reissueTokenSaga(action: any) {
  try {
    console.log(action);
    yield call(reissueToken);

    if(action.payload) {
      yield put({ type: action.payload.type, payload: action.payload.payload });
    }


  } catch(error) {
    yield put({ type: SIGNINUSER_ERROR, payload: {
      userInfo: null,
      error: null
    }});

    if(action.payload) {
      yield put({ type: `${action.action.type}_ERROR`, payload: error });
    }  
  }
}

const acyncUtils = {
  createPromiseSaga
}

export default acyncUtils;