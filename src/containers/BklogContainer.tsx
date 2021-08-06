import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import BlockEditor from '../components/newBlock';
import Sibebar from '../components/sidebar';
import useBklog from '../hooks/useBKlog';
import { PageInfoType } from '../store/modules/bklog/utils';
import useConnectBklogStore from '../hooks/useConnectBklogStore';

function BklogContainer() { 
  const { bklogState } = useBklog();

  const pageInfo: PageInfoType = useMemo(() => bklogState.pageInfo, [bklogState.pageInfo]);

  return (
    <div className="flex h-full relative overflow-auto">
      <Sibebar />
      <div className={classNames(
        "flex-auto w-full h-full py-2 pr-2 ml-2"
      )}>
        {
          pageInfo?  <BlockEditor connectStoreHook={useConnectBklogStore} /> : "loading..."
        }
        
      </div>
    </div>
    
  )
}

export default BklogContainer;