import React from "react";
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import LoadingCircle from "../../../components/common/loading-circle";
import Sibebar from "../../../components/sidebar";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import { BkPageHooksTypes } from "../hooks/useBkPage";
import useBkSwitch from "../hooks/useBkSwitch";

interface BkPageSwitchComponentProps {
  type: GetPageListReqType;
  bkPageHooks: BkPageHooksTypes;
}

const BkPageSwitchComponent: React.FC<BkPageSwitchComponentProps> = ({ 
  type,
  bkPageHooks
}) => {

  const { userInfo } = useParams();

  useBkSwitch(type, userInfo, bkPageHooks);

  return (
    <div className="flex h-full relative">
      <Sibebar />
      <Outlet />
    </div>
  )
}

export default BkPageSwitchComponent;