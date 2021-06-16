import React, { useEffect, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';
import { createBlockData } from './reducer/utils';

const Block: React.FC = () => {

  const hooks = useBlock();
  const [ test, setTest ] = useState<boolean>(false); 
  const [ test2, setTest2 ] = useState<boolean>(false); 

  const {
    state,
    initBlock,
    onAddBlock,
    onDeleteBlock,
    onRevertBlock,
    onSwitchBlock
  } = hooks;

  useEffect(() => {
    console.log(state.blockList.map((block: any) => Object.assign({}, block)));
    if(!test && !test2) {
      const data = [createBlockData("2"), createBlockData("2-1"), createBlockData("3-1")];
      data[0].contents = [["반가워요 2-1-1"]];
      data[1].contents = [["반가워요 2-1-2"]];
      data[2].contents = [["반가워요 2-1-3"]];
      // onDeleteBlock([state.blockList[1], state.blockList[5], state.blockList[6], state.blockList[16]]);
      onAddBlock(data, "2-1");
      setTest(true);
    } else if(test && !test2) {
      onRevertBlock(true);
      setTest2(true);
    } else if(test && test2) {
      // const dataList = [state.blockList[4], state.blockList[10]];
      // console.log(dataList);
      // onSwitchBlock(dataList.map(data => data.id), "10", true);
      // setTest(false);
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