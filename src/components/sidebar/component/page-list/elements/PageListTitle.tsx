import React from 'react';

interface PageListTitleProps {
  title: string;
  handleHidden: () => void;
}

const PageListTitle: React.FC<PageListTitleProps> = ({
  title,
  handleHidden
}) => {
  return (
    <div className="page-list-title-box">
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