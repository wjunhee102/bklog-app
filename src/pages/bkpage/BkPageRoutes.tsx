import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BklogContainer from '../../containers/BklogContainer';
import NotFoundPage from '../NotFoundPage';
import BkPageSwitchComponent from './components/BkPageSwitchComponent';
import { BkPageHooksTypes } from './hooks/useBkPage';

interface BklogPageRoutesProps {
  bkPageHooks: BkPageHooksTypes
}

const BkPageRoutes: React.FC<BklogPageRoutesProps> = ({
  bkPageHooks
}) => {
  return (
    <Routes>
      <Route path="penname/:userInfo" element={<BkPageSwitchComponent type="penname" bkPageHooks={bkPageHooks} />}>
        <Route path=":pageId" element={<BklogContainer {...bkPageHooks} />} />
      </Route>
      <Route path="id/:userInfo" element={<BkPageSwitchComponent type="id" bkPageHooks={bkPageHooks} />}>
        <Route path=":pageId" element={<BklogContainer {...bkPageHooks} />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default BkPageRoutes;