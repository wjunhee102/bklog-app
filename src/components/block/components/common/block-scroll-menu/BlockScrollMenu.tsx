import React from 'react';
import classNames from 'classnames';
import './BlockScrollMenu.scss';

interface BlockScrollMenuProps {
  className?: string;
}

const BlockScrollMenu: React.FC<BlockScrollMenuProps> = ({ 
  children,
  className
}) => {
  return (
    <div className={classNames(
      "block-scroll-menu",
      { [className]: className }
    )}>
      { children }
    </div>
  );
}

export default BlockScrollMenu;