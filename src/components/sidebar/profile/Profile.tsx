import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

import EditorBlock from './EditorBlock';

import './profile.scss';
import usePage from '../../../hooks/usePage';

function Profile() {

  const {
    getUserInfo,
    onSignInUser,
    onReSignInUser
  } = useAuth();

  const {
    pageEditor
  } = usePage();

  useEffect(() => {
    if(!getUserInfo) {
      onSignInUser({email: "wjunhee102@gmail.com", password: "Admin123!"});
      // onReSignInUser();
    }
  }, [getUserInfo]);

  return (
    <div className={`user-profile flex-none w-full whitespace-nowrap border-b mb-12`}>
      { 
        getUserInfo? 
        <>
          <EditorBlock
            penName={pageEditor.penName}
            userPhoto={pageEditor.userPhoto}
            bio={pageEditor.bio}
          />
        </>
        : <div></div>
      }
    </div>
  )
}

export default Profile;