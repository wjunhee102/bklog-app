import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Sibebar from "../../../components/sidebar";
import BklogContainer from "../../../containers/bklog-container";
import { GetPageListReqType } from '../../../store/modules/page/utils';
import NotFoundPage from "../../notfoundpage";
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

  const {
    pageState: {
      pageEditor
    }
  } = bkPageHooks.usePageHooks;

  useBkContainer(type, bkPageHooks);

  return (
    <div className="bk-page-container">

      {
        pageEditor.id? 
        <div className="bk-left-area">
          <Sibebar bkPageHooks={bkPageHooks} />
        </div>
        : null
      }
      
      
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