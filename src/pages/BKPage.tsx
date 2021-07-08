import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import classNames from 'classnames';
import BklogContainer from '../containers/BklogContainer';
import useAuth from '../hooks/useAuth';
import useBklog from '../hooks/useBKlog';
import { Redirect } from 'react-router-dom';
import useSocket from '../hooks/useSocket';

interface MatchParams {
  penName: string;
  id: string;
}

function BkPage({ match }: RouteComponentProps<MatchParams>) {
  const { penName, id } = match.params;

  const {
    onCheckToken
  } = useAuth();

  const {
    bklogState,
    onGetPage
  } = useBklog();

  useEffect(() => {
    // onCheckToken();
  });

  useEffect(() => {
    if(match.params.id) onGetPage(match.params.id);
  }, [match.params.id]);

  if(!match.params.penName) return (<Redirect to="/home" />)

  return (
    <div className={classNames("bk-page", "h-full", "overflow-scroll")}>
      { id? <BklogContainer /> : null }
    </div>
  );
}

export default BkPage;