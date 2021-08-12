import React from 'react';
import { Link } from 'react-router-dom';

interface EditorBlockProps {
  penName: string;
  userPhoto: string | null;
  bio: string;
}

function EditorBlock({ penName, bio ,userPhoto }: EditorBlockProps) {
  return (
    <div className="user-block px-4 pt-4 bg-purple-50">
      <div className="profile-text-block">
        <div className="penName font-semibold text-xl text-gray-600">
          { penName }
        </div>
        <div className="bi text-sm font-medium text-gray-600">
          { bio }
        </div>
      </div>
      <div className="profile-image-block w-full h-18 pt-6">
        <div className="avatar w-24 h-12 m-auto relative">
          <Link 
            to={`/bklog/${penName}`} 
            className="w-24 h-24 absolute hover:cursor-pointer rounded-full overflow-hidden border"
            title={`${penName} page 이동`}
          >
            {
              userPhoto? 
              <img className="w-full h-full" src={userPhoto} alt={penName} />
              : <div className="w-full h-full">{penName[0]}</div>
            }
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditorBlock;