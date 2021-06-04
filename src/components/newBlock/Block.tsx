import React, { useEffect, useState } from 'react';
import { testDB } from './db';
import { sortBlock } from './reducer/utils/ordering';

const Block: React.FC = () => {

  useEffect(() => {
    console.log(sortBlock(testDB));
  }, []);

  return (
    <div className="block-editor">

    </div>
  )
}

export default Block;