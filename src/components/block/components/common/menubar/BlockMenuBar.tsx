import React from 'react';
import './BlockMenuBar.scss';

interface BlockMenuBarProps {
  className?: string;
  bgColor?: string;
}

const setClassName = (className?: string, bgColor: string = "bg-white") => className? 
  `block-menu-bar ${bgColor} ${className}` : `block-menu-bar ${bgColor}`;

const BlockMenuBar: React.FC<BlockMenuBarProps> = ({
  className,
  bgColor,
  children
}) => {
  return (
    <div className="block-menu-bar-box">
      <div className={setClassName(className, bgColor)}>
        { children }
      </div>
    </div>
  );
}

export default BlockMenuBar;