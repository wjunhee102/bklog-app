import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { Provider } from 'react-redux';
import configureStore from './store';

import './reset.css';
import './index.css';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
