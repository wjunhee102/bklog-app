import React from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import NotFoundPage from '../NotFoundPage';
import PenNameRoute from './route/PenNameRoute';
import IdRoute from './route/IdRoute';
import useBkPage from './hooks/useBkPage';

const BkPage: React.FC = () => {

  const {
    errMessage,
    errorToggle,
    handleCallback 
  } = useBkPage();

  return (
    <div className={classNames("bk-page", "h-full", "overflow-scroll")}>
      <Switch>
        <Route path="/bklog/penname/:userInfo" component={PenNameRoute} />
        <Route path="/bklog/id/:userInfo" component={IdRoute} />
        <Route component={NotFoundPage} />
      </Switch>
      
      <ErrorPopup message={errMessage} callback={handleCallback} toggle={errorToggle} />
      
    </div>
  );
}

export default BkPage;