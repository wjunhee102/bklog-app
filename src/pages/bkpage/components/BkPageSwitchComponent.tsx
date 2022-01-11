import React from "react";
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import Sibebar from "../../../components/sidebar";
import BklogContainer from "../../../containers/bklog-container";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import NotFoundPage from "../../NotFoundPage";
import { UseBkPageTypes } from "../hooks/useBkPage";
import useBkSwitch from "../hooks/useBkSwitch";
import BkDashBoard from "./BkDashBoard";

interface BkPageSwitchComponentProps {
  type: GetPageListReqType;
  bkPageHooks: UseBkPageTypes;
}

const BkPageSwitchComponent: React.FC<BkPageSwitchComponentProps> = ({ 
  type,
  bkPageHooks
}) => {

  useBkSwitch(type, bkPageHooks);

  return (
    <div className="flex h-full relative">
      <Sibebar />
      <Routes>
        <Route path="/" element={<BkDashBoard bkPageHooks={bkPageHooks} />} />
        <Route path=":pageId" element={<BklogContainer bkPageHooks={bkPageHooks} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default BkPageSwitchComponent;