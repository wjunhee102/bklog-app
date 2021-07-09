import React, { useMemo, useEffect, useState } from 'react';
import { 
  BlockData, 
  ContentType
} from '../../../../types';
import { 
  findTextStyle,
  arrayFindIndex
} from '../../../../utils';

import ColorStyleToggle  from './ColorStyleToggle';
import { UseBlockType } from '../../../../hooks/useBlock';

const textBlockType = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p"
];

function TextBlockTypeSelection() {
  return (
    <select>
      { textBlockType.map(((type, idx) => <option key={idx}>{ type }</option>)) }
    </select>
  )
}

interface TextStyleToggleButtonProps {
  onStyleChange: any;
  addDelToggle: boolean;
  styleType: string;
}

function TextStyleToggleButton({
  onStyleChange,
  addDelToggle,
  styleType
}: TextStyleToggleButtonProps) {

  const addDelClassName = addDelToggle? "del" : "add";

  const handleClick = () => {
    console.log("123");
    onStyleChange([styleType], addDelClassName)
  }

  return (
    <button 
      className={`bk-textStyleToggle ${addDelClassName}`}
      onClick={handleClick}
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
  hooks: UseBlockType;
}

function TextStyleToggles({
  blockIndex, 
  startPosition,
  endPosition,
  contents,
  reBlockFocus,
  hooks
}: TextStyleTogglesProps) {
  const [ currentStyle, setStyle ] = useState(findTextStyle(contents, startPosition));
  const { onChangeTextStyle, onCommitBlock } = hooks;

  const toggleProps:string[] = ["b", "i", "_"];

  const onStyleChange = (styleType: ContentType, toggle: any) => {
    onCommitBlock();
    onChangeTextStyle(
      blockIndex, 
      styleType,
      startPosition, 
      endPosition,
      toggle
    )
    console.log("click", startPosition, endPosition);
    reBlockFocus();
  }

  const addDelToggle = (prop:any):boolean => {
    return arrayFindIndex(
      currentStyle? 
      currentStyle : [], 
      prop
      ) !== -1? true : false;
  }

  useEffect(()=> {
    setStyle(findTextStyle(contents, startPosition));
  }, [contents, startPosition]);

  return (
    <div 
      style={{left: `${startPosition * 16}px`}}
      className="bk-style-toggles absolute bg-white -top-full border"
    >
      <TextBlockTypeSelection 
      />
      {
        toggleProps.map((prop, idx)=> 
          <TextStyleToggleButton 
            key={idx}
            onStyleChange={onStyleChange}
            styleType={prop}
            addDelToggle={addDelToggle([prop])}
          />
        )
      }
      <ColorStyleToggle
        addDelToggle={addDelToggle}
        onStyleChange={onStyleChange}
      />
    </div>
  )
}

export default TextStyleToggles;