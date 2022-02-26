import React from "react";
import { BulletedBlock } from "../../../../../entities/block/text/BulletedBlock";
import { NumberedBlock } from "../../../../../entities/block/text/NumberedBlock";
import { BLOCK_BULLETED, BLOCK_NUMBERED } from "../../../../../entities/block/type/types/text";
import { BlockComponentProps } from "../../../BlockComponent";
import BulltedTag from "./BulletedTag";
import NumberedTag from "./NumberedTag";

export interface ListTagProps<T extends NumberedBlock | BulletedBlock = NumberedBlock | BulletedBlock> extends BlockComponentProps<T> {
  parentTagType?: number;
}

const TagComponentTable = {
  [BLOCK_NUMBERED]: NumberedTag,
  [BLOCK_BULLETED]: BulltedTag
}

const ListTag: React.FC<ListTagProps> = ({
  block,
  useBlockReducer,
  parentTagType
}) => {
  if(TagComponentTable.hasOwnProperty(block.type)) {
    return TagComponentTable[block.type as keyof typeof TagComponentTable]({block: block as never, useBlockReducer, parentTagType});
  } 

  return null;
}

export default ListTag;