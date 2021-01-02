import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/modules';
import { 
  BlockProp, 
  addBlock, 
  editAble,
  editBlock, 
  commitBlock, 
  BlocklogState 
} from '../../store/modules/blocklog';

interface BlockRaw {
  id: string;
  type: string;
  style?: any[];
  contents: string[];
}

interface BlockEleProps {
  content: string;
}

function BlockEle({content}:BlockEleProps) {
  return (
    <> 
      {content}
    </>
  )
}

interface BlockProps {
  blockData: BlockRaw;
}

function Block({blockData}:BlockProps) {

  const state:BlocklogState = useSelector(( state: RootState) => state.blocklog);

  const dispatch = useDispatch();  

  const blockRef = useRef<null>(null);

  const onAddBlock = (preid?: any, type?: string) => {
    dispatch(addBlock(preid, type));
  }

  const onEditable = () => {
    dispatch(editAble(blockData.id));
  }

  const onEditBlock = (id: string, content: string) => {
    dispatch(editBlock(id, content));
  }

  const onCommitBlock = () => {
    dispatch(commitBlock());
  }

  const createMarkup = () => {
    return {
      __html: 
      blockData.contents?
      blockData.contents.join()
      : ""
    }
  }

  const editContent = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.id);
    } else {
      console.log(e.target);
      onEditBlock(blockData.id, e.target.innerHTML);
    }
  }

  const dragData = (e:any) => {
    const selObj = window.getSelection()
    const data = selObj? selObj.toString() : "없음";
    console.log(data);
  }

  useEffect(()=> {
   if(state.editingId === blockData.id && blockRef.current ) {
    console.log(blockRef.current)
   }
  },[state.editingId]);

  return (
    <div className="block-zone">
      <div 
        ref={blockRef}
        className={blockData.type}
        dangerouslySetInnerHTML={createMarkup()}  
        contentEditable={true}
        onKeyPress={editContent}
        onFocus={onEditable}
        onBlur={onCommitBlock}
        onDrag={dragData}
        onMouseDown={dragData}
      >
      </div>
      <BlockEle content={blockData.contents.join()} />
    </div>
  )
}

function Blocklog() {

  const state:BlocklogState = useSelector(( state: RootState) => state.blocklog);
  const dispatch = useDispatch();  

  const onAddBlock = (preid?: any, type?: string) => {
    dispatch(addBlock(preid, type));
  }

  const click = () => {
    onAddBlock();
  }

  const blockData = state? state.blocks.map( raw => {
    return {
      id: raw.id,
      type: raw.property.type,
      style: [],
      contents: raw.property.contents
    }
  }) : null;

  useEffect(()=> {
    console.log(state);
  },[state])

  return (
    <div className="blocklog">
      {
        blockData?
        blockData.map((block, idx)=> 
          <Block 
            blockData={block}
            key={idx}
          />
        ) : <div>""</div>
      }
      <div className="block-zone">
        <p className="BKlog-p" contentEditable="false"></p>
      </div>
      <button onClick={click}>블럭 추가</button>
    </div>
  )
}

export default Blocklog;