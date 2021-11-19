import React from 'react';
import ActionButton from '../action-button';
import { ButtonProps } from '../button-list/types';

interface BlockScrollMenuArticleProps {
  handleClick: (value: string) => void;
  buttonList: ButtonProps[];
  title?: string;
}

const BlockScrollMenuArticle: React.FC<BlockScrollMenuArticleProps> = ({
  handleClick,
  buttonList,
  title
}) => {
  return (
    <div className="py-2">
      {
        title? 
        <div className="title">
          <span>{title}</span>
        </div>
        : null
      }
      
      <ul className="list">
        {
          buttonList.map(({IconComponent, value, title}, idx) => (
            <li key={idx}>
              <ActionButton 
                IconComponent={IconComponent} 
                onClick={() => handleClick(value)}
              >
                { title }
              </ActionButton>
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
      menuList.map((props, idx) => <BlockScrollMenuArticle {...props} key={idx} />)
    }
    </>
  );
}

export default BlockScrollMenuArticles;