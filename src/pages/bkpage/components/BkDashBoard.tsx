import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import usePage from '../../../hooks/usePage';

const BkDashBoard: React.FC = () => {

  const [ btnToggle, setBtnToggle ] = useState<boolean>(false);

  const {
    pageState: {
      pageList
    },
    onCreatePage
  } = usePage();

  const {
    authState: {
      user
    }
  } = useAuth();

  useEffect(() => {

  }, [pageList]);

  const handleClick = () => {
    if(user) {
      onCreatePage(user.id, "undefined", 5);
    }
  }

  

  return (
    <div className="bk-dashboard">
      <button onClick={handleClick}>생성</button>
    </div>
  );
}

export default BkDashBoard;