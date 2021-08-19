import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import useBase from './hooks/useBase';
import Home from './pages/HomePage';
import BkPage from './pages/bkpage';
import GlobalNav from './components/gnb';
import classNames from 'classnames';
import './assets/App.scss';

function App() {

  const { baseState: { dark } } = useBase();

  useEffect(() => {
    console.log(process.env, process.env.REACT_APP_API_URL);
  });

  return (
    <div className={classNames(
      "App w-full h-screen",
      {"dark": dark},
      {"light": !dark}
    )}>
      <div className="w-full h-full pt-14 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100">
      <Router basename="/">
        <GlobalNav />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/bklog" component={BkPage} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
