import React from 'react';
import classNames from 'classnames';
import useBase from '../../hooks/useBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMoon } from '@fortawesome/free-solid-svg-icons';

function DarkModeToggle() {

  const { baseState: { dark }, onChangeMode } = useBase();

  const handleClickToggle = () => {
    onChangeMode();
  }

  return (
    <div className="dark-mode-toggle">
      <button 
        onClick={handleClickToggle}
        className={classNames(
          "mode-field hover:bg-yellow-300 transition-all bg-gray-200 dark:bg-gray-700 dark:hover:bg-indigo-900 w-16 h-8 rounded-full p-1 border-none",
          "text-2xl leading-6 text-left text-white dark:text-gray-500 hover:text-yellow-50 dark:hover:text-yellow-300"
        )}
      >
        <span className="sr-only">Dark mode toggle</span>
        <FontAwesomeIcon className={classNames("transform transition-all", {"translate-x-8": dark})} icon={dark? faMoon : faCircle} />
      </button>
    </div>
  )
}

export default DarkModeToggle;