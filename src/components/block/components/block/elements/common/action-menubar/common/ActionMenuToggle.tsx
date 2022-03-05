import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSortDown } from '@fortawesome/free-solid-svg-icons';

interface ActionMenuToggleProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionMenuToggle: React.FC<ActionMenuToggleProps> = ({
  className,
  onClick,
  children
}) => {
  return (
    <button
      className={`action-menu-toggle ${className? className : ""}`}
      onClick={onClick}
    >
      { children }
      <FontAwesomeIcon className="toggle-icon" icon={faAngleDown as any} />
    </button>
  );
}

export default ActionMenuToggle;

