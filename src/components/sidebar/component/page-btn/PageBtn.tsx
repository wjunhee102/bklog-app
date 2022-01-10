import React, { useCallback, useState } from 'react';
import { Page, ReqUpdatePageInfo } from '../../../../store/modules/page/utils';
import PageTitleBtn from './elements/page-title-btn';
import EditPageTitleMenu from './elements/edit-page-title-menu';
import './PageBtn.scss';

interface PageBtnProps {
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean;
  penName: string;
  page: Page
}

const PageBtn: React.FC<PageBtnProps> = ({
  penName,
  page,
  onUpdatePage,
  onDeletePage,
  editable
}) => {
  const [ editToggle, setEditToggle ] = useState<boolean>(false);

  const handleChange = useCallback((title: string) => {
    onUpdatePage({
      pageId: page.id,
      data: {
        title
      }
    });
    setEditToggle(false);
  }, [onUpdatePage]);

  const handleAction = useCallback((key: string) => {
    switch(key) {
      case "del":
        onDeletePage(page.id);
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
        page={page}
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