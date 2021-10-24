import React, { useState } from 'react';
import BlockScrollMenu from '../../../../../virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../virtual-scroll/BlockScrollMenuAriticles';
import ActionMenuBox from '../common/ActionMenuBox';
import ActionMenuToggle from '../common/ActionMenuToggle';

const buttonList: ButtonProps[] = [
  {
    title: "Text",
    value: "bk-p",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "Heading 1",
    value: "bk-h1",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 2",
    value: "bk-h2",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 3",
    value: "bk-h3",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "To-do list",
    value: "bk-todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "Bulleted list",
    value: "bk-bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "Numbered list",
    value: "bk-numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

const BlockTypeTable = {
   "bk-p"        : "Text",
   "bk-h1"       : "Heading 1",
   "bk-h2"       : "Heading 2",
   "bk-h3"       : "Heading 3",
   "bk-todo"     : "To-do list",
   "bk-bulleted" : "Bulleted list",
   "bk-numbered" : "Numbered list"
}

const switchBlockType = (styleType: string) => styleType in BlockTypeTable? 
  BlockTypeTable[styleType] : "Text";


const menuList = (handleClick: (value: string) => () => void) => [
  {
    title: "turn into",
    buttonList,
    handleClick
  }
]

interface BlockStyleActionMenuArticleProps {
  handleClick: (value: string) => () => void;
  toggle: boolean;
}

const BlockStyleActionMenuArticle: React.FC<BlockStyleActionMenuArticleProps> | null = ({
  handleClick,
  toggle
}) => {
  return toggle? (
    <div className="menu-box">
      <BlockScrollMenu>
        <BlockScrollMenuArticles menuList={menuList(handleClick)} />
      </BlockScrollMenu>
    </div>
  ) : null
}

interface BlockStyleActionMenuProps {
  styleType: string;
  handleClick: (value: string) => () => void;
  toggle: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const BlockStyleActionMenu: React.FC<BlockStyleActionMenuProps> = ({
  handleClick,
  toggle,
  onClick,
  styleType
}) => {

  return (
    <ActionMenuBox>
      <ActionMenuToggle
        onClick={onClick}
      >
        { switchBlockType(styleType) }
      </ActionMenuToggle>
      <BlockStyleActionMenuArticle handleClick={handleClick} toggle={toggle} /> 
    </ActionMenuBox>
  )
}

export default BlockStyleActionMenu;