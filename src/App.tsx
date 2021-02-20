import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';
import AuthPage from './pages/AuthPage';

import './App.scss';

// hashRouter?
function App() {
  return (
    <div className="App black-mode">
      <HashRouter basename="/bk">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/edit' component={Editor} />
          <Route path='/bklog/:id' component={BkPage} />
          <Route path='/auth/:id' component={AuthPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
