import React, { useEffect } from "react";
import { RouteComponentProps } from 'react-router';
import { Redirect, Switch, Route } from 'react-router-dom';
import Sibebar from "../../components/sidebar";
import BklogContainer from "../../containers/BklogContainer";
import usePage from "../../hooks/usePage";
import { GetPageListReqType } from '../../store/modules/page/utils';

interface MatchParams {
  type: string;
  userInfo: string
}

const BkPageSwitchComponent: React.FC<RouteComponentProps<MatchParams>> = ({ 
  match: { 
    params: { type, userInfo },
  } 
}) => {

  const { 
    onGetPageList
  } = usePage();

  useEffect(() => {
    const fixedType: GetPageListReqType = type === "penname"? "penname" : "id";
    onGetPageList(fixedType, userInfo);
  }, [type, userInfo]);

  if(!(type === "penname" || type === "id") && !userInfo) {
    console.log(type);
    return (<Redirect to="/bklog" />);
  }

  return (
    <div className="flex h-full relative overflow-auto">
      <Sibebar />
      <Switch>
        <Route path={`/bklog/${type}/${userInfo}/:pageId`} component={BklogContainer} />
      </Switch>
    </div>
  )
}

export default BkPageSwitchComponent;