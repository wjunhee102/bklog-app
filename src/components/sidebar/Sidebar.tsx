import React from 'react';
import classNames from 'classnames';
import Profile from './profile';
import PageList from './Page-list';
import './sidebar.scss';
import usePage from '../../hooks/usePage';

function Sidebar() {

  const { pageState } = usePage();

  return (
    <div className={
      classNames(
        "sidebar h-full flex-none gnb-box overflow-hidden",
        {"off": !pageState.toggle}
      )}
    >
      <div className="h-full py-2 pl-2">
        <nav className={` h-full rounded-md shadow-md bg-white overflow-hidden relative flex flex-col`}>
          <Profile />
          <PageList
            pageEditor={pageState.pageEditor}
            pageList={pageState.pageList}
          />
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;