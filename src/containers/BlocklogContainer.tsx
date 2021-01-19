import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import useBKlog from '../hooks/useBKlog';
import Block from '../components/bklog/Block';

import { BlockData } from '../types/bklog';

function BKlogContainer() {  
  const { state, initBlock, onAddBlock, onCommitBlock } = useBKlog();

  const click = () => {
    onAddBlock();
  }

  const handleOnIdle = (event: any) => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime());
    if(state.stage[0]) {
      console.log('commit');
      onCommitBlock();
    }
  }

  const handleOnActive = (event: any) => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = (e: any) => {
    console.log('user did something', e)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  const blockData:any = initBlock[0]? initBlock : null;

  return (
    <div className="blocklog">
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
    </div>
  )
}

export default BKlogContainer;