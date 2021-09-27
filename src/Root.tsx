import React from 'react';
import App   from './App';
import { Provider } from 'react-redux';
import configureStore from './store';

const Root: React.FC = () => {
  return (
    <Provider store={configureStore}>
      <App />
    </Provider>
  )
}

export default Root;