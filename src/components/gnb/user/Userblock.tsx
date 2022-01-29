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
    <button onClick={onClick} className={`${className} max-w-xs rounded-xl flex items-center text-sm py-1 px-2 capitalize`} id="user-menu">
      <span className="sr-only">{penName}</span>
      {
        photo? 
        <img className="h-8 w-8 rounded-full" src={photo} alt={penName} />
        : <div className="h-8 w-8 rounded-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
      } 
      <span className="ml-4">{penName}</span>
    </button>
  )
}

export default UserBlock;