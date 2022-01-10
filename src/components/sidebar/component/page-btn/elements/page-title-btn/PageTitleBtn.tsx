import { Page } from '../../../../../../store/modules/page/utils';
import PageEditTitle from './PageEditTitle';
import PageTitleLink from './PageTitleLink';

interface PageTitleBtnProps {
  editToggle: boolean;
  handleChange: (title: string) => void;
  penName: string;
  page: Page
}

const PageTitleBtn: React.FC<PageTitleBtnProps> = ({
  editToggle,
  penName,
  page: {
    id, 
    title
  },
  handleChange
}) => {
  return (
    <div className="page-title-btn-box">
      {
        editToggle? <PageEditTitle title={title} handleChange={handleChange} />
        : <PageTitleLink title={title} to={`/bklog/penname/${penName}/${id}`} />
      }
    </div>
  );
}

export default PageTitleBtn;