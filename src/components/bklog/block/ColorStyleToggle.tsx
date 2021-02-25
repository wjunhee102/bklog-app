import React from 'react';

interface ColorStyleToggleButtonProps {
  colorCode: number[];
  onStyleChange: any;
  addDelToggle: any;
}


function ColorStyleToggleButton({
  colorCode,
  onStyleChange,
  addDelToggle
}: ColorStyleToggleButtonProps) {
  const RGBA = `rgba(${colorCode[0]}, ${colorCode[1]}, ${colorCode[2]}, ${colorCode[3]})`

  const btnStyle = {
    color: RGBA
  }

  const addDel = addDelToggle(["fc", RGBA])? "del" : "color";

  const handleClick = ()=> {
    onStyleChange(["fc",RGBA], addDel);
  }

  return (
    <button style={btnStyle} onClick={handleClick}>
      Text
      { addDel === "del"? "v" : null}
    </button>
  )
}

const colorCodes:number[][] = [
  [191, 63, 63, 1],
  [191, 127, 63, 1],
  [191, 191, 63, 1],
  [127, 191, 63, 1],
  [63, 191, 63, 1],
  [63, 191, 127, 1],
  [63, 127, 191, 1],
  [63, 63, 191, 1],
  [127, 63, 191, 1],
  [191, 63, 191, 1],
  [191, 63, 127, 1]
];

interface ColorStyleToggleProps {
  addDelToggle: any;
  onStyleChange: any;
}

function ColorStyleToggle(
  { addDelToggle, onStyleChange }: ColorStyleToggleProps
  ) {

  return (
    <div className="bk-color-menu">
      {
        colorCodes.map((code, key) => 
          <ColorStyleToggleButton 
            key={key}
            colorCode={code}
            onStyleChange={onStyleChange}
            addDelToggle={addDelToggle}
          />
        )
      }
    </div>
  )
}

export default ColorStyleToggle;