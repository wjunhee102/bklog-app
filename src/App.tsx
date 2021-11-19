import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import useBase from './hooks/useBase';
import Home from './pages/HomePage';
import BkPage from './pages/bkpage';
import GlobalNav from './components/gnb';
import classNames from 'classnames';
import './assets/App.scss';
import useAuth from './hooks/useAuth';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {

  const { baseState: { dark } } = useBase();
  const { 
    authState: { waitingCount, user },
    onReissueToken
  } = useAuth();

  useEffect(() => {
    if(waitingCount && user) {
      if(waitingCount <= 5) {
        const timer = setTimeout(() => {
          onReissueToken();
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        //onAllReset();
        /**
         * 500 page로 redirect
         */
      }
    }
  }, [waitingCount]);

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
          <Route exact path="/home" component={Home} />
          <Route path="/bklog" component={BkPage} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
