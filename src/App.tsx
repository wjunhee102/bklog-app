import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';
import AuthPage from './pages/AuthPage';

import './assets/App.scss';

// hashRouter?
function App() {
  return (
    <div className="App white-mode">
      <Router basename="/">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/edit' component={Editor} />
          <Route path='/bklog' component={BkPage} />
          <Route path='/auth/:id' component={AuthPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
