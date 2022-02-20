import React from 'react';
import classNames from 'classnames';
import './ScrollMenu.scss';

interface ScrollMenuProps {
  className?: string;
}

const ScrollMenu: React.FC<ScrollMenuProps> = ({ 
  children,
  className
}) => {
  return (
    <div className={classNames(
      "scroll-menu",
      { [className as string]: className }
    )}>
      { children }
    </div>
  );
}

export default ScrollMenu;