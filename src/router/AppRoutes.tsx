import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultContainer from '../pages/container/default';
import AuthPage from '../pages/auth';
import BkPage from '../pages/bklog';
import HomePage from '../pages/home';
import NotFoundPage from '../pages/notfound';
import Redirect from './Redirect';
import PlaygroundPage from '../pages/playground';

const AppRoutes: React.FC = () => {
  return (  
    <Routes>
      <Route path="/" element={<DefaultContainer />}>
        <Route path="/" element={<Redirect to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="auth/*" element={<AuthPage />} />  
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="bklog/*" element={<BkPage />} />
    </Routes>
  );
}

export default AppRoutes;