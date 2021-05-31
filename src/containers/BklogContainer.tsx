import React from 'react';
import classNames from 'classnames';
import Block from '../components/bklog/block';

import { BlockData } from '../types/bklog';

import { TEST_CASE_01 } from '../index.test';
import Sibebar from '../components/sidebar';
import usePage from '../hooks/usePage';

function BklogContainer() { 

  return (
    <div className="flex h-full relative overflow-auto">
      <Sibebar />
      <div className={classNames(
        "flex-auto w-full h-full py-2 pr-2 ml-2"
      )}>
        <Block />
      </div>
    </div>
    
  )
}

export default BklogContainer;