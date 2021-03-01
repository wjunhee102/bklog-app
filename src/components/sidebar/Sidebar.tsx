import React from 'react';
import Profile from './profile';
import PageList from './Page-list';
import './sidebar.scss';

function Sidebar() {
  return (
    <nav className={`gnb`}>
      <Profile />
      <PageList />
    </nav>
  )
}

export default Sidebar;