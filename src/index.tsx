import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './assets/index.css';

let countOfReissueToken = 0;

export function getCountOfReissueToken() {
  return countOfReissueToken;
}

export function setCountOfReissueToken(count: number) {
  countOfReissueToken = count;
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);