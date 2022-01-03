import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import Profile from './component/profile';
import PageList from './component/page-list';
import './sidebar.scss';
import CreatePageButton from './component/CreatePageButton';
import useSidebar from './hooks/useSidebar';

const Sidebar: React.FC = () => {

  const {
    pageState,
    authState,
    pageListTable,
    handleClick,
    handleClick2
  } = useSidebar();

  return (
    <div className={
      classNames(
        "sidebar gnb-box",
        {"off": !pageState.toggle}
      )}
    >
      <div className="h-full">
        <nav className={`h-full bg-white overflow-hidden relative flex flex-col`}>
          <Profile />
          <PageList
            pageEditor={pageState.pageEditor}
            pageList={pageState.pageList}
          />
          {
            authState.user && (authState.user.id === pageState.pageEditor.id)? 
              <CreatePageButton onClick={handleClick2} /> : null
          }
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;