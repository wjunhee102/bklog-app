import React from 'react';

interface ProfileProps {
  
}

function Profile() {

  return (
    <div className={`user-profile`}>
      <div className="user-photo">
        <img src="../../assets/logo.svg" alt=""/>
      </div>
      <div className="user-penName">test</div>
    </div>
  )
}

export default Profile;