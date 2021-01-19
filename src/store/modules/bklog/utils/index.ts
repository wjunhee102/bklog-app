import { BlockData, TextProps, UUID } from '../../../../types/bklog';

import * as converter from './converter';
import * as ordering  from './ordering';

export const updateContents = converter.default;
export const orderingBlock  = ordering.default;

export function insertChild(children: UUID[], insertPoint: number, insertChildren: UUID[], deleteCount: number = 0):UUID[] {
  let newChildren = children.concat();
  
  if(children.length <= 1 || children.length === insertPoint) {
    if(deleteCount) {
      newChildren.pop();
    }
    newChildren = newChildren.concat(insertChildren);
  } else {
    newChildren.splice(insertPoint, deleteCount, ...insertChildren);
  }

  return newChildren
} 
