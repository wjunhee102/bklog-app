import React from 'react';
import { Route, Switch } from 'react-router-dom';




function AuthPage() {

  return (
    <div className="auth-page">
      <Switch>
        <Route path="/sign-up" />
        <Route path="/sign-in" />
      </Switch>
    </div>
  )
}

export default AuthPage;