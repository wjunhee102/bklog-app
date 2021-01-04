import React from 'react';
import Home from './pages/Home';
import Editor from './components/editor/index';
import BKPage from './pages/BKPage';

function App() {
  return (
    <div className="App">
      <Home />
      <Editor />
      <BKPage />
    </div>
  );
}

export default App;
