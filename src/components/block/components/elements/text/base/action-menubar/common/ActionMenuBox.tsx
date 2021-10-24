import React from 'react';

interface ActionMenuBoxProps {
  className?: string;
}

const ActionMenuBox: React.FC<ActionMenuBoxProps> = ({
  className,
  children
}) => {

  return (
    <div className={`action-menu-box ${className? className : ""}`}>
      { children }
    </div>
  )
}

export default ActionMenuBox;