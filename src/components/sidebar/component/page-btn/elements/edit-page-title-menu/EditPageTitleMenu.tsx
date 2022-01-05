import React, { useState } from 'react';
import PageTitleMenuList from './PageTitleMenuList';
import './PageTitleMenu.scss';

interface PageTitleMenuProps {
  handleClick: (key: string) => void;
}

const EditPageTitleMenu: React.FC<PageTitleMenuProps> = ({
  handleClick
}) => {
  const [ hidden, setHidden ] = useState<boolean>(true);

  return (
    <div onMouseLeave={() => setHidden(true)} className="page-title-menu-box">
      <button className="page-title-menu-btn" onClick={() => setHidden(!hidden)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </button>

      <PageTitleMenuList hidden={hidden} handleClick={handleClick} />
    </div>
  );
}

export default EditPageTitleMenu;