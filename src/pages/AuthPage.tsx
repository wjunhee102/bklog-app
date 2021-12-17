import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import ErrorPopup from '../components/base/popup/ErrorPopup';
import LoadingWindow from '../components/common/loading-window';
import useAuth from '../hooks/useAuth';
import usePage from '../hooks/usePage';
import NotFoundPage from './NotFoundPage';

const AuthPage: React.FC = () => {
  const [ errMessage, setErrMessage ] = useState<string>(null); 

  const history = useHistory();

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
      history.push(`/bklog/id/${user.id}`);
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
      history.push(`/auth/sign-in`);
    }
  }, [signUpSuccess]);

  return (
    <div className="auth-page w-full h-full items-center p-4 rounded overflow-hidden">
      <Switch>
        <Route exact path="/auth/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/auth/sign-in">
          {
            user? 
            <Redirect to={`/bklog/penname/${user.penName}`} /> 
            : <SignIn />
          }    
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      <ErrorPopup message={errMessage} toggle={errorToggle} callback={onResetError} />
      { loading? <LoadingWindow /> : null }
    </div>
  );
}

export default AuthPage;