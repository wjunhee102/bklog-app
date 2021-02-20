import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { rootSage } from './modules';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// const middleware = (store: any) => (next: any) => (action: any) => {
//   console.log(action);
//   const result = next(action);
//   return result;
// }

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (() => {
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
  sagaMiddleware.run(rootSage);

  return store;
})();

// const store = createStore(rootReducer, applyMiddleware(
//   composeEnhancers,
//   sagaMiddleware
// ));

// sagaMiddleware.run(rootSage);

// const configureStore = (() => {
//   const store = createStore(rootReducer, applyMiddleware(
//     sagaMiddleware
//   ));

//   return store;
// })();

export default configureStore;