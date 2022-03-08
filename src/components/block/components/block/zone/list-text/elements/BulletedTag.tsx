import React from "react";
import { ListTagProps } from "./ListTag";

const BulltedTag: React.FC<ListTagProps> = ({
  block, 
  useBlockReducer, 
  parentTagType
}) => {
  return (
    <div className={`list-tag bulleted ${block.styleType}`}>
      ●
    </div>
  );
}

export default BulltedTag;