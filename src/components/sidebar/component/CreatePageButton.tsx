import React from "react";

interface CreatePageButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const CreatePageButton: React.FC<CreatePageButtonProps> = ({ onClick }) => {

  return (
    <button onClick={onClick} className="create-page-button">
      페이지 생성하기
    </button>
  )
}

export default CreatePageButton;