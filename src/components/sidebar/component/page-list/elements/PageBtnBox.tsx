import React from 'react';
import classNames from 'classnames';
import { Page, ReqUpdatePageInfo } from '../../../../../store/modules/page/utils';
import PageBtn from '../../page-btn/PageBtn';

interface PageBtnBoxProps {
  onUpdatePage: (data: ReqUpdatePageInfo) => void;
  onDeletePage: (pageId: string) => void;
  editable: boolean;
  hidden: boolean;
  pageList: Page[];
  penName: string;
}

const PageBtnBox: React.FC<PageBtnBoxProps> = ({
  onDeletePage,
  onUpdatePage,
  editable,
  hidden,
  pageList,
  penName
}) => {
  return (
    <div className={classNames(
      "page-btn-container",
      { drop: !hidden}
    )}>
      {
        pageList.map((page) =>
          <PageBtn 
            key={page.id}
            penName={penName}
            page={page}
            onDeletePage={onDeletePage}
            onUpdatePage={onUpdatePage}
            editable={editable}
          />
        )
      }
    </div>
  );
}

export default PageBtnBox;