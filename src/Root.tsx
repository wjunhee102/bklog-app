import React from 'react';
import App   from './App';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import configureStore from './store';

function Root() {
  return (
    <Provider store={configureStore}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  )
}

export default Root;