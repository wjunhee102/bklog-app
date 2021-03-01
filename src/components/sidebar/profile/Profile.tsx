import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

import UserBlock from './UserBlock';

import './profile.scss';

function Profile() {

  const {
    getUserInfo,
    onSignInUser,
    onReSignInUser
  } = useAuth();

  useEffect(() => {
    if(!getUserInfo) {
      onSignInUser({email: "wjunhee102@gmail.com", password: "Admin123!"});
      // onReSignInUser();
    }
  }, [getUserInfo]);

  return (
    <div className={`user-profile w-full px-6 py-4 whitespace-nowrap`}>
      { 
        getUserInfo? 
        <>
          <UserBlock
            penName={getUserInfo.penName}
            name={getUserInfo.name}
            userPhoto={getUserInfo.userPhoto}
          />
          <div className="mt-4">{ getUserInfo.penName }이동 -> </div>
        </>
        : <div></div>
      }
    </div>
  )
}

export default Profile;