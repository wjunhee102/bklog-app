import React from 'react';
import classNames from 'classnames';
import './assets/App.scss';
import Router from './router';
import useApp from './hooks/useApp';

const App: React.FC = () => {

  const { dark } = useApp();

  return (
    <div className={classNames("app", { dark }, {light: !dark})}>
      <Router />
    </div>
  );
}

export default App;
