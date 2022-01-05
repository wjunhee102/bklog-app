import React, { useCallback, useState } from 'react';
import { ReqUpdatePageInfo } from '../../../../store/modules/page/utils';
import PageTitleBtn from './elements/page-title-btn';
import EditPageTitleMenu from './elements/edit-page-title-menu';
import './PageBtn.scss';

export interface SimplePageInfo {
  penName: string;
  id: string;
  title: string;
}

interface PageBtnProps extends SimplePageInfo {
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean
}

const PageBtn: React.FC<PageBtnProps> = ({
  penName,
  id,
  title,
  onUpdatePage,
  onDeletePage,
  editable
}) => {
  const [ editToggle, setEditToggle ] = useState<boolean>(false);

  const handleChange = useCallback((title: string) => {
    onUpdatePage({
      pageId: id,
      data: {
        title
      }
    });
    setEditToggle(false);
  }, [onUpdatePage]);

  const handleAction = useCallback((key: string) => {
    switch(key) {
      case "del":
        onDeletePage(id);
        break
      case "ren":
        setEditToggle(true);
        break
    }
  }, [onDeletePage]);

  return (
    <div className="page-btn-box">

      <PageTitleBtn
        editToggle={editToggle} 
        penName={penName}
        id={id}
        title={title}
        handleChange={handleChange}
      />

      {
        editable? 
        <EditPageTitleMenu 
          handleClick={handleAction} 
        /> : null
      }
      
    </div>
  );
}

export default PageBtn;