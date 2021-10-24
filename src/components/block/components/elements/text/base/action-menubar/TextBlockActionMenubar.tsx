import React, { useMemo, useState } from 'react';
import { UseBlockType } from '../../../../../hooks/useBlock';
import { ContentType, OrderType } from '../../../../../types';
import { findTextStyle } from '../../../../../utils';
import ColorActionMenu from './color-action-menu/ColorActionMenu';
import BlockStyleActionMenu from './block-action-menu/BlockStyleActionMenu';
import TextStyleToggleMenu from './text-style-toggle-menu/TextStyleToggleMenu';
import BlockMenuBar from '../../../../menubar';
import './TextBlockActionMenubar.scss';

const FONT_SIZE_TABLE = {
  "bk-h1": 24,
  "bk-h2": 20,
  "bk-h3": 16,
  "bk-h4": 12,
  "bk-p": 8
}

 const setLeftPosition = (styleType: string) => {
   if(styleType in FONT_SIZE_TABLE) {
     return FONT_SIZE_TABLE[styleType]
   } else {
     return 16;
   }
 }

export type MenuName = "not" | "color" | "blockStyleType";

interface TextBlockActionMenuBarProps {
  blockIndex: number;
  styleType: string;
  contents: any;
  startPosition: number;
  endPosition: number;
  reBlockFocus: any;
  useBlockReducer: UseBlockType;
}

const TextBlockActionMenuBar: React.FC<TextBlockActionMenuBarProps> | null = ({
  blockIndex,
  styleType,
  contents,
  startPosition,
  endPosition,
  reBlockFocus,
  useBlockReducer
}) => {
  const {
    onChangeTextStyle,
    onCommitBlock,
    onChangeStyleType
  } = useBlockReducer;

  const [ currentMenuName, setCurrentMenuName ] = useState<MenuName>("not");

  const onStyleChange = (contentType: ContentType, toggle: OrderType) => {
    onCommitBlock();
    onChangeTextStyle(
      blockIndex, 
      contentType,
      startPosition, 
      endPosition,
      toggle
    )
    setCurrentMenuName("not");
    reBlockFocus();
  }

  const changeTextType = (value: string) => () => {
    onChangeStyleType(blockIndex, value);
    setCurrentMenuName("not");
  }

  const changeColorType = (type: "fc" | "bc") => (value: string) => () => {
    onStyleChange([type, value], "color");
  }

  const changeCurrentMenuName = (name: MenuName) => () => {
    setCurrentMenuName(name === currentMenuName? "not" : name);
  }

  const setToggle = (name: MenuName) => name === currentMenuName;

  const textStyle = useMemo(() => 
    findTextStyle(contents, startPosition), 
  [contents, startPosition]);

  return (
    <div 
      className="text-block-action-menubar"
      style={{left: `${startPosition * setLeftPosition(styleType)}px`}}
    >
      <BlockMenuBar bgColor="blur-bg">
        <BlockStyleActionMenu
          styleType={styleType}
          handleClick={changeTextType}
          toggle={setToggle("blockStyleType")}
          onClick={changeCurrentMenuName("blockStyleType")}
        />
        <TextStyleToggleMenu 
          textStyle={textStyle}
          onStyleChange={onStyleChange}
        />
        <ColorActionMenu 
          handleClick={changeColorType}
          toggle={setToggle("color")}
          onClick={changeCurrentMenuName("color")}
          textStyle={textStyle}
        />
      </BlockMenuBar>
    </div>
  );
}

export default TextBlockActionMenuBar;