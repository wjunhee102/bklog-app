import React from "react";
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import LoadingCircle from "../../../components/common/loading-circle";
import Sibebar from "../../../components/sidebar";
import BklogContainer from "../../../containers/BklogContainer";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import NotFoundPage from "../../NotFoundPage";
import useBkSwitch from "../hooks/useBkSwitch";
import BkDashBoard from "./BkDashBoard";

interface BkPageSwitchComponentProps {
  type: GetPageListReqType;
}

const BkPageSwitchComponent: React.FC<BkPageSwitchComponentProps> = ({ 
  type
}) => {

  const { userInfo } = useParams();

  useBkSwitch(type, userInfo);

  console.log(userInfo);

  return (
    <div className="flex h-full relative overflow-auto">
      <Sibebar />
      <Outlet />
    </div>
  )
}

export default BkPageSwitchComponent;