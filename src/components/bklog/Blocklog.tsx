import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/modules';
import { 
  BlockProp, 
  addBlock, 
  editAble,
  editBlock, 
  commitBlock, 
  deleteBlock,
  BlocklogState 
} from '../../store/modules/blocklog';

interface BlockRaw {
  id: string;
  preId: string | null;
  type: string;
  style?: any[];
  contents: string[];
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
  
  const onDeleteBlock = () => {
    dispatch(deleteBlock(blockData.id));
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
    onEditBlock(blockData.id, e.target.innerHTML);
    console.log(blockData.id);
    if(e.key === "Backspace" && !e.target.innerHTML) {
      console.log(typeof e.target.innerHTML);
      onDeleteBlock();
      if(blockData.preId) dispatch(editAble(blockData.preId));
    }
    if(e.key === "Enter") {
      e.preventDefault();
    }
  }

  const addContent = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.id);
    }
  }

  const dragData = (e:any) => {
    const selObj = window.getSelection()
    const data = selObj? selObj.toString() : "없음";
    // console.log(data);
  }

  const focus = (ele: any) => {
    ele.focus();
  }

  useEffect(()=> {
   if(state.editingId === blockData.id && blockRef.current ) {
    // console.log(blockRef.current)
    focus(blockRef.current)
   }
  },[state.editingId]);

  return (
    <div className="block-zone">
      <div 
        ref={blockRef}
        className={blockData.type}
        dangerouslySetInnerHTML={createMarkup()}  
        contentEditable={true}
        onKeyUp={editContent}
        onKeyPress={addContent}
        onFocus={onEditable}
        onBlur={onCommitBlock}
        onDrag={dragData}
        onMouseDown={dragData}
      >
      </div>
      <button onClick={onDeleteBlock}> 삭제 </button>
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
      preId: raw.preBlockId,
      type: raw.property.type,
      style: [],
      contents: raw.property.contents
    }
  }) : null;

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