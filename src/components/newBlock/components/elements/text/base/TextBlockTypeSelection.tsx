import React, { useCallback } from 'react';
import useChange from '../../../../hooks/useChange';

const textBlockType: string[][] = [
  ["h1", "bk-h1"],
  ["h2", "bk-h2"],
  ["h3", "bk-h3"],
  ["h4", "bk-h4"],
  ["p", "bk-p"]
];

interface TextBlockTypeSelectionProps {
  blockIndex: number;
  onChangeStyleType: (blockInfo: string | number, styleType: string) => void;
  styleType: string;
}

const TextBlockTypeSelection: React.FC<TextBlockTypeSelectionProps> = ({
  blockIndex,
  onChangeStyleType,
  styleType
}) => {
  const [ value, handleValue ] = useChange(styleType);

  const handleChange = useCallback(() => 
    handleValue((value) => onChangeStyleType(blockIndex, value)), 
  [value, onChangeStyleType, blockIndex]);

  return (
    <select onChange={handleChange()} value={value}>
      { textBlockType.map(((type) => <option value={type[1]} key={type[1]}>{ type[0] }</option>)) }
    </select>
  );
}

export default TextBlockTypeSelection;