import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import useAuth from '../hooks/useAuth';
import usePage from '../hooks/usePage';




function AuthPage() {
  const { getUserInfo } = useAuth();
  const { onChangeToggle } = usePage();

  useEffect(() => {
    if(getUserInfo) {
      onChangeToggle(true);
    }
    
  },[getUserInfo]);

  if(getUserInfo) {
    return <Redirect to={`/bklog/${getUserInfo.penName}`} />
  }

  return (
    <div className="auth-page w-full h-full items-center p-4 overflow-auto rounded">
      <Switch>
        <Route path="/auth/sign-up">
          <SignUp />
        </Route>
        <Route path="/auth/sign-in">
          <SignIn />
        </Route>
      </Switch>
    </div>
  )
}

export default AuthPage;