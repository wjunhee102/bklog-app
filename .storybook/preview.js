import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../src/store';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {
    return (
      <Provider store={configureStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    )
  }
]