import React from 'react';
import { Link } from 'react-router-dom';

interface UserBlockProps {
  penName: string;
  userPhoto: string | null;
  name: string;
}

const nameBlockClasses = "h-10 w-10 rounded-full bg-red-100 text-center leading-10 text-red-300 font-semibold text-3xl capitalize";

function UserBlock({ penName, userPhoto, name }: UserBlockProps) {
  return (
    <div className="user-block flex items-center divide-solid divide-white-200"> 
      <div className="photo-block flex-shrink-0 h-10 w-10">
        {
          userPhoto? 
          <img className="h-10 w-10 rounded-full" src={userPhoto} alt={name} /> 
          : <div className={`name-block ${nameBlockClasses}`}>{name[0]}</div>
        }
      </div>
      <div className="detail-block ml-4 h-10 items-center pt-1">
        <div className="pen-name text-base font-semibold text-gray-700 capitalize leading-4">
          { penName }
        </div>
        <div className="m-0 leading-3">
          <Link to="/user/detail" className="text-sm text-gray-400 font-medium">
            View Profile
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default UserBlock;