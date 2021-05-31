import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import classNames from 'classnames';
import useBlock from './hooks/useBlock';
import BlockElement from './BlockEle';

import { BlockData, UUID } from '../../../types/bklog';

interface StagedBlock{
  id: UUID;
  contents: any;
  blockIndex: number;
}

function Block() { 
  const [ mouseOn, setMouseOn ] = useState<boolean>(false);
  const [ clipOn, setClipOn ]   = useState<boolean>(false);
  const [ stage, setStage ]     = useState<StagedBlock[]>([]);
  const actions                 = useBlock();

  const { 
    state, 
    initBlock, 
    onAddBlock, 
    onCommitBlock, 
    onChangeTextStyle,
    onSwitchBlock,
    onRevertBlock
  } = actions;

  const click = () => {
    onAddBlock(undefined, undefined, {
      index: 0,
      id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      type: "text",
      parentBlockId: null,
      preBlockId: null,
      nextBlockId: null,
      property: {
        type:  "BKlog-h1",
        styles: {
          color: null,
          backgroundColor: null
        },
        contents: [
          ["블록 1입니다."],
          ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
          ["는 ", [["i"]]],
          ["황준희", [["b"]]],
          [" 입니다.", [["fc", "#f00"]]]
        ]
      },
      children: [
        "2453d55f-66f0-4ad0-b796-0dbcd8d82ce8"
      ]
    });
  }

  const handleOnIdle = () => {
    console.log('last active', getLastActiveTime());
    if(state.stage[0]) {
      console.log('commit');
      onCommitBlock();
    }
  }
  const handleClick = () => {
    onChangeTextStyle (1, ["bc", "#fc0"], 2, 10, "color");
  }

  const testHandleClick = () => {
    onSwitchBlock(state.blocks[3].id, state.blocks[7].id, false);
  }

  const revertHandleClick = () => {
    onRevertBlock();
  }

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500
  })

  const blockData:any = initBlock[0]? initBlock : null;

  return (
    <div className="blocklog items-center overflow-auto w-full notranslate text-gray-700 bg-white h-full rounded-md shadow-md">
      <div className="cover mb-8"></div>
      <div className="m-auto h-full block-container">
        {
          blockData?
          blockData.map((block: BlockData<any>)=> 
            <BlockElement
              actions={actions}
              blockData={block}
              key={block.id}
            />
          ) : <div></div>
        }
        {
          !blockData || blockData.length <= 1? 
          <div className="bk-zone"> 
            <div 
              className="bk-block" 
              placeholder="입력해주세요..."
              onFocus={()=>onAddBlock()}
              onClick={()=>onAddBlock()}
              contentEditable="true"
            ></div>
          </div> 
          : <>
            <button onClick={click}>블럭 추가</button>
            <button onClick={handleClick}>스타일 추가</button>
            <button onClick={testHandleClick}>스위칭</button>
            <button onClick={revertHandleClick}>되돌리기</button>
          </>
        }
        
      </div>
    </div>
  )
}

export default Block;