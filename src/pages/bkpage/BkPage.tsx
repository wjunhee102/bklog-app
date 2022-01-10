import React from 'react';
import classNames from 'classnames';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import useBkPage from './hooks/useBkPage';
import BkPageRoutes from './BkPageRoutes';

const BkPage: React.FC = () => {

  const {
    errMessage,
    errorToggle,
    handleCallback,
    bkPageHooks
  } = useBkPage();

  return (
    <div className={classNames("bk-page", "h-auto")}>
      <BkPageRoutes bkPageHooks={bkPageHooks} />
      <ErrorPopup message={errMessage} callback={handleCallback} toggle={errorToggle} />
    </div>
  );
}

export default BkPage;