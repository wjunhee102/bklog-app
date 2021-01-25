import React from 'react';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BkPage from './pages/BkPage';

function App() {
  return (
    <div className="App">
      <Home />
      <Editor />
      <BkPage />
    </div>
  );
}

export default App;
