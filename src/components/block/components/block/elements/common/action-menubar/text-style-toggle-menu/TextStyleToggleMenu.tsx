import React from 'react';
import { ContentType, OrderType } from '../../../../../../types';
import { arrayFindIndex } from '../../../../../../utils';
import ActionMenuBox from '../common/ActionMenuBox';
import TextStyleToggle from './TextStyleToggle';

export interface ToggleProps {
  title: string;
  style: string;
  value: "b" | "i" | "_";
}

const toggleList: ToggleProps[] = [
  {
    title: "B",
    value: "b",
    style: "font-bold"
  },
  {
    title: "i",
    value: "i",
    style: "italic"
  },
  {
    title: "U",
    value: "_",
    style: "underline"
  }
]

const addDelToggle = (prop: any, textStyle: ContentType[]): boolean => {
  if(!textStyle) return false;
  
  return arrayFindIndex( 
    textStyle, 
    prop
  ) !== -1? true : false;
}

interface TextStyleToggleMenuProps {
  textStyle: ContentType[];
  onStyleChange: (contentType: ContentType, toggle: OrderType) => void;
}

const TextStyleToggleMenu: React.FC<TextStyleToggleMenuProps> = ({
  textStyle,
  onStyleChange
}) => {

  const handleClick = (contentType: ContentType) => (toggle: boolean) => () => {
    onStyleChange(contentType, toggle? "del" : "add");
  }

  return (
    <ActionMenuBox>
      {
        toggleList.map(({title, value, style}, idx) => 
          <TextStyleToggle
            key={idx} 
            title={title} 
            value={value}
            style={style}
            handleClick={handleClick([value])} 
            toggle={addDelToggle([value], textStyle)}
        />)
      }
    </ActionMenuBox>
  );
}

export default TextStyleToggleMenu;