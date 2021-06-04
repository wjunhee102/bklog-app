import React, { useEffect, useState } from 'react';
import { testDB } from './db';
import { sortBlock } from './reducer/utils/ordering';

const test = ["5-1", "1", "5","1-1", "2", "2-1", "2-2", "1-1-1","3", "3-1", "4", "4-1", "4-1-1", "6", "7", "8", "9", "10", "10-1"];

const Block: React.FC = () => {

  useEffect(() => {
    console.log(sortBlock(testDB));
    console.log(test.sort());
    const test2 = "1-1-3";
    console.log(test2.slice(0, -2), test2.slice(-3, -2));
  }, []);

  return (
    <div className="block-editor">

    </div>
  )
}

export default Block;