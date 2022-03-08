import React, { useEffect, useState } from 'react';
import { UseBkPageTypes } from '../hooks/useBkPage';

interface BkDashBoardProps {
  bkPageHooks: UseBkPageTypes;
}

const BkDashBoard: React.FC<BkDashBoardProps> = ({
  bkPageHooks: {
    usePageHooks,
    useAuthHooks,
    navigate
  }
}) => {

  const [ btnToggle, setBtnToggle ] = useState<boolean>(false);

  const {
    pageState: {
      pageEditor,
      pageList,
      tempPageInfo
    },
    onCreatePage
  } = usePageHooks;

  const {
    authState: {
      user
    }
  } = useAuthHooks

  // useEffect(() => {

  // }, [pageList]);

  const handleClick = () => {
    if(user && user.id === pageEditor.id) {
      onCreatePage("page", 1);
    }
  }  

  return (
    <div className="bk-dashboard"> 
      {
        user && user.id === pageEditor.id?
        <button className="create-btn gradient gradient-hover" onClick={handleClick}>페이지 생성</button>
        : null
      }
    </div>
  );
}

export default BkDashBoard;