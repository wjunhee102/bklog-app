import React from 'react';
import { BLOCK_BULLETED, BLOCK_NUMBERED } from '../../../../../types';
import { BlockProps } from '../../../Block';
import BulltedTag from './BulletedTag';
import NumberedTag from './NumberedTag';

export interface ListTagProps extends BlockProps {
  parentTagType?: number;
}

const TagComponentTable = {
  [BLOCK_NUMBERED]: NumberedTag,
  [BLOCK_BULLETED]: BulltedTag
}

const ListTag: React.FC<ListTagProps> = ({
  blockData,
  useBlockReducer,
  parentTagType
}) => {
  if(TagComponentTable.hasOwnProperty(blockData.type)) {
    return TagComponentTable[blockData.type](blockData, useBlockReducer, parentTagType);
  } 

  return null;
}

export default ListTag;