import classNames from 'classnames';
import React from 'react';
import LoadingCircle from '../loading-circle';

interface LoadingWindowProps {
  dark?: boolean;
  cover?: boolean;
}

const LoadingWindow: React.FC<LoadingWindowProps> = ({ dark, cover }) => {
  return (
    <div className={classNames(
      "loading-window flex bg-white dark:bg-gray-800 left-0 top-0 z-20 justify-center items-center",
      { "dark": dark },
      { 
        "w-full h-full": !cover,
        "w-screen h-screen": cover
      }
    )}>
      <LoadingCircle />
    </div>
  );
}

export default LoadingWindow;