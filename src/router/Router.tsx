import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default Router;