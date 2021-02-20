import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id?: string;
}

export default function AuthPage({ match }: RouteComponentProps<MatchParams>) {

  if(match.params.id) {
    console.log(match.params.id);
    return <Redirect to="/" />
  }

  return (
    <div>
      asdasd
    </div>
  )
}