import React from 'react';
import ActionButton from '../action-button';
import { ButtonProps } from './types';

interface ScrollMenuArticleProps {
  handleClick: (value: string) => void;
  buttonList: ButtonProps[];
  title?: string;
}

const ScrollMenuArticle: React.FC<ScrollMenuArticleProps> = ({
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

interface ScrollMenuArticlesProps {
  menuList: ScrollMenuArticleProps[];
}

const ScrollMenuArticles: React.FC<ScrollMenuArticlesProps> = ({
  menuList
}) => {
  return (
    <>
    {
      menuList.map((props, idx) => <ScrollMenuArticle {...props} key={idx} />)
    }
    </>
  );
}

export default ScrollMenuArticles;