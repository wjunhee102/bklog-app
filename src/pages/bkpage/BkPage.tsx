import React from 'react';
import classNames from 'classnames';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import useBkPageLogic from './hooks/useBkPageLogic';
import BkPageRoutes from './BkPageRoutes';
import useBkPage from './hooks/useBkPage';

const BkPage: React.FC = () => {

  const bkPageHooks = useBkPage();

  const {
    errMessage,
    errorToggle,
    handleCallback
  } = useBkPageLogic(bkPageHooks);

  return (
    <div className={classNames("bk-page", "h-auto")}>
      <BkPageRoutes bkPageHooks={bkPageHooks} />
      <ErrorPopup message={errMessage} callback={handleCallback} toggle={errorToggle} />
    </div>
  );
}

export default BkPage;