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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      <PageTitleMenuList hidden={hidden} handleClick={handleClick} />
    </div>
  );
}

export default EditPageTitleMenu;