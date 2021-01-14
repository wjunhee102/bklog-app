import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import { BlockData, UUID } from '../../types/bklog';
import useBKlog from '../../hooks/useBKlog';
import { createContentsElement } from './utils';

import './block.css';

interface BlockProps {
  blockData: BlockData<any>;
}

interface BlockContentProps {
  content: any[]
}

const ContentEle = ({content}:any) => {
  return (<>{content}</>);
}

const BlockContent = ({content}: BlockContentProps) => {

  // const contentType = useMemo(()=> 
  //   content[1] !== undefined? 
  //   content[1].map((type: any) => 
  //       convertContentType(type)
  //     ).join(" ")
  //   : ""
  // , [content]);
  console.log(content);
  
  return (
    <span 
      className={`bk-bold`
    }>
      {content[0]}
    </span>
  )
}

interface ChildBlockProps {
  blockData: any;
}

const ChildBlock = ({ blockData }: ChildBlockProps) => {
  const [ editing, setEditing ] = useState<boolean>(blockData.children && blockData.children[0] !== undefined? false : true);

  const BlockChildren = useMemo(()=> {
    
    if(blockData.children && blockData.children[0] !== undefined ) {

      return blockData.children.map((child: any) => 
        <ChildBlock 
          blockData={child}
          key={child.id}
        />
      )
    } else if(blockData.property && blockData.property.contents) {

      return blockData.property.contents.map((content:any, idx: number) => {
          if(content.length === 1) {
            const data = content[0];
            return <ContentEle content={data} key={idx} />
          } else {
            return <BlockContent content={content} key={idx} />
          }
      })
    } else {
      return  ""
    }

  }, [blockData.children, blockData.property]);

  return (
    <div className={`bklog-child`}>
      <code>
      { BlockChildren }
      </code>
    </div>
  )
}

const Block = ({ blockData }:BlockProps) => {

  const [ editing, setEditing ] = useState<boolean>(true);

  const blockRef = useRef<null>(null);

  const { 
    getEditAbleId,
    onAddBlock, 
    getChilrenBlock,
    onEditAble,
    onEditBlock,
    onCommitBlock
  } = useBKlog();
  
  // 위치 변경시 어떻게 리프레쉬 될지 고민해야 함.
  const children = blockData.children[0]? 
    getChilrenBlock(blockData.id) : null;

  const editContent = (e:any) => {  
    onEditBlock(blockData.id, blockData.index, e.target.innerHTML);

    switch(e.key) {
 
      case "Enter":
        e.preventDefault();
        break;

      case "ArrowUp": 
        if(blockData.preBlockId) onEditAble(blockData.preBlockId);
        break;

      case "ArrowDown":
        if(blockData.nextBlockId) onEditAble(blockData.nextBlockId);
        break;

      case "Backspace":
        if(!e.target.innerHTML) {
          // onDeleteBlock();
          if(blockData.preBlockId) onEditAble(blockData.preBlockId);
          else if(blockData.nextBlockId) onEditAble(blockData.nextBlockId);
          break;
        }

    }

  }

  const contentElement = useMemo(()=> {
    return blockData.property && blockData.property.contents[0]?
    blockData.property.contents.reduce(createContentsElement)
    : ""
  }, [blockData.property])

  const createMarkup = () => {
    return {
      __html: contentElement
    }
  }

  const mouseOver = (e:any) => {
    
    if(e.target.parentNode.tagName === "A") {
      console.log(e.target.parentNode.href);
      window.open(e.target.parentNode.href);
      console.log("실행");
    }
  }

  const addContent = (e:any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onAddBlock(blockData.index);
    }
  }

  // const changeTextStyle = (text:string, type: string) => {
  //   return [
  //     text,
  //     type
  //   ]
  // }

  // const dragData = (e:any) => {
  //   const range = document.createRange();
  //   const selObj = window.getSelection()
  //   const data = selObj? selObj.toString() : "없음";
  //   const focusOffset = selObj? selObj.focusOffset : null;

  //   const newText = changeTextStyle(data, "b");

  //   console.log(newText);
  
  //   // if(focusOffset) {
  //   //   const newBlock = blockData.contents.concat().join();
  //   //   const newData =  newBlock.replace(data, `<strong>${data}</strong>`);
  //   //   onEditBlock(blockData.id, newData);
  //   //   console.log(newData, "ㅁㄴㅇㅁㄴㅇ");
  //   //   console.log("dsadsd")
  //   // }
  // }

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
   if(getEditAbleId === blockData.id && blockRef.current ) {
    focus(blockRef.current)
   }
  },[getEditAbleId]);

  return (
    <div data-id={blockData.id} className="block-zone">
      { 
        blockData.property && blockData.type !== "container" ?  
        <div 
          // data-id={blockData.id}
          ref={blockRef}
          className={`bk-block ${blockData.property.type}`}
          contentEditable={editing}
          onKeyUp={editContent}
          onBlur={onCommitBlock}
          dangerouslySetInnerHTML={createMarkup()} 
          onMouseUp={mouseOver}
          onKeyPress={addContent}
          onFocus={()=>onEditAble(blockData.id)}
          // onMouseUp={dragData}
          // onMouseDown={dragData}
          placeholder="입력해주세요."
        ></div> : null
        }
          {
            children ? 
            children.map((child)=> 
              <Block 
                blockData={child}
                key={child.id}
              />
            ) : null
          }
      <button> 삭제 </button>
    </div>
  )
}

export default Block;