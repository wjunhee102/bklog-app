import React, { useMemo } from 'react';

interface TextStyleToggleButtonProps {
  onStyleChange: any;
  addDelToggle: boolean;
  styleType: string;
}

const TextStyleToggleButton: React.FC<TextStyleToggleButtonProps> = ({
  onStyleChange,
  addDelToggle,
  styleType
}) => {

  const addDelClassName = () => addDelToggle? "del" : "add";

  const handleClick = () => {
    onStyleChange([styleType], addDelClassName);
  }

  return (
    <button 
      className={`bk-textStyleToggle ${addDelClassName}`}
      onClick={handleClick}
    >
      { styleType }
    </button>
  );
}

export default TextStyleToggleButton;