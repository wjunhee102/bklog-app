import React, { useMemo } from 'react';
import { ReqUpdatePageInfo } from '../../../../store/modules/page/utils';
import { PageListTable } from '../../hooks/useSidebar';
import PrePageListBlockBox from './elements/PrePageListBlockBox';
import './PageList.scss';

interface PageListProps {
  pageListTable: PageListTable;
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean;
  penName: string;
}

const PageList: React.FC<PageListProps> = ({
  pageListTable,
  onDeletePage,
  onUpdatePage,
  editable,
  penName
}) => {

  const PageListBlockBox = useMemo(() => PrePageListBlockBox({
    onDeletePage, 
    onUpdatePage,
    editable,
    penName
  }),[onUpdatePage, onDeletePage, editable, penName]);

  return (
    <div className="page-list-box">
      {
        pageListTable.private? 
        <PageListBlockBox title="private" pageList={pageListTable.private} /> 
        : null
      }
      {
        pageListTable.follwing? 
        <PageListBlockBox title="following" pageList={pageListTable.follwing} /> 
        : null
      }
      {
        pageListTable.public?
        <PageListBlockBox title="public" pageList={pageListTable.public} />
        : null
      }
    </div>
  );
}

export default PageList;