import React, { useEffect, useState } from 'react';
import { 
  ContentType
} from '../../../../types';
import { 
  findTextStyle,
  arrayFindIndex
} from '../../../../utils';
import { UseBlockType }       from '../../../../hooks/useBlock';
import ColorStyleToggle       from './ColorStyleToggle';
import TextBlockTypeSelection from './TextBlockTypeSelection';
import TextStyleToggleButton  from './TextStyleToggleButton';

interface TextStyleTogglesProps {
  blockIndex: number;
  styleType: string;
  contents: any;
  startPosition: number;
  endPosition: number;
  reBlockFocus: any;
  useBlockReducer: UseBlockType;
}

const TextStyleToggles: React.FC<TextStyleTogglesProps> = ({
  blockIndex, 
  styleType,
  contents,
  startPosition,
  endPosition,
  reBlockFocus,
  useBlockReducer
}) => {
  const [ currentStyle, setStyle ] = useState(findTextStyle(contents, startPosition));
  const { 
    onChangeTextStyle, 
    onCommitBlock,
    onChangeStyleType
  } = useBlockReducer;

  const toggleProps:string[] = ["b", "i", "_"];

  const onStyleChange = (contentType: ContentType, toggle: any) => {
    onCommitBlock();
    onChangeTextStyle(
      blockIndex, 
      contentType,
      startPosition, 
      endPosition,
      toggle
    )
    console.log("click", startPosition, endPosition);
    reBlockFocus();
  }

  const addDelToggle = (prop: any): boolean => {
    return arrayFindIndex(
      currentStyle? 
      currentStyle : [], 
      prop
    ) !== -1? true : false;
  }

  useEffect(() => {
    setStyle(findTextStyle(contents, startPosition));
  }, [contents, startPosition]);

  return (
    <div 
      style={{left: `${startPosition * 16}px`}}
      className="bk-style-toggles absolute bg-white -top-full border"
    >
      <TextBlockTypeSelection
        blockIndex={blockIndex}
        styleType={styleType}
        onChangeStyleType={onChangeStyleType}
      />
      {
        toggleProps.map((prop)=> 
          <TextStyleToggleButton 
            key={prop}
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