import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultContainer from '../pages/container/default';
import AuthPage from '../pages/authpage';
import BkPage from '../pages/bkpage';
import HomePage from '../pages/homepage';
import NotFoundPage from '../pages/notfoundpage/NotFoundPage';
import Redirect from './Redirect';

const AppRoutes: React.FC = () => {
  return (  
    <Routes>
      <Route path="/" element={<DefaultContainer />}>
        <Route path="/" element={<Redirect to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="auth/*" element={<AuthPage />} />  
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="bklog/*" element={<BkPage />} />
    </Routes>
  );
}

export default AppRoutes;