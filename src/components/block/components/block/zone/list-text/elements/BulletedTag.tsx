import React from "react";
import { ListTagProps } from "./ListTag";

const BulltedTag: React.FC<ListTagProps> = ({
  block, 
  useBlockReducer, 
  parentTagType
}) => {
  return (
    <div className="list-tag">
      ●
    </div>
  );
}

export default BulltedTag;