import React from 'react';
import ActionButton from './ActionButton';

export interface ButtonProps {
  title: string;
  value: string | null;
  IconComponent?: React.ComponentElement<any, any>
}

interface BlockScrollMenuArticleProps {
  handleClick: (value: string) => () => void;
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
            <li key={idx}>
              <ActionButton {...props} key={idx} handleClick={handleClick} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

interface BlockScrollMenuArticlesProps {
  menuList: BlockScrollMenuArticleProps[];
}

const BlockScrollMenuArticles: React.FC<BlockScrollMenuArticlesProps> = ({
  menuList
}) => {
  return (
    <>
    {
      menuList.map((props, idx) => <BlockScrollMenuArtiicle {...props} key={idx} />)
    }
    </>
  );
}

export default BlockScrollMenuArticles;