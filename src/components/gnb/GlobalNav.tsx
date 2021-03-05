import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import UserBlock from './user/Userblock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faCircle } from '@fortawesome/free-solid-svg-icons';
import usePage from '../../hooks/usePage';
import { Link } from 'react-router-dom';
import useBase from '../../hooks/useBase';


function dummyUserBlock() {
  return (
    <div>

    </div>
  )
}

function DarkModeToggle() {

  const { baseState: { dark }, onChangeMode } = useBase();

  const handleClickToggle = () => {
    onChangeMode();
  }

  return (
    <div className="dark-mode-toggle">
      <div className={classNames(
        "mode-field transition-all bg-gray-200 dark:bg-indigo-900 w-16 h-8 rounded-full p-1"
      )}>
        <button 
          className={classNames(
            "transform transition-all bg-white w-6 h-6 rounded-full border-none text-white dark:text-gray-800",
            {"translate-x-8 bg-yellow-300" : dark}
          )}
          onClick={handleClickToggle}
        >
          <span className="sr-only">Dark mode toggle</span>
            <FontAwesomeIcon icon={dark? faMoon : faCircle} />
        </button>
      </div>
    </div>
  )
}


function GlobalNav() {

  const [ onUserMenu, setOnUserMenu ] = useState<boolean>(false); 

  const {
    pageToggle,
    onChangeToggle
  } = usePage();

  const { 
    getUserInfo,
    onReSignInUser,
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

  useEffect(()=> {
    if(!getUserInfo) {
      // onReSignInUser();
    }
  }, [getUserInfo])

  return (
    <nav className="bg-white absolute left-0 top-0 z-10 shadow w-full">
      <div className="w-full pr-4 pl-1">
        <div className="flex items-center justify-between h-14">

        {/* <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
          </div>
        </div> */}

        <div className="hidden md:block">
          <div className="flex items-center space-x-6">
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
                  getUserInfo?
                  <UserBlock
                    className={classNames({"outline-none ring-2 ring-offset-2 ring-offset-purple-500 ring-white shadow": onUserMenu})}
                    userPhoto={getUserInfo.userPhoto}
                    penName={getUserInfo.penName}
                    name={getUserInfo.name}
                    onClick={handleClickUserMenu}
                  />
                  : <button className="max-w-xs rounded-full flex items-center text-sm" id="user-menu" aria-haspopup="true">
                      <span className="sr-only"></span>
                      <div className="h-8 w-8 rounded-full leading-8 bg-gray-200"></div>
                    </button>
                }
                
              </div>
              {
                onUserMenu && getUserInfo? 
                <div onMouseLeave={handleClickToggleFalse} className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <Link to={`/bklog/${getUserInfo.penName}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Page</Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Profile</a>
                  <button 
                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleClickSignOut}
                  > Sign out </button>
                </div> : null
              }
              
            </div>

            <DarkModeToggle />

            {/* <button className="bg-gray-100 p-1 w-8 h-8 rounded-full text-gray-500 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <FontAwesomeIcon className="w-6 h-6" icon={faBell} />
            </button> */}

          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">

              <Link className="text-gray-700 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/auth/sign-in">Sign In</Link>
              <Link className="text-gray-700 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/auth/sign-up">Sign up</Link>
              <button className="text-gray-700 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleClickSignOut}>Sign out</button>

            </div>
          </div>
        </div>

        </div>
      </div>
    </nav>
  )
}

export default GlobalNav;