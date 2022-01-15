import React from 'react';
import classNames from 'classnames';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import useBkPageLogic from './hooks/useBkPageLogic';
import BkPageRoutes from './BkPageRoutes';
import useBkPage from './hooks/useBkPage';
import './BkPage.scss';

const BkPage: React.FC = () => {

  const bkPageHooks = useBkPage();

  const {
    errMessage,
    errorToggle,
    handleCallback
  } = useBkPageLogic(bkPageHooks);

  return (
    <div className="bk-page">
      <BkPageRoutes bkPageHooks={bkPageHooks} />

      <div className="bk-page-overlay">
        <ErrorPopup message={errMessage} callback={handleCallback} toggle={errorToggle} />
      </div>
    </div>
  );
}

export default BkPage;