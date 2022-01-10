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
      <Link className="page-title" to={to}>
        { title }
      </Link>
    </div>
  );
}

export default PageTitleLink;