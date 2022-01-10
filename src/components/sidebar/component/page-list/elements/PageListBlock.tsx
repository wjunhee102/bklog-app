import React, { useState } from 'react';
import { Page, ReqUpdatePageInfo } from '../../../../../store/modules/page/utils';
import PageBtnBox from './PageBtnBox';
import PageListTitle from './PageListTitle';

interface PageListBlockProps {
  title: string;
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean;
  pageList: Page[];
  penName: string;
}

const PageListBlock: React.FC<PageListBlockProps> = ({
  title,
  onUpdatePage,
  onDeletePage,
  editable,
  pageList,
  penName
}) => {
  const [ hidden, setHidden ] = useState<boolean>(false);

  const handleHidden = () => {
    setHidden(!hidden);
  }

  return (
    <div className="page-list-block">
      <PageListTitle 
        title={title}
        handleHidden={handleHidden}
      />

      <PageBtnBox 
        onDeletePage={onDeletePage}
        onUpdatePage={onUpdatePage}
        editable={editable}
        pageList={pageList}
        hidden={hidden}
        penName={penName}
      />
    </div>
  );
}

export default PageListBlock;