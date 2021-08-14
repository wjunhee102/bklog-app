import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import ErrorPopup from '../components/base/ErrorPopup';
import useAuth from '../hooks/useAuth';
import usePage from '../hooks/usePage';




function AuthPage() {
  const { authState: { user, errorA } } = useAuth();
  const { onChangeToggle } = usePage();

  useEffect(() => {
    if(user) {
      onChangeToggle(true);
    }
    
  },[user]);

  if(user) {
    return <Redirect to={`/bklog/${user.penName}`} />
  }

  return (
    <div className="auth-page w-full h-full items-center p-4 rounded overflow-hidden">
      <Switch>
        <Route path="/auth/sign-up">
          <SignUp />
        </Route>
        <Route path="/auth/sign-in">
          <SignIn />
        </Route>
      </Switch>
      {
        errorA? <ErrorPopup error={errorA} /> : null
      }
    </div>
  )
}

export default AuthPage;