import { faBookOpen, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface PageListTitleProps {
  title: string;
  handleHidden: () => void;
}

const PageListTitleIconTable = {
  "private": <FontAwesomeIcon className="sidebar-svg" icon={faUserShield} />,
  "public": <FontAwesomeIcon className="sidebar-svg" icon={faBookOpen} />
}

const PageListTitle: React.FC<PageListTitleProps> = ({
  title,
  handleHidden
}) => {
  return (
    <div className="page-list-title-box">
      <div className="sidebar-icon-box">
        <div className="sidebar-icon">
          {
            PageListTitleIconTable[title]
          }
        </div>
      </div>

      <button 
        className="page-list-title"
        onClick={handleHidden}
      > 
        { title }
      </button>
    </div>
  );
}

export default PageListTitle;