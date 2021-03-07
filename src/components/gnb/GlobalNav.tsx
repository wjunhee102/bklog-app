import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import UserBlock from './user/Userblock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import usePage from '../../hooks/usePage';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';


function dummyUserBlock() {
  return (
    <div>

    </div>
  )
}

const LinkClasses = "hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

function GlobalNav() {

  const [ onUserMenu, setOnUserMenu ] = useState<boolean>(false); 

  const {
    pageToggle,
    onChangeToggle
  } = usePage();

  const { 
    authState: { loading, user },
    onSignOutUser
  } = useAuth();

  const handleClickToggle = () => {
    onChangeToggle();
  }

  const handleClickUserMenu = () => {
    setOnUserMenu(!onUserMenu);
  }

  const handleClickToggleFalse = (e: any) => {
    setOnUserMenu(false);
  }

  const handleClickSignOut = () => {
    onSignOutUser();
  }

  return (
    <nav className="bg-white dark:bg-black absolute left-0 top-0 z-10 shadow w-full">
      <div className="w-full pr-4 pl-1">
        <div className="flex items-center justify-between h-14">

        <div className="hidden md:block">
          <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <button 
              className={classNames("w-12 h-12 text-xl rounded", {"text-white bg-purple-500 shadow": pageToggle}, {"text-gray-500 hover:text-purple-500": !pageToggle})}
              onClick={handleClickToggle}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

            <div className="ml-0 relative">
              <div>
                {
                  user?
                  <UserBlock
                    className={classNames({"hover:bg-purple-500 hover:text-white outline-none": onUserMenu})}
                    userPhoto={user.userPhoto}
                    penName={user.penName}
                    onClick={handleClickUserMenu}
                  />
                  : loading?
                    <button className="max-w-xs rounded-full flex items-center text-sm" id="user-menu" aria-haspopup="true">
                      <span className="sr-only"></span>
                      <div className="h-8 w-8 rounded-full leading-8 bg-gray-200"></div>
                    </button> 
                  : <div className="flex items-center">
                      <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4 text-gray-700 dark:text-gray-100">
            
                          <Link className={LinkClasses} to="/auth/sign-in">Sign In</Link>
                          <Link className={LinkClasses} to="/auth/sign-up">Sign up</Link>
            
                        </div>
                      </div>
                    </div>
                }
              
              </div>
              {
                onUserMenu && user? 
                <div onMouseLeave={handleClickToggleFalse} className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <Link to={`/bklog/${user.penName}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Page</Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Profile</a>
                  <button 
                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleClickSignOut}
                  > Sign out </button>
                </div> : null
              }
              
            </div>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4 text-gray-700 dark:text-gray-100">

                <Link className={LinkClasses} to="/home">Home</Link>

              </div>
            </div>
                

          </div>
        </div>

        <div className="flex items-center">
          <DarkModeToggle />
        </div>

        </div>
      </div>
    </nav>
  )
}

export default GlobalNav;