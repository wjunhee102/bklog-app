import React from 'react';

interface UserBlockProps {
  className?: string;
  penName: string;
  userPhoto: string;
  name: string;
  onClick: any;
}

function UserBlock({ 
  className, 
  penName, 
  userPhoto, 
  name,
  onClick
}: UserBlockProps ) {
  return (
    <button onClick={onClick} className={`${className} max-w-xs rounded-full flex items-center text-sm`} id="user-menu">
      <span className="sr-only">penName</span>
      {
        userPhoto? 
        <img className="h-8 w-8 rounded-full" src={userPhoto} alt={penName} />
        : <div className="h-8 w-8 rounded-full bg-blue-400 leading-8">{penName[0]}</div>
      } 
      
    </button>
  )
}

export default UserBlock;