import React from 'react';
import { Link } from 'react-router-dom';

interface EditorBlockProps {
  penName: string;
  userPhoto: string | null;
  bio: string;
}

const classes = [
  "user-block px-4 pt-4 bg-purple-50",
  "profile-text-block",
  "penName font-semibold text-xl text-gray-600",
  "bi text-sm font-medium text-gray-600",
  "profile-image-block w-full h-18 pt-6",
  "avatar w-24 h-12 m-auto relative",
  "w-24 h-24 absolute hover:cursor-pointer rounded-full overflow-hidden border",
  "w-full h-full",
  "w-full h-full"
]

function EditorBlock({ penName, bio ,userPhoto }: EditorBlockProps) {
  return (
    <div className={classes[0]}>
      <div className={classes[1]}>
        <div className={classes[2]}>
          { penName }
        </div>
        <div className={classes[3]}>
          { bio }
        </div>
      </div>
      <div className={classes[4]}>
        <div className={classes[5]}>
          <Link 
            to={`/bklog/${penName}`} 
            className={classes[6]} 
            title={`${penName} page 이동`}
          >
            {
              userPhoto? 
              <img className={classes[7]} src={userPhoto} alt={penName} />
              : <div className={classes[8]}>{penName[0]}</div>
            }
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditorBlock;