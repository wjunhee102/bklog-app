import { v4 as uuidv4 } from 'uuid';

export type ContentType = ["b"] | ["i"] | ["_"] | ["a", string] | ["fc", string] | ["bc", string];

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof uuidv4>

/**
 * Block에서 외부로 보여지는 속성
 * type: string;
 * style?: {
 *  color?: string;
 *  backgroundColor: string;
 * }
 * contents: any;
 */
export interface TextProps {
  type: string;
  styles: {
    color: string | null;
    backgroundColor: string | null;
  }
  contents: any;
}

export interface RawBlockData<T> {
  id: UUID | string;
  type: string;
  parentId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  // 수정할 것.
  property: T;
  children: UUID[];
}

/**
 * Raw Block Data
 */
export interface BlockData<T> {
  index: number;
  id: UUID | string;
  type: string;
  parentId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  // 수정할 것.
  property: T;
  children: UUID[];
}