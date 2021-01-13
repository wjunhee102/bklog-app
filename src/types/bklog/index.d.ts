import { v4 as uuidv4 } from 'uuid';

export type ContentType = ["b"] | ["i"] | ["_"] | ["a", string] | ["fc", string] | ["bc", string];

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof uuidv4>

/**
 * Block에서 외부로 보여지는 속성
 */
export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any;
}

/**
 * Raw Block Data
 */
export interface BlockData {
  id: UUID | string;
  type: string;
  parentId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  // 수정할 것.
  property?: BlockProp | null;
  children: UUID[];
}