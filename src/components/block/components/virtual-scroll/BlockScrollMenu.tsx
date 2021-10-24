import React from 'react';
import './BlockScrollMenu.scss';

const BlockScrollMenu: React.FC = ({
  children
}) => {
  return (
    <div className="block-scroll-menu">
      { children }
    </div>
  );
} 

export default BlockScrollMenu;