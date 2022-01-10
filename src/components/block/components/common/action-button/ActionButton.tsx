import React from 'react';
import './ActionButton.scss';

interface ActionButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  IconComponent?: React.ComponentElement<any, any>
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  IconComponent,
  children
}) => {
  return (
    <button
     className="action-btn"
     onClick={onClick}
    >

      {
        IconComponent? 
        <div className="action-btn-icon-box">
          { IconComponent }
        </div>
        : null
      }
      
      <div className="action-btn-text">
        <span>{ children }</span>
      </div>

    </button>
  );
}

export default ActionButton;