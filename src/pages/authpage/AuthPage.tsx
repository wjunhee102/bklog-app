import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from '../../components/auth/sign-in';
import SignUp from '../../components/auth/sign-up';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import LoadingWindow from '../../components/common/loading-window';
import useAuth from '../../hooks/useAuth';
import usePage from '../../hooks/usePage';
import NotFoundPage from '../NotFoundPage';
import AuthRoutes from './AuthRoutes';

const AuthPage: React.FC = () => {
  const [ errMessage, setErrMessage ] = useState<string>(null); 

  const navigate = useNavigate();

  const { 
    authState: { user, error, loading, errorToggle, signUpSuccess },  
    onResetError
  } = useAuth();
  const { 
    onChangeToggle
   } = usePage();

  useEffect(() => {
    if(user) {
      onChangeToggle(true);
      navigate(`/bklog/id/${user.id}`);
    }
  },[user]);

  useEffect(() => {
    if(error) {
      setErrMessage(error.message);
    } else {
      setErrMessage(null);
    }
  }, [error]);

  useEffect(() => {
    if(error) {
      onResetError();
    }
  }, []);

  useEffect(() => {
    if(signUpSuccess) {
      navigate(`/auth/sign-in`);
    }
  }, [signUpSuccess]);

  return (
    <div className="auth-page w-full h-full items-center p-4 rounded overflow-hidden">
      <AuthRoutes />
      <ErrorPopup message={errMessage} toggle={errorToggle} callback={onResetError} />
      { loading? <LoadingWindow /> : null }
    </div>
  );
}

export default AuthPage;