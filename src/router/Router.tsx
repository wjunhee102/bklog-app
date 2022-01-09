import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Gnb from '../components/gnb';
import AppRoutes from './AppRoutes';

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Gnb />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default Router;