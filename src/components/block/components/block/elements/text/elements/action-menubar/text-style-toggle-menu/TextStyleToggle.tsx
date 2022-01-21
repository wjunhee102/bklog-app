import classNames from 'classnames';
import React from 'react';
import { ToggleProps } from './TextStyleToggleMenu';

interface TextStyleToggleProps extends ToggleProps {
  handleClick: (toggle: boolean) => () => void;
  toggle: boolean;
}

const TextStyleToggle: React.FC<TextStyleToggleProps> = ({
  handleClick,
  title,
  style,
  value,
  toggle
}) => {

  return (
    <button 
      className="text-style-toggle"
      onClick={handleClick(toggle)}
    >
      <span className={classNames("text-style-toggle-title", style, {
        "bg-blue-500": toggle,
        "text-white": toggle
      })}>
        { title }
      </span>
    </button>
  );
}

export default TextStyleToggle;