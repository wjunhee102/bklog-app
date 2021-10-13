import React from 'react';
import ActionButton from './ActionButton';
import './index.scss';

export interface ButtonProps {
  title: string;
  value: string;
  img?: string;
}

interface BlockScrollMenuArticleProps {
  handleClick: any;
  buttonList: ButtonProps[];
  title: string;
}

const BlockScrollMenuArtiicle: React.FC<BlockScrollMenuArticleProps> = ({
  handleClick,
  buttonList,
  title
}) => {
  return (
    <div className="py-2">
      <div className="title">
        <span>{title}</span>
      </div>

      <ul className="list">
        {
          buttonList.map((props, idx) => (
            <li>
              <ActionButton {...props} key={idx} handleClick={handleClick} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

interface BlockScrollMenuProps {
  menuList: BlockScrollMenuArticleProps[]
}

const BlockScrollMenu: React.FC<BlockScrollMenuProps> = ({
  menuList
}) => {
  return (
    <div className="block-scroll-menu backdrop-blur">
      {
        menuList.map((props, idx) => <BlockScrollMenuArtiicle {...props} key={idx} />)
      }
    </div>
  );
} 

export default BlockScrollMenu;