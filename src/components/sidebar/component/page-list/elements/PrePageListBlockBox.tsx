import React from 'react';
import { Page, ReqUpdatePageInfo } from '../../../../../store/modules/page/utils';
import PageListBlock from './PageListBlock';

interface PreSetPageListBlockBoxProps {
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean;
  penName: string;
}

interface PageListBlockBoxProps {
  title: string;
  pageList: Page[]
}

const PrePageListBlockBox: (props: PreSetPageListBlockBoxProps) => React.FC<PageListBlockBoxProps> = ({
  onDeletePage,
  onUpdatePage,
  editable,
  penName
}) => ({
  title, pageList 
}) => {
  return (
    <PageListBlock 
      onDeletePage={onDeletePage}
      onUpdatePage={onUpdatePage}
      editable={editable}
      title={title}
      pageList={pageList}
      penName={penName}
    />
  );
}

export default PrePageListBlockBox;