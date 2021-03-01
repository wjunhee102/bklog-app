import React from 'react';
import { Link } from 'react-router-dom';

function PageList() {
  return (
    <div className="page-list">
      <ul className="list">
        <li>
          <Link to="/">
            home
          </Link>
        </li>
        <li>
          <Link to="/bklog/s1">
            bklog  
          </Link>
        </li>
        
      </ul>
      <ul>
        <li>
          
        </li>
      </ul>
    </div>
  )
}

export default PageList;