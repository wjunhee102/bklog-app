import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import BlockComponent from '../components/newBlock';
import { BlockData } from '../types/bklog';
import Sibebar from '../components/sidebar';
import usePage from '../hooks/usePage';
import useBklog from '../hooks/useBKlog';
import { PageInfoType } from '../store/modules/bklog/utils';

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
          pageInfo?  <BlockComponent /> : "loading..."
        }
        
      </div>
    </div>
    
  )
}

export default BklogContainer;