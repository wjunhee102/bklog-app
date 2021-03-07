import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import classNames from 'classnames';

import BklogContainer from '../containers/BklogContainer';
import useAuth from '../hooks/useAuth';

interface MatchParams {
  id: string;
}

function BkPage({ match }: RouteComponentProps<MatchParams>) {

  const {
    onCheckToken
  } = useAuth();

  console.log(match.params.id, match);

  useEffect(()=> {
    onCheckToken();
  },[]);

  return (
    <div className={classNames("bk-page", "h-full", "overflow-scroll")}>
      <BklogContainer />
    </div>
  );
}

export default BkPage;