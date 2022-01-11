import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import BlockEditor from '../../components/block';
import Sibebar from '../../components/sidebar';
import useBklog from '../../hooks/useBklog';
import { PageInfoType } from '../../store/modules/bklog/utils';
import useConnectBklogStore from '../../hooks/useConnectBklogStore';
import { useParams } from 'react-router-dom';
import LoadingWindow from '../../components/common/loading-window';
import NotFoundPage from '../../pages/NotFoundPage';
import { UseBkPageTypes } from '../../pages/bkpage/hooks/useBkPage';
import useBkContainer from './hooks/useBkContainer';

interface BklogContainerProps {
  bkPageHooks: UseBkPageTypes;
}

const BklogContainer: React.FC<BklogContainerProps> = ({
  bkPageHooks
}) => { 
  const { pageInfo, isLoading } = useBkContainer(bkPageHooks)

  return (
    <div className={classNames(
      "flex-auto w-full h-full"
    )}>
      {
        //  cover 분리
        pageInfo? 
          <>
          <div className="cover"></div>
          <BlockEditor 
            connectStoreHook={useConnectBklogStore} 
          />
          </>
          : isLoading? 
          <LoadingWindow />
          : <NotFoundPage />
      }
      
    </div>    
  )
}

export default BklogContainer;