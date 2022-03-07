import React from "react";
import { Routes, Route } from 'react-router-dom';
import Sibebar from "../../../components/sidebar";
import BklogContainer from "../../../containers/bklog-container";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import NotFoundPage from "../../notfoundpage/NotFoundPage";
import { UseBkPageTypes } from "../hooks/useBkPage";
import useBkContainer from "../hooks/useBkContainer";
import BkDashBoard from "./BkDashBoard";
import Gnb from "../../../components/gnb";

interface BkPageContainerProps {
  type: GetPageListReqType;
  bkPageHooks: UseBkPageTypes;
}

const BkPageContainer: React.FC<BkPageContainerProps> = ({ 
  type,
  bkPageHooks
}) => {

  useBkContainer(type, bkPageHooks);

  return (
    <div className="bk-page-container">

      <div className="bk-left-area">
        <Sibebar bkPageHooks={bkPageHooks} />
      </div>
      
      <div className="bk-right-area">
        <Gnb className="absolute" />
        <Routes>
          <Route path="/" element={<BkDashBoard bkPageHooks={bkPageHooks} />} />
          <Route path=":pageId" element={<BklogContainer bkPageHooks={bkPageHooks} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

    </div>
  )
}

export default BkPageContainer;