import useChange from '../../../../../../hooks/useChange';

interface PageEditTitleProps {
  title: string;
  handleChange: (title: string) => void;
}

const PageEditTitle: React.FC<PageEditTitleProps> = ({
  title,
  handleChange
}) => {
  const [ value, setValue ] = useChange(title);

  const handleKeyPress = (e: any) => {
    if(e.key === "Enter") {
      e.preventDefault();
      handleChange(value);
    }
  }
  
  return (
    <div className="page-title-box">
      <input onChange={setValue()} onKeyPress={handleKeyPress} type="text" value={value} />
    </div>  
  );
}

export default PageEditTitle;