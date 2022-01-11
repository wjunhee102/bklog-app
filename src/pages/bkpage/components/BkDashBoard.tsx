import React, { useEffect, useState } from 'react';
import { UseBkPageTypes } from '../hooks/useBkPage';

interface BkDashBoardProps {
  bkPageHooks: UseBkPageTypes;
}

const BkDashBoard: React.FC<BkDashBoardProps> = ({
  bkPageHooks: {
    usePageHooks,
    useAuthHooks
  }
}) => {

  const [ btnToggle, setBtnToggle ] = useState<boolean>(false);

  const {
    pageState: {
      pageList
    },
    onCreatePage
  } = usePageHooks;

  const {
    authState: {
      user
    }
  } = useAuthHooks

  useEffect(() => {

  }, [pageList]);

  const handleClick = () => {
    if(user) {
      onCreatePage("undefined", 1);
    }
  }  

  return (
    <div className="bk-dashboard">
      <button onClick={handleClick}>생성</button>
    </div>
  );
}

export default BkDashBoard;