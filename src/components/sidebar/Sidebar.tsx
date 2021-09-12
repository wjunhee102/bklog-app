import React, { useEffect } from 'react';
import classNames from 'classnames';
import Profile from './component/profile';
import PageList from './component/Page-list';
import './sidebar.scss';
import usePage from '../../hooks/usePage';
import useAuth from '../../hooks/useAuth';
import CreatePageButton from './component/CreatePageButton';

function Sidebar() {

  const {
    authState
  } = useAuth();

  const { 
    pageState,
    onCreatePage
  } = usePage();

  const handleClick = () => {
    onCreatePage(authState.user.profileId, "page", 5);
  }

  useEffect(() => {
    console.log(authState);
  }, [authState]);

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
          {
            authState.user && (authState.user.profileId === pageState.pageEditor.profileId)? 
              <CreatePageButton onClick={handleClick} /> : null
          }
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;