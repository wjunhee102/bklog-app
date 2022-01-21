import React, { useEffect, useMemo, useState } from 'react';
import { UseBlockType } from '../../../../../../hooks/useBlock';
import { BlockData, BlockTypes, ContentType, OrderType } from '../../../../../../types';
import { findTextStyle } from '../../../../../../utils';
import ColorActionMenu from './color-action-menu/ColorActionMenu';
import BlockStyleActionMenu from './block-action-menu/BlockStyleActionMenu';
import TextStyleToggleMenu from './text-style-toggle-menu/TextStyleToggleMenu';
import BlockMenuBar from '../../../../../common/menubar';
import './TextBlockActionMenubar.scss';
import classNames from 'classnames';
import BlockTypeActionMenu from './block-action-menu/BlockTypeActionMenu';

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

export type MenuName = "not" | "color" | "blockStyleType" | "blockType";

interface TextBlockActionMenuBarProps {
  show: boolean;
  blockData: BlockData;
  startPosition: number;
  endPosition: number;
  reBlockFocus: any;
  useBlockReducer: UseBlockType;
}

const TextBlockActionMenuBar: React.FC<TextBlockActionMenuBarProps> | null = ({
  show,
  blockData: {
    index,
    styleType,
    type,
    contents
  },
  startPosition,
  endPosition,
  reBlockFocus,
  useBlockReducer
}) => {
  const {
    onChangeTextStyle,
    onCommitBlock,
    onChangeStyleType,
    onChangeBlockType
  } = useBlockReducer;

  const [ currentMenuName, setCurrentMenuName ] = useState<MenuName>("not");

  const onStyleChange = (contentType: ContentType, toggle: OrderType) => {
    onCommitBlock();
    onChangeTextStyle(
      index, 
      contentType,
      startPosition, 
      endPosition,
      toggle
    )
    setCurrentMenuName("not");
    reBlockFocus();
  }

  const changeTextType = (value: string) => () => {
    onChangeStyleType(index, value);
    setCurrentMenuName("not");
  }

  const changeBlockType = (value: BlockTypes) => () => {
    onChangeBlockType(index, value);
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
      className={classNames("text-block-action-menubar", {
        "block": show
      })}
      style={{left: `${startPosition * setLeftPosition(styleType)}px`}}
    >
      <BlockMenuBar bgColor="blur-bg">
        <BlockTypeActionMenu 
          type={type}
          handleClick={changeBlockType}
          toggle={setToggle("blockType")}
          onClick={changeCurrentMenuName("blockType")}
        />
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