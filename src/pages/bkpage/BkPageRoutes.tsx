import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BklogContainer from '../../containers/BklogContainer';
import NotFoundPage from '../NotFoundPage';
import BkPageSwitchComponent from './components/BkPageSwitchComponent';

const BkPageRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="penname/:userInfo" element={<BkPageSwitchComponent type="penname" />}>
        <Route path=":pageId" element={<BklogContainer />} />
      </Route>
      <Route path="id/:userInfo" element={<BkPageSwitchComponent type="id" />}>
        <Route path=":pageId" element={<BklogContainer />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default BkPageRoutes;