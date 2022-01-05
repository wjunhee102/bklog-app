import React from 'react';
import classNames from 'classnames';
import ScrollMenu from '../../../../../common/scroll-menu';
import ScrollMenuArticles from '../../../../../common/scroll-menu/ScrollMenuArticles';
import { ButtonProps } from '../../../../../common/scroll-menu/types';

interface PageTitleMenuListProps {
  hidden: boolean;
  handleClick: (key: string) => void;
}

const buttonList: ButtonProps[] = [
  {
    title: "Delete",
    value: "del",
    IconComponent: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   </svg>
  },
  {
    title: "Rename",
    value: "ren",
    IconComponent: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                   </svg>
  }
];

const menuList = (handleClick: (key: string) => void) => ({
  handleClick,
  buttonList
});

const PageTitleMenuList: React.FC<PageTitleMenuListProps> = ({
  handleClick,
  hidden
}) => {
  return (
    <ScrollMenu className={classNames("page-title-menu", {
      hidden
    })}>
      <ScrollMenuArticles menuList={[menuList(handleClick)]} />
    </ScrollMenu>
  );
}

export default PageTitleMenuList;