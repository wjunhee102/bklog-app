import React from 'react';

interface ColorStyleToggleButtonProps {
  colorCode: number[];
}


function ColorStyleToggleButton({
  colorCode
}: ColorStyleToggleButtonProps) {
  return (
    <button>

    </button>
  )
}

interface ColorStyleToggleProps {
  addDelToggle: any;
}

function ColorStyleToggle(
  { addDelToggle }: ColorStyleToggleProps
  ) {

  const colorCodes:number[][] = [
    [191, 63, 63, 1],
    [191, 127, 63, 1],
    [191, 191, 63, 1],
    [127, 191, 63, 1],
    [63, 191, 63, 1],
    [63, 191, 127, 1],
    [63, 127, 191, 1],
    [63, 63, 191, 1],
    [63, 63, 191, 1],
    [127, 63, 191, 1],
    [191, 63, 191, 1],
    [191, 63, 127, 1]
  ];

  return (
    <div className="bk-color-menu">

    </div>
  )
}

export default ColorStyleToggle;