import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import classNames from 'classnames';
import BklogContainer from '../../containers/BklogContainer';
import useAuth from '../../hooks/useAuth';
import useBklog from '../../hooks/useBKlog';
import { Redirect, Switch, Route } from 'react-router-dom';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import BkPageSwitchComponent from './BkPageSwitchComponent';

const BkPage: React.FC = () => {

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

  // useEffect(() => {
  //   if(match.params.id) onGetPage(match.params.id);
  // }, [match.params.id]);

  // useEffect(() => {
  //   console.log(match, match.params.penName);
  // }, [match]);

  // if(!match.params.penName) return (<Redirect to="/home" />)

  return (
    <div className={classNames("bk-page", "h-full", "overflow-scroll")}>
      <div>
        환영합니다.
      </div>
      <Route path="/bklog/:type/:userInfo" component={BkPageSwitchComponent} />
      {/* { id? <BklogContainer /> : null } */}
      { bklogState.error? <ErrorPopup error={bklogState.error} /> : null }
      
    </div>
  );
}

export default BkPage;