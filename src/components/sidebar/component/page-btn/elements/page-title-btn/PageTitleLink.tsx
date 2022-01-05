import React from 'react';
import { Link } from 'react-router-dom';

interface PageTitleLinkProps {
  to: string;
  title: string;
}

const PageTitleLink: React.FC<PageTitleLinkProps> = ({
  to,
  title
}) => {
  return (
    <div className="page-title-box">
      {/* <Link to={to}>
        { title }
      </Link> */}
      <a href="">
        { title }
      </a>
    </div>
  );
}

export default PageTitleLink;