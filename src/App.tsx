import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';

import './App.scss';

function App() {
  return (
    <div className="App black-mode">
      <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/edit' component={Editor} />
          <Route path='/bklog/:id' component={BkPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
