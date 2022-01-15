import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import BkPageContainer from './components/BkPageContainer';
import { UseBkPageTypes } from './hooks/useBkPage';

interface BklogPageRoutesProps {
  bkPageHooks: UseBkPageTypes;
}

const BkPageRoutes: React.FC<BklogPageRoutesProps> = ({
  bkPageHooks
}) => {
  return (
    <Routes>
      <Route path="penname/:userInfo/*" element={<BkPageContainer type="penname" bkPageHooks={bkPageHooks} />} />
      <Route path="id/:userInfo/*" element={<BkPageContainer type="id" bkPageHooks={bkPageHooks} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default BkPageRoutes;