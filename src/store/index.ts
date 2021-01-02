import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';

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


const store = createStore(rootReducer, composeEnhancers());

export default store;