import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';

import EditorBlock from './EditorBlock';

import './profile.scss';
import usePage from '../../../../hooks/usePage';

function Profile() {

  const {
    pageState: {
      pageEditor
    }
  } = usePage();

  return (
    <div className={`user-profile flex-none w-full whitespace-nowrap border-b mb-12`}>
      { 
        (pageEditor && pageEditor.penName && pageEditor.photo && pageEditor.bio)? 
        <>
          <EditorBlock
            penName={pageEditor.penName}
            photo={pageEditor.photo}
            bio={pageEditor.bio}
          />
        </>
        : <div></div>
      }
    </div>
  )
}

export default Profile;