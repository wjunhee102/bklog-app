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
    onDeletePage,
    onUpdatePage,
  } = useSidebar();

  return (
    <div className={
      classNames(
        "sidebar gnb-box",
        {"off": !pageState.toggle}
      )}
    >
      <div className="h-full">
        <nav className={`h-full bg-white relative flex flex-col`}>
          <Profile />
          {/* <PageList
            pageEditor={pageState.pageEditor}
            pageList={pageState.pageList}
          /> */}
          {
            pageListTable?
            <PageList 
              penName={pageState.pageEditor.penName} 
              pageListTable={pageListTable} 
              editable={true}
              onDeletePage={onDeletePage}
              onUpdatePage={onUpdatePage}
            /> 
            : null
          }
          {
            authState.user && (authState.user.id === pageState.pageEditor.id)? 
              <CreatePageButton onClick={handleClick} /> : null
          }
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;