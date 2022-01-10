import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import BlockEditor from '../components/block';
import Sibebar from '../components/sidebar';
import useBklog from '../hooks/useBklog';
import { PageInfoType } from '../store/modules/bklog/utils';
import useConnectBklogStore from '../hooks/useConnectBklogStore';
import { useParams } from 'react-router-dom';
import LoadingWindow from '../components/common/loading-window';
import NotFoundPage from '../pages/NotFoundPage';
import usePage from '../hooks/usePage';
import useAuth from '../hooks/useAuth';
import { BkPageHooksTypes } from '../pages/bkpage/hooks/useBkPage';

interface BklogContainerProps extends BkPageHooksTypes {
}

const BklogContainer: React.FC<BklogContainerProps> = ({
  useBklogHooks,
  usePageHooks,
  useAuthHooks
}) => { 
  const { pageId } = useParams();

  const { 
    bklogState,
    onGetPage,
    onResetBklog
   } = useBklogHooks;

   const {
    pageState: {
      pageEditor
    },
    onGetPageList
   } = usePageHooks;

   const {
     authState: {
       user
     }
   } = useAuthHooks;

  const pageInfo: PageInfoType = useMemo(() => bklogState.pageInfo, [bklogState.pageInfo]);

  useEffect(() => {
    onResetBklog();
    onGetPage(pageId);
    if(pageEditor) onGetPageList("id", pageEditor.id, user? {id: user.id} : undefined);
  }, [pageId]);

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
          : bklogState.isLoading? 
          <LoadingWindow />
          : <NotFoundPage />
      }
      
    </div>    
  )
}

export default BklogContainer;