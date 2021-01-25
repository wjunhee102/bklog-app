import React, { useMemo, useEffect } from 'react';
import useBKlog from '../../../hooks/useBKlog';
import { 
  BlockData, 
  ContentType,
} from '../../../types/bklog';
import { 
  findTextStyle,
  arrayUtils
} from '../utils';


interface TextStyleToggleButtonProps {
  onClick: any;
  addDelToggle: boolean;
  styleType: string;
}

function TextStyleToggleButton({
  onClick,
  addDelToggle,
  styleType
}: TextStyleToggleButtonProps) {

  const addDelClassName = addDelToggle? "del" : "add";

  useEffect(()=> {
    console.log("refresh", addDelToggle);
  }, [addDelToggle])

  return (
    <button 
      className={`bk-textStyleToggle ${addDelClassName}`}
      onClick={()=>onClick([styleType], addDelClassName)}
    >
      { styleType }
    </button>
  )
}

interface TextStyleTogglesProps {
  blockIndex: number;
  startPosition: number;
  endPosition: number;
  contents: any;
  reBlockFocus: any;
}

function TextStyleToggles({
  blockIndex, 
  startPosition,
  endPosition,
  contents,
  reBlockFocus
}: TextStyleTogglesProps) {
  const { onChangeTextStyle } = useBKlog();
  const { arrayFindIndex } = arrayUtils; 

  const toggleProps:string[] = ["b", "i", "_"];
  
  const colorCode:number[][] = [
    [191, 63, 63, 1],
    [191, 127, 63, 1],
    [191, 191, 63, 1],
    [127, 191, 63, 1],
    [63, 191, 63, 1],
    [63, 191, 127, 1],
    [63, 127, 191, 1],
    [63, 63, 191, 1],
    [63, 63, 191, 1],
    [127, 63, 191, 1],
    [191, 63, 191, 1],
    [191, 63, 127, 1]
  ];

  const handleClick = (type: ContentType, toggle: any) => {
    onChangeTextStyle(
      blockIndex, 
      type,
      startPosition, 
      endPosition,
      toggle
    )
    reBlockFocus();
  }

  const testUnder = () => {
    onChangeTextStyle(
      blockIndex, 
      ["_"],
      startPosition, 
      endPosition,
      "add"
    )
  }

  const includedStyle = useMemo(()=>
    findTextStyle(contents, startPosition),[contents]);

  const addDelToggle = (prop:any):boolean => {
    return arrayFindIndex(includedStyle? includedStyle : [], [prop]) !== -1? true : false;
  }

  return (
    <div 
      className="bk-style-toggles"
    >
      {
        toggleProps.map((prop, idx)=> 
          <TextStyleToggleButton 
            key={idx}
            onClick={handleClick}
            styleType={prop}
            addDelToggle={addDelToggle(prop)}
          />
        )
      }
    </div>
  )
}

export default TextStyleToggles;