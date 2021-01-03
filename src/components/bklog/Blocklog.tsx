import React, { useEffect, useRef, useState } from 'react';
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
  nextId: string | null;
  type: string;
  style?: any[];
  contents: string[];
}

interface BlockProps {
  blockData: BlockRaw;
}

function Block({blockData}:BlockProps) {

  const [ editing, setEditing ] = useState<boolean>(true);

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
    console.log(e.key);
    onEditBlock(blockData.id, e.target.innerHTML);

    switch(e.key) {
 
      case "Enter":
        e.preventDefault();
        break;

      case "ArrowUp": 
        if(blockData.preId) dispatch(editAble(blockData.preId))
        break;

      case "ArrowDown":
        if(blockData.nextId) dispatch(editAble(blockData.nextId));
        break;

      case "Backspace":
        if(!e.target.innerHTML) {
          onDeleteBlock();
          if(blockData.preId) dispatch(editAble(blockData.preId))
          else if(blockData.nextId) { dispatch(editAble(blockData.nextId))};
          break;
        }

    }

  }

  const addContent = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.id);
    }
  }

  const dragData = (e:any) => {
    const range = document.createRange();
    const selObj = window.getSelection()
    const data = selObj? selObj.toString() : "없음";
    const focusOffset = selObj? selObj.focusOffset : null
    console.log(data, selObj, range, focusOffset);
    if(focusOffset) {
      const newBlock = blockData.contents.concat().join();
      const newData =  newBlock.replace(data, `<strong>${data}</strong>`);
      onEditBlock(blockData.id, newData);
      console.log(newData, "ㅁㄴㅇㅁㄴㅇ");
      console.log("dsadsd")
    }
  }

  const focus = (ele: any) => {
    const selObj = window.getSelection();
    const range = document.createRange();
    
    ele.focus();
    // if(ele.childNodes[0] && blockData.contents.join().length > 0) {
    //   range.setStart(ele.childNodes[0], 3);
    //   range.setEnd(ele.childNodes[0], 4);
    // }  
    // console.log(ele.childNodes[0], blockData.contents.join().length);
  }

  useEffect(()=> {
   if(state.editingId === blockData.id && blockRef.current ) {
    focus(blockRef.current)
   }
  },[state.editingId]);

  return (
    <div id={blockData.id} className="block-zone">
      <div 
        data-id={blockData.id}
        ref={blockRef}
        className={blockData.type}
        dangerouslySetInnerHTML={createMarkup()}  
        contentEditable={editing}
        onKeyUp={editContent}
        onKeyPress={addContent}
        onFocus={onEditable}
        onBlur={onCommitBlock}
        onMouseUp={dragData}
        onClick={onEditable}
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
      nextId: raw.nextBlockId,
      type: raw.property.type,
      style: [],
      contents: raw.property.contents
    }
  }) : null;

  return (
    <div className="blocklog">
      {
        blockData?
        blockData.map((block)=> 
          <Block 
            blockData={block}
            key={block.id}
          />
        ) : <div>""</div>
      }
      <button onClick={click}>블럭 추가</button>
    </div>
  )
}

export default Blocklog;