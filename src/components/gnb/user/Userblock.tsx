import React from 'react';
import { Link } from 'react-router-dom';

interface UserBlockProps {
  className?: string;
  penName: string;
  userPhoto: string;
  name: string;
}

function UserBlock({ 
  className, 
  penName, 
  userPhoto, 
  name 
}: UserBlockProps ) {
  return (
    <div className={`${className} pl-4`}>
      <div className="w-8 h-8 mr-4">
        <Link 
          className="block w-8 h-8 hover:cursor-pointer rounded-full overflow-hidden border-2"
          to={`/bklog/${penName}`}
        >
          {
            userPhoto?
            <img className="w-full h-full" src={userPhoto} alt={penName} />
            : <div className="w-full h-full"> {name[1]} </div>
          }
        </Link>
      </div>
      <div className="leading-8 font-semibold text-gray-600">
        <Link to={`/bklog/${penName}`}>
          { penName }
        </Link>
      </div>
    </div>
  )
}

export default UserBlock;