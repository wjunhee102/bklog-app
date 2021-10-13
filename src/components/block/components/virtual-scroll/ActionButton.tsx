import React from 'react';
import { ButtonProps } from './BlockScrollMenu';

interface ActionButtonProps extends ButtonProps {
  handleClick: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  value,
  img,
  handleClick
}) => {
  return (
  <button 
    className="action-btn"
    onClick={handleClick(value)}
  >
    {
      img? 
      <div className="action-btn-icon-box">
        <img src={img} alt=""/>
      </div>
      : null
    }
    
    <div className="action-btn-text">
      <span>{title}</span>
    </div>

  </button>
  )
}

export default ActionButton;