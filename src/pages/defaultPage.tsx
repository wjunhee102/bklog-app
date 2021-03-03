import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id?: string;
}

function DefaultPage({ match }: RouteComponentProps<MatchParams>) {

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

export default DefaultPage;