import React, { useEffect, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';
import { createBlockData } from './reducer/utils';

const Block: React.FC = () => {

  const hooks = useBlock();
  const [ test, setTest ] = useState<boolean>(false); 

  const {
    state,
    initBlock,
    onAddBlock
  } = hooks;

  const data = [
    createBlockData("4-1"),
    createBlockData("5"),
    createBlockData("7-1")
  ];

  data[0].contents = ["잘 됨"];
  data[1].contents = ["잘 됨1"];
  data[2].contents = ["잘 됨2"];

  useEffect(() => {
    if(!test) {
      setTest(true);
      const index = state.blockList.findIndex((block: BlockData) => block.position === "1-10-1");
      onAddBlock(data, "1-10-1", index);
    }
    console.log(state);
  }, [state]);

  return (
    <div className="block-editor blockEditor items-center overflow-auto w-full notranslate text-gray-700 bg-white h-full rounded-md shadow-md">
      <div className="cover mb-8"></div>
      <div className="m-auto h-full block-container">
        {
          initBlock?
          initBlock.root.map((block: BlockData, idx: number) =>
            <BlockElement 
              key={idx}
              idx={idx}
              blockData={block}
              hooks={hooks}
            />
          ) : <div></div>
        }
      </div>
    </div>
  )
}

export default Block;