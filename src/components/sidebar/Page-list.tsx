import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import usePage from '../../hooks/usePage';
import { UserProfile } from '../../store/modules/auth/utils';
import { Page } from '../../store/modules/page/utils';

interface PageListProps {
  pageEditor: UserProfile;
  pageList: Page[];
}

function PageList({ pageEditor, pageList }: PageListProps) {

  return (
    <div className="page-list flex-1 overflow-auto pt-1">
      <div className="pl-4 text-base font-semibold">
        Page list
      </div>
      <ul className="list p-4 font-semibold text-sm text-gray-600">
        {
          pageList? pageList.map((page, idx) =>
            <li key={idx} className="h-auto flex justify-between px-2">
              <div className="h-8 leading-8 w-5/6 flex-none">
                <Link to={`/bklog/${pageEditor.penName}/${page.pageId}`}>
                  {` ${page.pageTitle}`}
                </Link>
              </div>
               {/**
                누르면 색이 바뀌게 하면 될거 같음.
              */}
              <button className="h-8 pb-2 w-8 outline-none click:outline-none text-gray-300 hover:text-gray-600">
                <FontAwesomeIcon icon={faSortDown} />
              </button>
            </li>  
          ) : <li></li>
        }
        
      </ul>
      <ul>
        <li>
          
        </li>
      </ul>
    </div>
  )
}

export default PageList;