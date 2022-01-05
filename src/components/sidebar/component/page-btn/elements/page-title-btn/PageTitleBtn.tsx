import { SimplePageInfo } from '../../PageBtn';
import PageEditTitle from './PageEditTitle';
import PageTitleLink from './PageTitleLink';

interface PageTitleBtnProps extends SimplePageInfo {
  editToggle: boolean;
  handleChange: (title: string) => void;
}

const PageTitleBtn: React.FC<PageTitleBtnProps> = ({
  editToggle,
  penName,
  id,
  title,
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