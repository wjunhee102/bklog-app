import React, { useState } from 'react';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import UserBlock from './user/Userblock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import usePage from '../../hooks/usePage';


function dummyUserBlock() {
  return (
    <div>

    </div>
  )
}

function GlobalNav() {

  const {
    pageToggle,
    onChangeToggle
  } = usePage();

  const { getUserInfo } = useAuth();

  const handleClick = () => {
    onChangeToggle();
  }

  return (
    <nav className="bg-white w-full h-12 absolute left-0 top-0 z-10 shadow flex">
      <div className="left-box flex">
        <div className={classNames("w-12 h-12 p-1", {"bg-purple-400": pageToggle}, {"bg-white": !pageToggle})}>
          <button 
            className={classNames("w-10 h-10 text-xl", {"text-white": pageToggle}, {"text-purple-400": !pageToggle})}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div>
          {
            getUserInfo?
            <UserBlock 
              className="flex items-center p-2"
              penName={getUserInfo.penName}
              name={getUserInfo.name}
              userPhoto={getUserInfo.userPhoto}
            /> : <div></div>
          }
        </div>
      </div>
      
    </nav>
  )
}

export default GlobalNav;