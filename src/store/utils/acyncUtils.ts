import { call, put } from 'redux-saga/effects'; 
import { REISSUETOKEN, reissueToken, SIGNINUSER_ERROR, RESET_AUTH } from '../modules/auth/utils';
import { ResType } from '../../utils/api-utils';
import { ApiError } from '../../utils/api-utils';
import { RESET_BKLOG } from '../modules/bklog/utils';
import { createAction } from '.';
import { createReducer } from 'typesafe-actions';

// function createPromiseSaga2(type: string, promiseCreator: any) {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
//   return function* saga(action: any) {
//     try {
//       console.log("action", action);
//       const response = yield call(promiseCreator, action.payload);

//       const payload = response.data? response.data : null;
//       const success = response.data? response.data.success : false;
//       const error = response.data? 
//         response.data.error? 
//         response.data.error 
//         : null 
//         : response.error;

//       if(payload) {
//         payload.success = undefined;
//       }
//       console.log(response, payload);
      
//       if(success) {
//         console.log("success");
//         yield put({ type: SUCCESS, payload });
//       } else {

//         if(error.accessTokken) {
//           console.log(action);
//           yield put({ type: REISSUETOKEN, payload: action });
//         } else {
//           if(payload) {
//             console.log("false");
//             yield put({ type: ERROR, payload });
//           } else {
//             yield put({ type: ERROR, payload: { error }});
//           }
          
//         }
  
//       }
//     } catch(e) {
//       console.log(e);
//       yield put({ type: ERROR, payload: {
//         error: e
//       }})
//     }
//   }
// }

function createPromiseSaga(
  type: string, 
  promiseCreator: any, 
  errorType?: string, 
  successType?: string
) {
  const [ SUCCESS, ERROR ] = [successType?  successType: `${type}_SUCCESS`, errorType? errorType: `${type}_ERROR`];

  return function* (action: any) {
    try {
      const data = yield call<any>(promiseCreator, action.payload);

      yield put({ type: SUCCESS, payload: data });
    } catch(error) {
      if(error.type === "AUTH" && error.code === "001") {
        yield put({ type: REISSUETOKEN, payload: action });
      } else {
        yield put({ type: ERROR, error: new ApiError(error).get });
      }
    }
  } 
}  

// function asyncActions<ReqData = any, ResData = any, Error = any>(actionType: string) {
//   const SUCCESS = `${actionType}_SUCCESS`;
//   const ERROR   = `${actionType}_ERROR`;

//   return [
//     createAction<ReqData, typeof actionType>(actionType),
//     createAction<ResData, typeof SUCCESS>(SUCCESS),
//     createAction<Error, typeof ERROR>(ERROR)
//   ];
// }

function* allResetSaga(action: any) {
  yield put({ type: RESET_AUTH });
  yield put({ type: RESET_BKLOG });
}

const acyncUtils = {
  createPromiseSaga,
  allResetSaga
}

export default acyncUtils;