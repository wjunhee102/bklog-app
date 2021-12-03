import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import BlockEditor from '../components/block';
import Sibebar from '../components/sidebar';
import useBklog from '../hooks/useBKlog';
import { PageInfoType } from '../store/modules/bklog/utils';
import useConnectBklogStore from '../hooks/useConnectBklogStore';
import { RouteComponentProps } from 'react-router-dom';
import LoadingWindow from '../components/common/loading-window';
import NotFoundPage from '../pages/NotFoundPage';

interface MatchParams {
  pageId: string;
}

const BklogContainer: React.FC<RouteComponentProps<MatchParams>> = ({ 
  match: { 
    params: { 
      pageId
    }
  } 
}) => { 
  const { 
    bklogState,
    onGetPage
   } = useBklog();

  const pageInfo: PageInfoType = useMemo(() => bklogState.pageInfo, [bklogState.pageInfo]);

  useEffect(() => {
    onGetPage(pageId);
  }, [pageId]);

  return (
    <div className={classNames(
      "flex-auto w-full h-full py-2 pr-2 ml-2 pb-2"
    )}>
      {
        //  cover 분리
        pageInfo? 
          <>
          <div className="cover"></div>
          <BlockEditor connectStoreHook={useConnectBklogStore} />
          </>
          : bklogState.isLoading? 
          <LoadingWindow />
          : <NotFoundPage />
      }
      
    </div>    
  )
}

export default BklogContainer;