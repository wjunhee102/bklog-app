import React, { useEffect, useRef, useState, useMemo } from 'react';

import useBKlog from '../../hooks/useBKlog';

import './block.css';

export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any;
}


interface BlockData {
  id: string;
  preId: string | null;
  nextId: string | null;
  parentId: string | null;
  type: string;
  style?: any[];
  contents: string[];
  children: any;
}

interface BlockProps {
  blockData: BlockData;
}

const BOLD = "b" as const;
const ITALY = "i" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;

type ContentType = "b" | "i" | ["fc", string] | ["bc", string]; 

function convertContentType(contentType: ContentType):string {
  console.log(contentType);
  if(contentType.length === 1) {
    switch(contentType[0]) {
      case BOLD: 
        return "bk-bold"
      case ITALY:
        return "bk-italic"
      default:
        return ""
    }
  } else {
    if(contentType[0] === "fc") {
      switch(contentType[1]) {
        case "B-P":
          return "Blue-Primary"
        default:
          return "black"
      }
    } else {
      switch(contentType[1]) {
        case "B-P":
          return "white"
      }
    }
  }

  return ""
}

interface BlockContentProps {
  content: any[]
}

const ContentEle = ({content}:any) => {
  return (
    <>{content}</>);
}

const BlockContent = ({content}: BlockContentProps) => {
  console.log(content)

  const contentType = useMemo(()=> 
    content[1]? 
    content[1].map((type: any) => 
        convertContentType(type)
      ).join(" ")
    : ""
  , [content]);
  
  return (
    <span 
      className={`bk-content ${contentType}`
    }>
      {content[0]}
    </span>
  )
}

interface ChildBlockProps {
  blockData: any;
}

const ChildBlock = ({ blockData }: ChildBlockProps) => {
  console.log(blockData, blockData.children[0]);

  return (
    <div className={`bklog-child`}>
      {
        blockData.children[0] !== undefined? 

        blockData.children.map((child: BlockData) => 
          <ChildBlock 
            blockData={child}
            key={child.id}
          />
        ) : null
      }
      { 
        blockData.property.contents?
        blockData.property.contents.map((content:any, idx: number) => {
          if(content.length === 1) {
            const data = content[0];
            return <ContentEle content={data} key={idx} />
          } else {
            return <BlockContent content={content} key={idx} />
          }
        }) : null
      }
    </div>
  )
}

const Block = ({ blockData }:BlockProps) => {

  const [ editing, setEditing ] = useState<boolean>(true);

  console.log(blockData);

  // const dispatch = useDispatch();  

  // const blockRef = useRef<null>(null);

  // const { 
  //   getEditAbleId,
  //   onAddBlock, 
  //   onEditAble,
  // } = useBKlog();
  
  // const onDeleteBlock = () => {
  //   dispatch(deleteBlock(blockData.id));
  // }

  // const editContent = (e:any) => {
    
  //   const selObj = window.getSelection();
  //   const range = document.createRange();
    
  //   // Select paragraph
  //   const focusOffset = selObj? selObj.focusOffset : 0;
   
  //   console.log(focusOffset, selObj? selObj.toString() : "없음", e.target.innerText.slice(focusOffset -2, focusOffset));

  //   switch(e.key) {
 
  //     case "Enter":
  //       e.preventDefault();
  //       break;

  //     case "ArrowUp": 
  //       if(blockData.preId) dispatch(editAble(blockData.preId))
  //       break;

  //     case "ArrowDown":
  //       if(blockData.nextId) dispatch(editAble(blockData.nextId));
  //       break;

  //     case "Backspace":
  //       if(!e.target.innerHTML) {
  //         onDeleteBlock();
  //         if(blockData.preId) dispatch(editAble(blockData.preId))
  //         else if(blockData.nextId) { dispatch(editAble(blockData.nextId))};
  //         break;
  //       }

  //   }

  // }

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
        // data-id={blockData.id}
        // ref={blockRef}
        // className={blockData.type}
        contentEditable={editing}
        // onKeyUp={editContent}
        // onKeyPress={addContent}
        // onFocus={()=>onEditAble(blockData.id)}
        // onMouseUp={dragData}
        // onMouseDown={dragData}
      >
        {
        blockData.children[0]? 

        blockData.children.map((child: any) => 
          <ChildBlock 
            blockData={child}
            key={child.id}
          />
        ) : blockData.contents?
        blockData.contents.map((content:any, idx: number) => {
          if(content.length === 1) {
            const data = content[0];
            return <ContentEle content={data} key={idx} />
          } else {
            return <BlockContent content={content} key={idx} />
          }
        }) : ""
      }
      </div>
      <button> 삭제 </button>
    </div>
  )
}

export default Block;