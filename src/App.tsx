import React, { useEffect } from 'react';
import useBase from './hooks/useBase';
import classNames from 'classnames';
import './assets/App.scss';
import useAuth from './hooks/useAuth';
import Router from './router';


const App: React.FC = () => {

  const { baseState: { dark } } = useBase();
  const { 
    authState: { waitingCount, user },
    onReissueToken,
    onReSignInUser
  } = useAuth();

  // useEffect(() => {
  //   if(waitingCount && user) {
  //     if(waitingCount <= 5) {
  //       const timer = setTimeout(() => {
  //         onReissueToken();
  //       }, 2000);
  //       console.log(waitingCount);

  //       return () => clearTimeout(timer);
  //     } else {
  //       //onAllReset();
  //       /**
  //        * 500 page로 redirect
  //        */
  //     }
  //   }
  // }, [waitingCount]);

  useEffect(() => {
    if(!user) {
      onReSignInUser();
    }
  }, []);

  // all reset시 Home으로 이동

  return (
    <div className={classNames(
      "App w-full h-screen",
      {"dark": dark},
      {"light": !dark}
    )}>
      <div className="w-full h-full pt-14 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100">
        <Router />
      </div>
    </div>
  );
}

export default App;
