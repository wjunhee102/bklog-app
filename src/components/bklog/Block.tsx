import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import useBKlog from '../../hooks/useBKlog';

import { BlockData } from '../../types/bklog';

import './block.css';

export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any;
}

interface BlockProps {
  blockData: BlockData;
}

const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;

function createContentsElement(accumulator: string, rawContents: any):string {
  let text;
  let className:string | null = null;
  let styles:string | null = null;
  let aTag;

  if(rawContents.length === 2) {
    rawContents[1].forEach((content:string[]) => {
      switch(content[0]) {

        case BOLD:
          className = className? className + " bk-bold" : "bk-bold";
          break;

        case ITALY:
          className = className? className + " bk-italic" : "bk-italic";
          break;

        case UNDERBAR:
          className = className? className + " bk-underbar" : "bk-underbar";
          break;

        case FONT_COLOR:
          if(content[1][0] === "#") {
            styles = styles? styles + ` color: ${content[1]};` : `color: ${content[1]};`;
          } else {
            className = className? className + ` bk-fc-${content[1]}` : `bk-fc-${content[1]}`
          }
          break;

        case BACKGROUND_COLOR:
          if(content[1][0] === "#") {
            styles = styles? styles + ` backgroundColor: ${content[1]};` : `backgroundColor: ${content[1]};`;
          } else {
            className = className? className + ` bk-bc-${content[1]}` : `bk-bc-${content[1]}`
          }
          break;
          
        case ANCHOR:
          aTag = content[1];
      }
    })
    text = `<span${className? ' class="'+ className + '"' : ""}${styles? ' style="' + styles + '"' : ""}>${rawContents[0]}</span>`

    if(aTag) {
      text = `<a href="${aTag}">${text}</a>`;
    }
  } else {
    text = rawContents[0];
  }

  return  accumulator + text;
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
          if(typeof content === 'string') {

            console.log("122", content);
            const data = content[0];
            return <ContentEle content={data} key={idx} />
          } else {
            return <BlockContent content={content} key={idx} />
          }
      })
    } else {
      return  null
    }

  }, [blockData.children, blockData.property]);

  // const dispatch = useDispatch();  

  // const blockRef = useRef<null>(null);

  const { 
    getEditAbleId,
    onAddBlock, 
    onEditAble,
    onEditBlock,
    onCommitBlock
  } = useBKlog();
  
  // const onDeleteBlock = () => {
  //   dispatch(deleteBlock(blockData.id));
  // }

  const editContent = (e:any) => {  

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

    onEditBlock(blockData.id, e.target.innerHTML);
    console.log(e.target.innerHTML);

  }

  const createMarkup = () => {
    console.log(blockData)
    return {
      __html: 
      blockData.property && blockData.property.contents[0]?
      blockData.property.contents.reduce(createContentsElement)
      : ""
    }
  }

  const mouseOver = (e:any) => {
    
    if(e.target.parentNode.tagName === "A") {
      console.log(e.target.parentNode.href);
      window.open(e.target.parentNode.href);
      console.log("실행");
    }
  }

  // const addContent = (e:any) => {
  //   if(e.key === "Enter") {
  //     e.preventDefault();
  //     onAddBlock(blockData.id);
  //   }
  // }

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

  // const focus = (ele: any) => {
  //   const selObj = window.getSelection();
  //   const range = document.createRange();
    
  //   ele.focus();
  //   // if(ele.childNodes[0] && blockData.contents.join().length > 0) {
  //   //   range.setStart(ele.childNodes[0], 3);
  //   //   range.setEnd(ele.childNodes[0], 4);
  //   // }  
  //   // console.log(ele.childNodes[0], blockData.contents.join().length);
  // }

  // useEffect(()=> {
  //  if(getEditAbleId === blockData.id && blockRef.current ) {
  //   focus(blockRef.current)
  //  }
  // },[getEditAbleId]);

  return (
    <div id={blockData.id} className="block-zone">
          <div 
            className="bk-block"
            // data-id={blockData.id}
            // ref={blockRef}
            // className={blockData.type}
            suppressContentEditableWarning={true}
            contentEditable={editing}
            onKeyUp={editContent}
            onBlur={onCommitBlock}
            dangerouslySetInnerHTML={createMarkup()} 
            onMouseUp={mouseOver}
            // onKeyPress={addContent}
            // onFocus={()=>onEditAble(blockData.id)}
            // onMouseUp={dragData}
            // onMouseDown={dragData}
          >
          </div>
          {
            BlockChildren?<div> { BlockChildren } </div> : null
          }
      <button> 삭제 </button>
    </div>
  )
}

export default Block;