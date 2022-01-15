import React from 'react';
import { Outlet } from 'react-router-dom';
import Gnb from '../../../components/gnb';
import './DefaultContainer.scss';

const DefaultContainer: React.FC = () => {
  return (
    <div className="default-page-container">
      <Gnb className="fixed" />
      <Outlet />
    </div>
  );
}

export default DefaultContainer;