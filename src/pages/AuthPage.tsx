import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import ErrorPopup from '../components/base/popup/ErrorPopup';
import LoadingWindow from '../components/common/loading-window';
import useAuth from '../hooks/useAuth';
import usePage from '../hooks/usePage';
import NotFoundPage from './NotFoundPage';

const AuthPage: React.FC = () => {

  const history = useHistory();

  const { 
    authState: { user, error, loading, errorToggle },  
    onResetError
  } = useAuth();
  const { 
    onChangeToggle
   } = usePage();

  useEffect(() => {
    if(user) {
      onChangeToggle(true);
      history.push(`/bklog/penname/${user.penName}`);
    }
  },[user]);

  useEffect(() => {
    if(error) {
      onResetError();
    }
  }, []);

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
      { errorToggle? <ErrorPopup error={error} callback={onResetError} /> : null }
      { loading? <LoadingWindow /> : null }
    </div>
  );
}

export default AuthPage;