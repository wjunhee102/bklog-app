import React from 'react';
import classNames from 'classnames';
import Profile from './component/profile';
import PageList from './component/page-list';
import CreatePageButton from './component/CreatePageButton';
import useSidebar from './hooks/useSidebar';
import './sidebar.scss';
import { UseBkPageTypes } from '../../pages/bkpage/hooks/useBkPage';
import EditorBlock from './component/editor-block';

interface SidebarProps {
  bkPageHooks: UseBkPageTypes;
}

const Sidebar: React.FC<SidebarProps> = ({
  bkPageHooks
}) => {

  const {
    pageState,
    authState,
    pageListTable,
    handleClick,
    onDeletePage,
    onUpdatePage,
  } = useSidebar(bkPageHooks);

  return (
    <div className={
      classNames(
        "sidebar-container",
        {"off": !pageState.toggle}
      )}
    >
      <div className="sidebar-contents-area">
        <nav className="sidebar">
          <EditorBlock bkPageHooks={bkPageHooks} />
          {
            pageListTable && pageState.pageEditor.penName?
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