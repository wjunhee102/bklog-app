import React from 'react';
import { ButtonProps } from './BlockScrollMenuAriticles';

interface ActionButtonProps extends ButtonProps {
  handleClick: (value: string) => () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  value,
  IconComponent,
  handleClick
}) => {
  return (
  <button 
    className="action-btn"
    onClick={handleClick(value)}
  >
    {
      IconComponent? 
      <div className="action-btn-icon-box">
        { IconComponent }
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