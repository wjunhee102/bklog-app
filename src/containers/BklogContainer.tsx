import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import useBKlog from '../hooks/useBKlog';
import Block from '../components/bklog/block';

import { BlockData } from '../types/bklog';

function BklogContainer() {  
  const { 
    state, 
    initBlock, 
    onAddBlock, 
    onCommitBlock, 
    onChangeTextStyle 
  } = useBKlog();

  const click = () => {
    onAddBlock(1, undefined, {
      index: 0,
      id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
      type: "block",
      parentId: null,
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

  // const handleOnActive = (event: any) => {
  //   console.log('user is active', event)
  //   console.log('time remaining', getRemainingTime())
  // }

  // const handleOnAction = (e: any) => {
  //   console.log('user did something', e)
  // }

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500
  })

  const blockData:any = initBlock[0]? initBlock : null;

  return (
    <div className="blocklog notranslate">
      {
        blockData?
        blockData.map((block: BlockData<any>)=> 
          <Block 
            blockData={block}
            key={block.id}
          />
        ) : <div>""</div>
      }
      {
        blockData.length <= 1? 
        <div className="bk-zone"> 
          <div 
            className="bk-block" 
            placeholder="입력해주세요..."
            onFocus={()=>onAddBlock()}
            onClick={()=>onAddBlock()}
            contentEditable="true"
          ></div>
        </div> : null
      }
      <button onClick={click}>블럭 추가</button>
      <button onClick={handleClick}>스타일 추가</button>
    </div>
  )
}

export default BklogContainer;