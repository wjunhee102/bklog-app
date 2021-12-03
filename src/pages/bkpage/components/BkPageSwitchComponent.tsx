import React from "react";
import { Switch, Route } from 'react-router-dom';
import LoadingCircle from "../../../components/common/loading-circle";
import Sibebar from "../../../components/sidebar";
import BklogContainer from "../../../containers/BklogContainer";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import NotFoundPage from "../../NotFoundPage";
import useBkSwitch from "../hooks/useBkSwitch";
import BkDashBoard from "./BkDashBoard";

interface BkPageSwitchComponentProps {
  type: GetPageListReqType;
  userInfo: string;
}

const BkPageSwitchComponent: React.FC<BkPageSwitchComponentProps> = ({ 
  type,
  userInfo
}) => {

  useBkSwitch(type, userInfo);

  return (
    <div className="flex h-full relative overflow-auto">
      <Sibebar />
      <Switch>
        <Route exact path={`/bklog/${type}/${userInfo}`} component={BkDashBoard} />
        <Route exact path={`/bklog/${type}/${userInfo}/:pageId`} component={BklogContainer} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default BkPageSwitchComponent;