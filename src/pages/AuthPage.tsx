import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import ErrorPopup from '../components/base/popup/ErrorPopup';
import LoadingWindow from '../components/common/loading-window';
import useAuth from '../hooks/useAuth';
import usePage from '../hooks/usePage';
import NotFoundPage from './NotFoundPage';

const AuthPage: React.FC = () => {
  const { 
    authState: { user, error, loading },  
    onResetError
  } = useAuth();
  const { 
    onChangeToggle
   } = usePage();

  useEffect(() => {
    if(user) {
      onChangeToggle(true);
    }
  },[user]);

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
      { error? <ErrorPopup error={error} callback={onResetError} /> : null }
      { loading? <LoadingWindow /> : null }
    </div>
  );
}

export default AuthPage;