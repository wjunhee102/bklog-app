import React, { useEffect, useState } from 'react';
import { testDB } from './db';
import useBlock from './hooks/useBlock';
import { sortBlock } from './reducer/utils/ordering';
import { BlockData, RawBlockData } from './types';

const ary = [1, 2, 3, 4, 5, 6, 7];
const ary2 = ["1-1", "1-2", "1-3", "1-4", "5", "1-10", "1-1-1", "1", "1-2-1", "1-1-1-10"];

const Block: React.FC = () => {

  const {
    initBlock
  } = useBlock();

  useEffect(() => {
    const data = sortBlock(testDB);
    console.log(data);
    console.log("initBlock", initBlock);

    ary2.sort((a, b) => {
      if(a === b) {
        return 0
      }
      const ary1 = a.split(/-/);
      const ary2 = b.split(/-/);

      let length = 0;
      while(ary1[length] && ary2[length]) {
        const aNum = Number(ary1[length]);
        const bNum = Number(ary2[length]);
        if(aNum > bNum) {
          return 1;
        } else if(aNum < bNum) {
          return -1;
        }
        length++;
      }

      if(!ary1[length] && !ary2[length]) {
        return 0;
      } else {
        return ary1[length]? 1 : -1;
      }
    });

    console.log(ary2);

  }, []);

  return (
    <div className="block-editor">

    </div>
  )
}

export default Block;