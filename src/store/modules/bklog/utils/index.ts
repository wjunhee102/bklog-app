import { BlockData, TextProps, UUID } from '../../../../types/bklog';

import * as converter from './converter';
import * as ordering  from './ordering';

export const updateContents = converter.default;
export const orderingBlock  = ordering.default;

export function insertChild(children: UUID[], insertPoint: number,child: UUID) {
  let newChildren = children.concat();

  if(children.length <= 1 || children.length === insertPoint) {
    newChildren.push(child);
  } else {
    newChildren.splice(insertPoint, 0, child)
  }

  return newChildren
} 
