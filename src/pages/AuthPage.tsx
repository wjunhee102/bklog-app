import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';




function AuthPage() {

  return (
    <div className="auth-page w-full h-full items-center p-4 overflow-auto">
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