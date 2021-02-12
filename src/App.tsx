import React from 'react';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';

import './App.scss';

function App() {
  return (
    <div className="App black-mode">
      <Home />
      <Editor />
      <BkPage />
    </div>
  );
}

export default App;
