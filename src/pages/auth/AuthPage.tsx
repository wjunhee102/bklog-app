import React from 'react';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import LoadingWindow from '../../components/common/loading-window';
import AuthRoutes from './AuthRoutes';
import useAuthPage from './hooks/useAuthPage';
import useAuthPageLogic from './hooks/useAuthPageLogic';
import './AuthPage.scss';

const AuthPage: React.FC = () => {
  
  const authPageHooks = useAuthPage();

  const {
    errMessage,
    errorToggle,
    onResetError,
    loading
  } = useAuthPageLogic(authPageHooks);

  return (
    <div className="auth-page">
      <AuthRoutes authPageHooks={authPageHooks} />
      <ErrorPopup message={errMessage} toggle={errorToggle} callback={onResetError} />
      { loading? <LoadingWindow /> : null }
    </div>
  );
}

export default AuthPage;