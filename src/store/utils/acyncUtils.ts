import { call, put } from 'redux-saga/effects'; 
import { REISSUETOKEN, RESET_AUTH } from '../modules/auth/utils';
import { ApiError } from '../../utils/api-utils';
import { RESET_BKLOG } from '../modules/bklog/utils';
import { RESET_PAGE } from '../modules/page/utils';
import { getCountOfReissueToken, setCountOfReissueToken } from '../..';

function createPromiseSaga<T = any>(
  type: string, 
  promiseCreator: any, 
  errorType?: string, 
  successType?: string
) {
  const [ SUCCESS, ERROR ] = [successType?  successType : `${type}_SUCCESS`, errorType? errorType: `${type}_ERROR`];

  return function* (action: any) {
    try {
      const data: T = yield call<any>(promiseCreator, action.payload);
  
     setCountOfReissueToken(0);

      yield put({ type: SUCCESS, payload: data });
    } catch(error: any) {

      if(error.type === "AUTH" && error.code === "001") {
        setCountOfReissueToken(getCountOfReissueToken() + 1);

        yield put({ type: REISSUETOKEN, payload: action });

      } else {
        yield put({ type: ERROR, payload: new ApiError(error).get });
      }
      
    }
  } 
}  

function* allResetSaga(action: any) {
  yield put({ type: RESET_AUTH });
  yield put({ type: RESET_BKLOG });
  yield put({ type: RESET_PAGE });
}

const acyncUtils = {
  createPromiseSaga,
  allResetSaga
}

export default acyncUtils;