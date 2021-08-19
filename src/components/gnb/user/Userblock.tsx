import React from 'react';

interface UserBlockProps {
  className?: string;
  penName: string;
  photo: string | null;
  onClick: any;
}

const UserBlock: React.FC<UserBlockProps> = ({ 
  className, 
  penName, 
  photo,
  onClick
}: UserBlockProps ) => {
  return (
    <button onClick={onClick} className={`${className} max-w-xs rounded-xl flex items-center text-sm py-1 px-2`} id="user-menu">
      <span className="sr-only">{penName}</span>
      {
        photo? 
        <img className="h-8 w-8 rounded-full" src={photo} alt={penName} />
        : <div className="h-8 w-8 rounded-full bg-blue-400 leading-8">{penName[0]}</div>
      } 
      <span className="ml-4">{penName}</span>
    </button>
  )
}

export default UserBlock;