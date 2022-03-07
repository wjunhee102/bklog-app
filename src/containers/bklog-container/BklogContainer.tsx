import React from 'react';
import BlockEditor from '../../components/block';
import useConnectBklogStore from '../../hooks/useConnectBklogStore';
import LoadingWindow from '../../components/common/loading-window';
import NotFoundPage from '../../pages/notfoundpage/NotFoundPage';
import { UseBkPageTypes } from '../../pages/bkpage/hooks/useBkPage';
import useBkContainer from './hooks/useBkContainer';
import './BklogContainer.scss';

interface BklogContainerProps {
  bkPageHooks: UseBkPageTypes;
}

const BklogContainer: React.FC<BklogContainerProps> = ({
  bkPageHooks
}) => { 
  const { pageInfo, isLoading } = useBkContainer(bkPageHooks);

  return (
    <div className="bklog-container">
      {
        pageInfo? 
          <>
          <BlockEditor 
            connectStoreHook={useConnectBklogStore} 
            className="bk-y14"
          />
          </>
          : isLoading? 
          <LoadingWindow />
          : <NotFoundPage />
      }
    </div>    
  );
}

export default BklogContainer;