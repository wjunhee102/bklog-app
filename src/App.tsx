import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect} from 'react-router-dom';
import Home from './pages/HomePage';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';
import AuthPage from './pages/AuthPage';
import GlobalNav from './components/gnb/GlobalNav';
import classNames from 'classnames';
import './assets/App.scss';
import useBase from './hooks/useBase';

function App() {

  const { baseState: { dark } } = useBase();

  return (
    <div className={classNames(
      "App white-mode bg-gray-100 w-full h-screen pt-14",
      {"dark": dark},
      {"light": !dark}
    )}>
      <Router basename="/">
        <GlobalNav />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/bklog" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/edit" component={Editor} />
          <Route path="/bklog" component={BkPage} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
