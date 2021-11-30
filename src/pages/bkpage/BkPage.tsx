import React from 'react';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import useBklog from '../../hooks/useBKlog';
import { Route, useHistory, Switch } from 'react-router-dom';
import ErrorPopup from '../../components/base/popup/ErrorPopup';
import { History } from 'history';
import NotFoundPage from '../NotFoundPage';
import PenNameRoute from './route/PenNameRoute';
import IdRoute from './route/IdRoute';

function handleErrorPopup({
  type, 
  code
}: { type: string, code: string | number}, 
  history?: History<unknown>){
    return () => {
      if(type === "AUTH" && code == "002" && history) {
        history.push("/home");
      }
  } 
}

const BkPage: React.FC = () => {

  const {
    onCheckToken
  } = useAuth();

  const {
    bklogState,
    onGetPage
  } = useBklog();

  const history = useHistory();

  const handleCallback = bklogState.error? handleErrorPopup({ type: bklogState.error.type, code: bklogState.error.code }, history) : null;

  // useEffect(() => {
  //   // onCheckToken();
  // });

  // useEffect(() => {
  //   if(match.params.id) onGetPage(match.params.id);
  // }, [match.params.id]);

  // useEffect(() => {
  //   console.log(match, match.params.penName);
  // }, [match]);

  // if(!match.params.penName) return (<Redirect to="/home" />)

  return (
    <div className={classNames("bk-page", "h-full", "overflow-scroll")}>
      <Switch>
        <Route path="/bklog/penname/:userInfo" component={PenNameRoute} />
        <Route path="/bklog/id/:userInfo" component={IdRoute} />
        <Route component={NotFoundPage} />
      </Switch>
      
      { bklogState.error? <ErrorPopup error={bklogState.error} callback={handleCallback} /> : null }
      
    </div>
  );
}

export default BkPage;